const UserModel = require("../models/user.model");

const registerValidation = (req,res,next)=>{
    let {firstname,lastname,email,password} = req.body;
    
    if(!firstname || !lastname || !password || !email || !email.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/)){
        return res.status(409).send("The form is not valid.");
    }

    UserModel.findOne({email:email})
        .then((user)=>{
            if(!user){
                next();
            }else{
                res.status(210).send("You have been already registered!");
            }
        })
        .catch((err)=>{
            res.status(408).send("Problem during registration process occurred. Please try again.")
        })
}

module.exports = registerValidation;