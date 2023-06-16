const express = require("express");
const userRoute = express.Router();
const SubscriptionModel = require("../models/subscription.model");
const UserModel = require("../models/user.model");
const mailTemplates = require("../template/mail.template");
const mailTransporter = require("../services/mail.service");
const EmailModel = require("../models/email.model");
const tokenValidation = require("../validation/token.validation");
const adminValidation = require("../validation/admin.validation");

userRoute.post("/subscribe",(req,res)=>{

    let email = req.body.email;

    if(!email){
       return res.status(409).send("Your email is required for subscription.")
    }else if(!email.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/)){
        return res.status(409).send("The email you entered is invalid.");
    }

    SubscriptionModel.findOne({email : email})
        .then((subscriber)=>{
            if(subscriber){
                return res.status(210).send("You have been already subscribed!");
            }
            SubscriptionModel.create({email : email})
                .then(()=>{
                     res.send("You are successfully subscribed!");
                })
                .catch((err)=>{
                      res.status(408).send("Problem while saving the email occurred. Please try again.");
                })
                
            
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

userRoute.get("/account-activation/:id",(req,res)=>{
    let {id} = req.params;

    UserModel.updateOne({_id:id}, {isActive:true})
        .then(()=>{
            res.send("Your account is activated!")
        })
        .catch((err)=>{
            res.status(408).send("Problem during account activation occured. Please contact us on shopvenicefashion@gmail.com")
        })
})

userRoute.post("/contact",(req,res)=>{
    let {email,msg} = req.body;
    if(!email || !msg){
        return res.status(409).send("The form is invalid.");
     }else if(!email.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/)){
         return res.status(409).send("The email you entered is invalid.");
     }

     const message = mailTemplates.htmlUserMsg(msg);
     mailTransporter.sendUserMsg(email,message)
        .then(()=>{
            EmailModel.create({email,msg})
                .then((mail)=>{
                    res.send("You sent the message successfully!");
                })
                .catch((err)=>{
                    res.status(408).send("Problem while sending the message occured. Please try again");
                })
        })
        .catch((err)=>{
            res.status(408).send("Problem while sending the message occured. Please try again");
        })
})

userRoute.put("/wishlist-update/:productId",tokenValidation,(req,res)=>{
  
    let productId = req.params.productId;
    let user = req.userData;


    let productIndex = user.wishlist.findIndex((productWishlistId)=>{
                return productWishlistId === productId;
    })
           
    if(productIndex !== -1){
        user.wishlist.splice(productIndex,1);
        user.save()
            .then((userData)=>{
                userData.password = null;
                res.send(userData);
            })
            .catch((error)=>{
                res.status(408).send("Problem while removing product from wishlist ocurred. Please try again");
            })
                
                
    }else{
        user.wishlist.push(productId);
        user.save()
            .then((userData)=>{
                userData.password = null;
                res.send(userData);
            })
            .catch((error)=>{
                res.status(408).send("Problem while adding product to wishlist. Please try again");
            })
    }
})

userRoute.get("/count-all-users",(req,res)=>{
    UserModel.countDocuments({})
    .then((count)=>{
         res.send({name:"users",count})
     })
     .catch((err)=>{
         res.status(408).send(err);
     })
})

userRoute.get("/count-all-subscribers",(req,res)=>{
    SubscriptionModel.countDocuments({})
    .then((count)=>{
         res.send({name:"subscribers",count})
     })
     .catch((err)=>{
         res.status(408).send(err);
     })
})

userRoute.get("/dashboard/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {isAdmin:false};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"firstname": {$regex: new RegExp(el, "i")}},
                {"lastname": {$regex: new RegExp(el, "i")}},
                {"email": {$regex: new RegExp(el, "i")}}
            ]});
        });

        regexArr.push({isAdmin:false});

        findCriteriumObj = {
            $and: regexArr
        }
    }

    UserModel.countDocuments(findCriteriumObj)
    .then((totalItemsCount)=>{
        res.send({totalItemsCount})
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

userRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {isAdmin:false};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"firstname": {$regex: new RegExp(el, "i")}},
                {"lastname": {$regex: new RegExp(el, "i")}},
                {"email": {$regex: new RegExp(el, "i")}}
            ]});
        })

        regexArr.push({isAdmin:false});

        findCriteriumObj = {
            $and: regexArr
        }
    }

    UserModel.find(findCriteriumObj)
        .sort({firstname:1,lastname:1,_id:1})
        .skip(skipNum)
        .limit(30)
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

userRoute.put("/set-status/:userId",tokenValidation,adminValidation,(req,res)=>{
    UserModel.updateOne({_id: req.params.userId},req.body)
    .then((data)=>{
        res.send("Ok");
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

userRoute.post("/send-newsletter",tokenValidation,adminValidation,(req,res)=>{
    let {subject,msg,recipientList} = req.body;

    if(!subject || !msg || !recipientList.length){
        return res.status(409).send("The form is invalid");
    }

    const message = mailTemplates.htmlNewsletter(msg);
    mailTransporter.sendNewsletterEmail(recipientList,subject,message)
        .then(()=>{
            res.send("Newsletter successfully sent!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

userRoute.get("/dashboard/subscriber/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"email" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }
    
    SubscriptionModel.countDocuments(findCriteriumObj)
        .then((totalItemsCount)=>{
            res.send({totalItemsCount})
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

userRoute.get("/dashboard/subscriber/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = req.query.page;
    let skipNum = 0;
    let limitNum = 0;
    let findCriteriumObj = {};


    if(page){
        limitNum = 30;
        skipNum = (parseInt(page)-1)*30;
    }

    

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"email": {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    SubscriptionModel.find(findCriteriumObj)
        .sort({email:1})
        .skip(skipNum)
        .limit(limitNum)
        .then((subscribers)=>{
            res.send(subscribers);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

userRoute.delete("/subscriber/delete/:subscriberId",tokenValidation,adminValidation,(req,res)=>{

    SubscriptionModel.deleteOne({_id:req.params.subscriberId})
        .then((data)=>{
            res.send("Subscriber successfully unsubscribed!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

module.exports = userRoute;