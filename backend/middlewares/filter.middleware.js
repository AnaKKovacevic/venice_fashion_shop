const CategoryModel = require("../models/category.model");
const BrandModel = require("../models/brand.model");

const filterMiddleware = async(req,res,next)=>{
    let queryParams = req.query;

    //Pagination and sort

    let page = parseInt(queryParams.page);
    let limit = parseInt(queryParams.limit);
    let sortCriterium = queryParams.sort.split("-");
    if(sortCriterium[1] == "desc"){
        sortCriterium[1] = -1;
    }else{
        sortCriterium[1] = 1;
    }
    let skipNum = (page-1)*limit;

    //Filters

    let filterSaleObj = {};
    let filterGender = [];
    let filterCategory = [];
    let filterBrand = [];

    let allCategories = [];
    let allBrands = [];

    if(queryParams.gender){
        filterGender = queryParams.gender.split("_");
    }else{
        filterGender = ["men","women"];
    }

    if(queryParams.sale){
        let filterSaleArr = queryParams.sale.split("_");
        if(filterSaleArr.length === 2){
            filterSaleObj.discountPercentage = {"$gte": 0};
        }else if(filterSaleArr.includes("yes")){
            filterSaleObj.discountPercentage= {"$gt": 0};
        }else{
            filterSaleObj.discountPercentage= {"$eq": 0};

        }
    }else{
        filterSaleObj.discountPercentage= {"$gte": 0};
    }

    try{
        const productCats = await CategoryModel.find({},{name:1});
        const productBrands = await BrandModel.find({},{name:1});

        let uniqueProductCatsSet = new Set();
        let uniqueProductBrandsSet = new Set();

        productCats.forEach(cat=>{
            uniqueProductCatsSet.add(cat.name);
        });

        productBrands.forEach(brand=>{
            uniqueProductBrandsSet.add(brand.name);
        });

        allCategories = Array.from(uniqueProductCatsSet);
        allBrands = Array.from(uniqueProductBrandsSet);

    }catch(err){
        return res.status(408).send(err);
    }

    if(queryParams.category){
        filterCategory = queryParams.category.replace(/-/g, " ").split("_");
    }else{
        filterCategory = [...allCategories];
    }

    if(queryParams.brand){
        filterBrand = queryParams.brand.replace(/-/g, " ").split("_");
    }else{
        filterBrand = [...allBrands];
    }

    

    req.body.filterSortObj = {
        filterSaleObj,
        filterGender,
        filterCategory,
        filterBrand,
        sortCriterium,
        limit,
        skipNum
    }
    next();
}

module.exports = filterMiddleware;