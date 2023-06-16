const express = require("express");
const UserModel = require("../models/user.model");
const authRoute = express.Router();
const tokenValidation = require("../validation/token.validation");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../config/token.config");
const registerValidation = require("../validation/register.validation");
const mailTransporter = require("../services/mail.service");
const mailTemplates = require("../template/mail.template");
const bcrypt = require("bcrypt");


authRoute.post("/login",(req,res)=>{
    let {email,password} = req.body;
    if(!email || !password){
        if(!email && password){
            return res.status(409).send("Email is a required field");
        }else if(email && !password){
            return res.status(409).send("Password is a required field");
        }else{
            return res.status(409).send("Email and password are required fields");
        }
    }

    UserModel.findOne({email:email})
        .then((userData)=>{
            if(!userData){
                return res.status(409).send("Bad credentials.");
            }

            bcrypt.compare(password,userData.password)
                .then((result)=>{
                    if(!result){
                        return res.status(409).send("Bad credentials.");
                    }

                    if(!userData.isActive){
                        return res.status(409).send("You didn't confirm registration. You should confirm it on your mail and then try to login.");
                    }
                    let token = jwt.sign({
                        data:userData
                    }, jwtSecretKey,{expiresIn: "24h"});
                    userData.password = null;
                    res.send({
                        userData,
                        token
                    });

                })
                .catch((err)=>{
                    res.status(408).send("Problem during login process occurred. Please try again.")
                })
        })
        .catch((err)=>{
            res.status(408).send("Problem during login process occurred. Please try again.")
        })

});

authRoute.post("/register",registerValidation,(req,res)=>{

    let userData = req.body;

    bcrypt.hash(userData.password,10)
        .then((hash)=>{
            userData.password = hash;
            UserModel.create(userData)
            .then((user)=>{
    
                const message = mailTemplates.htmlRegistrationActivation(`https://venicefashionshop.onrender.com/account-activation/${user?._id}`);
                mailTransporter.sendEmail(user?.email, "Account Activation",message)
                    .then(()=>{
                        res.send("Successfully registered! Please check your mail to confirm registration!");
                    })
                    .catch((err)=>{
                        res.status(408).send("Problem during sending activation link occured. Please contact us on shopvenicefashion@gmail.com");
                    })
                
    
            })
            .catch((err)=>{
                res.status(408).send("Problem during registration process occurred. Please try again.");
            })
        })
        .catch((err)=>{
            res.status(408).send("Problem during registration process occurred. Please try again.");
        })

});

authRoute.get("/token",tokenValidation);

module.exports = authRoute;