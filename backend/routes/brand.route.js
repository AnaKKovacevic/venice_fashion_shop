const express = require("express");
const brandRoute = express.Router();
const BrandModel = require("../models/brand.model");
const tokenValidation = require("../validation/token.validation");
const adminValidation = require("../validation/admin.validation");

brandRoute.get("/",(req,res)=>{
    BrandModel.find({}).sort("name")
    .then((brands)=>{
        res.send(brands);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
    
})

brandRoute.get("/count-all",(req,res)=>{
    BrandModel.countDocuments({})
    .then((count)=>{
         res.send({name: "brands",count})
     })
     .catch((err)=>{
         res.status(408).send(err);
     })
})

brandRoute.get("/get-max-num",(req,res)=>{
    BrandModel.find({},{brandNum:1,_id:0})
        .sort({brandNum:-1})
        .limit(1)
        .then((maxNum)=>{
            res.send({maxNum});
        })
        .catch((err)=>{
            res.status(408).send(err)
        })
})

brandRoute.post("/add-brand",tokenValidation,adminValidation,(req,res)=>{
    let {name,thumbnail} = req.body;

    if(!name || !thumbnail){
        return res.status(409).send("The form is invalid");
    }

    BrandModel.create(req.body)
        .then((brand)=>{
            res.send("You addded the brand successfully!");
        })
        .catch((err)=>{
            res.status(408).send("Problem while saving the brand occured. Please try again");
        })
})

brandRoute.get("/dashboard/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"name" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }
    
    BrandModel.countDocuments(findCriteriumObj)
        .then((totalItemsCount)=>{
            res.send({totalItemsCount})
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

brandRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"name" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    BrandModel.find(findCriteriumObj)
        .sort({name:1,_id:1})
        .skip(skipNum)
        .limit(30)
        .then((brands)=>{
            res.send(brands);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

brandRoute.delete("/delete/:brandId",tokenValidation,adminValidation,(req,res)=>{

    BrandModel.deleteOne({_id:req.params.brandId})
        .then((data)=>{
            res.send("Brand successfully deleted!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

brandRoute.get("/:brandId",(req,res)=>{

    BrandModel.find({_id:req.params.brandId})
        .then((brand)=>{
            res.send(brand);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

brandRoute.put("/update/:brandId",tokenValidation,adminValidation,(req,res)=>{

    BrandModel.updateOne({_id: req.params.brandId},req.body)
    .then((data)=>{
        res.send("Brand successfully updated!");
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

module.exports = brandRoute;

