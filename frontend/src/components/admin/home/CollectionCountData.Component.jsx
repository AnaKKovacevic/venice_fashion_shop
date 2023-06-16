import { useEffect, useState } from "react";
import { getAllBlogPostsCount } from "../../../services/blog.service";
import { getAllBrandsCount } from "../../../services/brand.service";
import { getAllCategoriesCount } from "../../../services/category.service";
import { getAllOrders } from "../../../services/order.service";
import { getAllProductsCount } from "../../../services/product.service";
import { getAllSubscribers, getAllUsers } from "../../../services/user.service";
import CollectionCountArticleComponent from "./components/CollectionCountArticle.Component";

const CollectionCountDataComponent = ()=>{

    const [productsCount,setProductsCount] = useState(null);
    const [categoriesCount,setCategoriesCount] = useState(null);
    const [brandsCount,setBrandsCount] = useState(null);
    const [postsCount,setPostsCount] = useState(null);
    const [usersCount,setUsersCount] = useState(null);
    const [subscribersCount,setSubscribersCount] = useState(null);
    const [ordersCount,setOrdersCount] = useState(null);
    const [productsCountErr,setProductsCountErr] = useState("");
    const [categoriesCountErr,setCategoriesCountErr] = useState("");
    const [brandsCountErr,setBrandsCountErr] = useState("");
    const [postsCountErr,setPostsCountErr] = useState("");
    const [usersCountErr,setUsersCountErr] = useState("");
    const [subscribersCountErr,setSubscribersCountErr] = useState("");
    const [ordersCountErr,setOrdersCountErr] = useState("");


    useEffect(()=>{

            getAllProductsCount()
            .then((res)=>{
                setProductsCount(res.data);
            })
            .catch((err)=>{
                setProductsCountErr("Something went wrong while counting products. Please reload the page.");
            })
        
            getAllCategoriesCount()
                .then((res)=>{
                    setCategoriesCount(res.data);
                })
                .catch((err)=>{
                    setCategoriesCountErr("Something went wrong while counting categories. Please reload the page.");
                })

            getAllBrandsCount()
                .then((res)=>{
                    setBrandsCount(res.data);
                })
                .catch((err)=>{
                    setBrandsCountErr("Something went wrong while counting brands. Please reload the page.");
                })
            
            getAllBlogPostsCount()
                .then((res)=>{
                    setPostsCount({name:"posts",count:res.data[0].totalPosts});
                })
                .catch((err)=>{
                    setPostsCountErr("Something went wrong while counting posts. Please reload the page.");
                })
            
            getAllUsers()
                .then((res)=>{
                    let usersCount = {...res.data};
                    usersCount.count -= 1;
                    setUsersCount(usersCount);
                })
                .catch((err)=>{
                    setUsersCountErr("Something went wrong while counting users. Please reload the page.");
                })
            
            getAllSubscribers()
                .then((res)=>{
                    setSubscribersCount(res.data);
                })
                .catch((err)=>{
                    setSubscribersCountErr("Something went wrong while counting subscribers. Please reload the page.");
                })

            getAllOrders()
                .then((res)=>{
                    setOrdersCount(res.data);
                })
                .catch((err)=>{
                    setOrdersCountErr("Something went wrong while counting orders. Please reload the page.");
                })

    },[])

    const showCountData = ()=>{
        if(productsCount && categoriesCount && brandsCount && postsCount
           && usersCount && subscribersCount && ordersCount){

            let collectionCountArr = [productsCount,categoriesCount,brandsCount,postsCount,
                                    subscribersCount,usersCount,ordersCount];
            
            return collectionCountArr.map((obj,index)=>{
                return <CollectionCountArticleComponent key={index} obj={obj} />
            })                        
           }
    }


    return(
        <section className="dashboard-count-section">
            <div className="row dashboard-articles-holder justify-content-between">
                {showCountData()}
            </div>
            {productsCountErr && <p className="error-get-data-par my-3">{productsCountErr}</p>}
            {categoriesCountErr && <p className="error-get-data-par my-3">{categoriesCountErr}</p>}
            {brandsCountErr && <p className="error-get-data-par my-3">{brandsCountErr}</p>}
            {postsCountErr && <p className="error-get-data-par my-3">{postsCountErr}</p>}
            {subscribersCountErr && <p className="error-get-data-par my-3">{subscribersCountErr}</p>}
            {usersCountErr && <p className="error-get-data-par my-3">{usersCountErr}</p>}
            {ordersCountErr && <p className="error-get-data-par my-3">{ordersCountErr}</p>}
        </section>
    );
}

export default CollectionCountDataComponent;