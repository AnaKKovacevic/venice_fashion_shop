const express = require("express");
const blogRoute = express.Router();
const BlogModel = require("../models/blog.model");
const tokenValidation = require("../validation/token.validation");
const adminValidation = require("../validation/admin.validation");


blogRoute.get("/count-all",(req,res)=>{

    BlogModel.aggregate([
        { $count: "totalPosts"}
    ])
    .then((totalPosts)=>{
        res.send(totalPosts);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

blogRoute.get("/get-all",(req,res)=>{
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*10;

    BlogModel.find({})
    .sort({postedAt: -1})
    .skip(skipNum)
    .limit(10)
    .then((posts)=>{
        res.send(posts);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

blogRoute.get("/get-latest",(req,res)=>{
    BlogModel.find({})
    .sort({postedAt: -1})
    .limit(2)
    .then((posts)=>{
        res.send(posts);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

blogRoute.get("/post/:id",(req,res)=>{
    BlogModel.find({_id:req.params.id})
    .then((post)=>{
        res.send(post);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

blogRoute.post("/add-post",tokenValidation,adminValidation,(req,res)=>{
    let {title,author,readingTime,textShort,text,thumbnail} = req.body;

    if(!title || !author || !readingTime || !textShort || !text || !thumbnail){
        return res.status(409).send("The form is invalid");
    }

    BlogModel.create(req.body)
        .then((post)=>{
            res.send("You addded the post successfully!");
        })
        .catch((err)=>{
            res.status(408).send("Problem while saving the post occured. Please try again");
        })
})

blogRoute.get("/dashboard/searched-count",(req,res)=>{
    let searchValue = req.query.search;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"title": {$regex: new RegExp(el, "i")}},
                {"author": {$regex: new RegExp(el, "i")}}
            ]});
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    BlogModel.countDocuments(findCriteriumObj)
    .then((totalItemsCount)=>{
        res.send({totalItemsCount})
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

blogRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return ({ $or : [
                {"title": {$regex: new RegExp(el, "i")}},
                {"author": {$regex: new RegExp(el, "i")}}
            ]});
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    BlogModel.find(findCriteriumObj)
        .sort({postedAt:-1})
        .skip(skipNum)
        .limit(30)
        .then((posts)=>{
            res.send(posts);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

blogRoute.delete("/delete/:postId",tokenValidation,adminValidation,(req,res)=>{

    BlogModel.deleteOne({_id: req.params.postId})
        .then((data)=>{
            res.send("Post successfully deleted!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

blogRoute.put("/update/:postId",tokenValidation,adminValidation,(req,res)=>{

    BlogModel.updateOne({_id: req.params.postId},req.body)
    .then((data)=>{
        res.send("Post successfully updated!");
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})



module.exports = blogRoute;