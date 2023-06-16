const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../config/token.config");
const UserModel = require("../models/user.model");

const verifyToken = (req,res,next) =>{
    if(req.headers.hasOwnProperty("authorization")){
        let token = req.headers.authorization;

            jwt.verify(JSON.parse(token),jwtSecretKey,function(error,decoded){
                if(error){
                    return res.status(401).send("You aren't logged in.")
                }else{
                    UserModel.findOne({
                        email: decoded.data.email,
                        password: decoded.data.password
                    })
                        .then((userData)=>{
                            if(!userData){
                                return res.status(409).send("You aren't logged in.");        
                            }
                            if(req.originalUrl == "/api/auth/token"){
                                return res.status(200).send("User is logged in.");
                            }
                            req.userData = userData;
                            next();
                        })
                        .catch((err)=>{
                             res.status(408).send("Something went wrong. Please try again.");  
                        })
                }
            })

    }else{
        return res.status(409).send("You aren't logged in.");       
    }

    
    
}

module.exports = verifyToken;