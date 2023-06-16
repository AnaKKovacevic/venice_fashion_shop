const express = require("express");
const categoryRoute = express.Router();
const CategoryModel = require("../models/category.model");
const tokenValidation = require("../validation/token.validation");
const adminValidation = require("../validation/admin.validation");

categoryRoute.get("/get-all",(req,res)=>{
    CategoryModel.find({})
    .sort({name:1,_id:1})
    .then((categories)=>{
        res.send(categories);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

categoryRoute.get("/gender/:gender",(req,res)=>{
    CategoryModel.find({gender: req.params.gender})
    .sort({name:1,_id:1})
    .then((categories)=>{
        res.send(categories);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

categoryRoute.get("/promoted",(req,res)=>{
    CategoryModel.find({promoted:true})
    .limit(3)
    .then((categories)=>{
        res.send(categories);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})


categoryRoute.get("/count-all",(req,res)=>{
    CategoryModel.countDocuments({})
    .then((count)=>{
         res.send({name: "categories",count})
     })
     .catch((err)=>{
         res.status(408).send(err);
     })
})

categoryRoute.post("/add-category",tokenValidation,adminValidation,(req,res)=>{
    let {name,categoryNum,gender,promoted,thumbnail} = req.body;
    if(!name || !categoryNum || !gender || !promoted || !thumbnail){
        return res.status(409).send("The form is invalid");
    }

    let promotedToBoolObj = req.body;

    if(promotedToBoolObj.promoted === "1"){
        promotedToBoolObj.promoted = true;
    }else{
        promotedToBoolObj.promoted = false;
    }

    CategoryModel.create(promotedToBoolObj)
        .then((cat)=>{
            res.send("You addded the category successfully!");
        })
        .catch((err)=>{
            res.status(408).send("Problem while saving the category occured. Please try again");
        })
})

categoryRoute.get("/dashboard/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {};
    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"name": {$regex: new RegExp(el, "i")}},
                {"gender": {$regex: new RegExp(el, "i")}}
            ]});
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    CategoryModel.countDocuments(findCriteriumObj)
    .then((totalItemsCount)=>{
        res.send({totalItemsCount})
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

categoryRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"name": {$regex: new RegExp(el, "i")}},
                {"gender": {$regex: new RegExp(el, "i")}}
            ]});
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    CategoryModel.find(findCriteriumObj)
        .sort({name:1,_id:1})
        .skip(skipNum)
        .limit(30)
        .then((cats)=>{
            res.send(cats);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

categoryRoute.delete("/delete/:catId",tokenValidation,adminValidation,(req,res)=>{

    CategoryModel.deleteOne({_id: req.params.catId})
        .then((data)=>{
            res.send("Category successfully deleted!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

categoryRoute.get("/get-max-num",(req,res)=>{
    CategoryModel.find({},{categoryNum:1,_id:0})
        .sort({categoryNum:-1})
        .limit(1)
        .then((maxNum)=>{
            res.send({maxNum});
        })
        .catch((err)=>{
            res.status(408).send(err)
        })
})

categoryRoute.get("/:catId",(req,res)=>{

    CategoryModel.find({_id: req.params.catId})
        .then((cat)=>{
            res.send(cat);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

categoryRoute.put("/update/:catId",tokenValidation,adminValidation,(req,res)=>{

    CategoryModel.updateOne({_id: req.params.catId},req.body)
        .then((data)=>{
            res.send("Category successfully updated!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })

})

module.exports = categoryRoute;


