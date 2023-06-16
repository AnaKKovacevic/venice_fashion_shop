const express = require("express");
const productRoute = express.Router();
const ProductModel = require("../models/product.model");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const tokenValidation = require("../validation/token.validation");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../config/token.config");
const filterMiddleware = require("../middlewares/filter.middleware");
const adminValidation = require("../validation/admin.validation");


productRoute.get("/count-all",(req,res)=>{
    ProductModel.countDocuments({})
       .then((count)=>{
            res.send({name: "products",count})
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})


productRoute.get("/get-top",(req,res)=>{
    ProductModel.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "categoryNum", 
                as: "product_category"
            },
        },
        {
            $lookup:
            {
                from: "brands",
                localField: "brand",
                foreignField: "brandNum", 
                as: "product_brand"
            },
        },
    ])
    .sort({rating:-1, _id:1})
    .limit(8)
    .then((products)=>{
        res.send(products);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

productRoute.get("/count",filterMiddleware,(req,res)=>{


    const {filterSaleObj,filterGender,filterCategory,filterBrand} = req.body.filterSortObj;

    ProductModel.aggregate([
        {
            $match: filterSaleObj
        },
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "categoryNum", 
                as: "product_category"
            },
        },
        {
            $match: {
                $and: [{"product_category.gender" : {$in: filterGender}},
                       {"product_category.name" : {$in: filterCategory}}]
            }
        },
        {
            $lookup:
            {
                from: "brands",
                localField: "brand",
                foreignField: "brandNum", 
                as: "product_brand"
            },
        },
        {
            $match: {
                "product_brand.name" : {$in: filterBrand}
            }
        },
        {
            $count: "totalProducts"
        }
    ])
    .then((totalProducts)=>{
        res.send(totalProducts);
    })
    .catch((err)=>{
        res.status(408).send(err);
    })
})

productRoute.get("/get-filtered",filterMiddleware,(req,res)=>{


    const {filterSaleObj,filterGender,filterCategory,filterBrand,sortCriterium,skipNum,limit} = req.body.filterSortObj;

    
        ProductModel.aggregate([
            {
                $match: filterSaleObj
            },
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "categoryNum", 
                    as: "product_category"
                },
            },
            {
                $match: {
                    $and: [{"product_category.gender" : {$in: filterGender}},
                           {"product_category.name" : {$in: filterCategory}}]
                }
            },
            {
                $lookup:
                {
                    from: "brands",
                    localField: "brand",
                    foreignField: "brandNum", 
                    as: "product_brand"
                },
            },
            {
                $match: {
                    "product_brand.name" : {$in: filterBrand}
                }
            },
            {
                $addFields: {
                    finalPrice: {$subtract: ["$price",{$multiply: ["$price","$discountPercentage"]}]}
                }
            },
            {
                $sort: {[sortCriterium[0]] : sortCriterium[1],_id:1}
            },
            {
                $skip: skipNum
            },
            {
                $limit: limit
            }

        ])
        .then((products)=>{
            res.send(products);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.get("/get-filters/:selectedFilters",(req,res)=>{
    let selectedFilters = JSON.parse(req.params.selectedFilters);
    let matchArr = [];

    selectedFilters.forEach((filter)=>{
        if(filter.key === "category"){
            matchArr.push({
                "product_category.name" : {"$in" : filter.value}
            });
        }else if(filter.key === "brand"){
            matchArr.push({
                "product_brand.name" : {"$in" : filter.value}
            });
        }else if(filter.key === "gender"){
            matchArr.push({
                "product_category.gender" : {"$in" : filter.value}
            })
        }else{
            if(filter.value.length === 2){
                matchArr.push({
                    discountPercentage : {"$gte": 0}
                })
            }else if(filter.value.includes("yes")){
                matchArr.push({
                    discountPercentage : {"$gt": 0}
                })
            }else{
                matchArr.push({
                    discountPercentage : {"$eq": 0}
                })
    
            }

        }
    })


    ProductModel.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "categoryNum", 
                as: "product_category"
            },
        },
        {
            $lookup:
            {
                from: "brands",
                localField: "brand",
                foreignField: "brandNum", 
                as: "product_brand"
            },
        },
        {
            $match:
            {
                $and : matchArr
            }
        }
    ])
    .then((products)=>{

        let saleSet = new Set();
        let genderSet = new Set();
        let categorySet = new Set();
        let brandSet = new Set();
  
        products.forEach((product)=>{
            genderSet.add(product.product_category[0].gender);
            categorySet.add(product.product_category[0].name);
            brandSet.add(product.product_brand[0].name);
            if(product.discountPercentage > 0){
                saleSet.add("yes");
            }else{
                saleSet.add("no");
            }
        })

        res.send({
            sale: Array.from(saleSet).sort().reverse(),
            gender: Array.from(genderSet).sort().reverse(),
            category: Array.from(categorySet).sort(),
            brand: Array.from(brandSet).sort()
        });
    })
    .catch((err)=>{
        res.status(408).send(err);
    })

})


productRoute.get("/:productId",(req,res)=>{

        ProductModel.aggregate([
            {
                $match : {_id: new ObjectId(req.params.productId)}
            },
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "categoryNum", 
                    as: "product_category"
                },
            },
            {
                $lookup:
                {
                    from: "brands",
                    localField: "brand",
                    foreignField: "brandNum", 
                    as: "product_brand"
                },
            },
        ])
        .then((product)=>{
            res.send(product);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
        
})

productRoute.get("/get-category/:category/:id",(req,res)=>{
    ProductModel.aggregate([
        {
            $match : 
            {
                $and: [
                    {category:Number(req.params.category)},
                    {_id:{$ne : new ObjectId(req.params.id)}}
                ]
            }
        },
        {
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "categoryNum", 
                as: "product_category"
            },
        },
        {
            $lookup:
            {
                from: "brands",
                localField: "brand",
                foreignField: "brandNum", 
                as: "product_brand"
            },
        },
    ])
        .then((products)=>{
            res.send(products);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.put("/add-review/:productId",tokenValidation,(req,res)=>{

    if(!req.body.rating || !req.body.title || !req.body.reviewText){
        return res.status(409).send("Rank, Title for your review and Your review are required!");
    }

    ProductModel.findById(req.params.productId)
        .then((product)=>{

            let userReview = null;

            let loggedUserId = jwt.verify(JSON.parse(req.headers.authorization),jwtSecretKey).data._id;
                
            product.reviews.forEach((review)=>{
                if(review.userID.toString() === loggedUserId){
                    userReview = true;
                }
                    
            })

            if(userReview){
                return res.status(210).send("You have already reviewed this product!");
            }

            let newRating = (product.rating + req.body.rating);
            if(product.rating){
                newRating = newRating / 2;
            }
            product.rating = newRating;
            product.reviews.push(req.body);


            product.save()
                .then((result)=>{
                    res.send("You sent the review successfully!");
                })
                .catch((err)=>{
                    res.status(408).send(err);
                })
                
            })

        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.post("/get-wishlist",(req,res)=>{
    let productIds = req.body;

    if(productIds.length){
        let productIdsObj = productIds.map((id)=>{
            return new ObjectId(id);
        })

        ProductModel.aggregate([
            {
                $match : 
                {
                    _id:{$in : productIdsObj}
                }
            },
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "categoryNum", 
                    as: "product_category"
                },
            },
            {
                $lookup:
                {
                    from: "brands",
                    localField: "brand",
                    foreignField: "brandNum", 
                    as: "product_brand"
                },
            },
        ])
            .then((products)=>{
                res.send(products);
            })
            .catch((err)=>{
                res.status(408).send(err);
            })
    }
  
})

productRoute.get("/searched-count/:searchedProduct",(req,res)=>{
        let searchArr = req.params.searchedProduct.split(" ");
        let regexArr = searchArr.map((el)=>{
             return {"title" : {$regex: new RegExp(el, "i")}};
            })
        ProductModel.aggregate([
            {
                $match: {$and: regexArr}
            },
            {
                $count: "totalProducts"
            }
        ])
        .then((totalSearchedProducts)=>{
            res.send(totalSearchedProducts);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.get("/get-searched/:searchedProduct",(req,res)=>{

        let searchArr = req.params.searchedProduct.split(" ");
        let regexArr = searchArr.map((el)=>{
             return {"title" : {$regex: new RegExp(el, "i")}};
            })
        let page = parseInt(req.query.page);
        let skipNum = (page-1)*30;

        ProductModel.aggregate([
            {
                $match: {$and: regexArr}
            },
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "categoryNum", 
                    as: "product_category"
                },
            },
            {
                $lookup:
                {
                    from: "brands",
                    localField: "brand",
                    foreignField: "brandNum", 
                    as: "product_brand"
                },
            },
            {
                $skip: skipNum
            },
            {
                $limit: 30
            }
        ])
        .then((products)=>{
            res.send(products);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.post("/subtract-quantity",(req,res)=>{
    if(!req.body.length){
        return res.status(409).send(err);
    }
    let bulkUpdateOperations = req.body.map((el,index)=>{
        return(
            {updateOne: {
                filter: {_id: new ObjectId(el.productID)},
                update: {$inc: {stock: -el.productQuantity}}
            }}
        );
    })
    ProductModel.bulkWrite(bulkUpdateOperations)
        .then((result)=>{
            res.send("Ok");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.post("/add-product",tokenValidation,adminValidation,(req,res)=>{

    let {title,category,brand,price,stock,discountPercentage,description,thumbnail} = req.body;

    if(!title || !category || !brand || !price || !description || !thumbnail || isNaN(stock) || isNaN(discountPercentage)){
        return res.status(409).send("The form is invalid");
    }
        
    

    ProductModel.create(req.body)
        .then((product)=>{
            res.send("You addded the product successfully!");
        })
        .catch((err)=>{
            res.status(408).send("Problem while saving the product occured. Please try again");
        })
})

productRoute.get("/dashboard/searched-count",(req,res)=>{

    let searchValue = req.query.search;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"title" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }
    
    ProductModel.countDocuments(findCriteriumObj)
        .then((totalItemsCount)=>{
            res.send({totalItemsCount})
        })
        .catch((err)=>{
            res.status(408).send(err);
        })

})

productRoute.get("/dashboard/get-searched",(req,res)=>{
    let searchValue = req.query.search;
    let page = parseInt(req.query.page);
    let skipNum = (page-1)*30;
    let findCriteriumObj = {};

    if(searchValue){
        let searchArr = searchValue.split("-");
        let regexArr = searchArr.map((el)=>{
            return {"title" : {$regex: new RegExp(el, "i")}};
        })

        findCriteriumObj = {
            $and: regexArr
        }
    }

    ProductModel.find(findCriteriumObj)
        .sort({title:1,_id:1})
        .skip(skipNum)
        .limit(30)
        .then((products)=>{
            res.send(products);
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.delete("/delete/:productId",tokenValidation,adminValidation,(req,res)=>{

    ProductModel.deleteOne({_id: req.params.productId})
        .then((data)=>{
            res.send("Product successfully deleted!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

productRoute.put("/update/:productId",tokenValidation,adminValidation,(req,res)=>{

    ProductModel.updateOne({_id: req.params.productId}, req.body)
        .then((data)=>{
            res.send("Product successfully updated!");
        })
        .catch((err)=>{
            res.status(408).send(err);
        })
})

module.exports = productRoute;