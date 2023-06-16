import axios from "axios";

export const getAllProducts = () => axios.get("/product/get-all");
export const getProductsCount = (queryString) => axios.get(`/product/count?${queryString}`);
export const getAllProductsCount = () => axios.get("/product/count-all");
export const getFilteredProducts = (queryString) => axios.get(`/product/get-filtered?${queryString}`);
export const getTopProducts = ()=>axios.get("/product/get-top");
export const getProductDetails = (productId)=>axios.get(`/product/${productId}`);
export const getCategoryProducts = (category,id)=> axios.get(`/product/get-category/${category}/${id}`);
export const submitReview = (review,productId) => axios.put(`/product/add-review/${productId}`,review);
export const getFilteredCheckboxes = (selectedFilters) => axios.get(`/product/get-filters/${selectedFilters}`);
export const getWishlistProducts = (productIds)=> axios.post("/product/get-wishlist",productIds);
export const getSearchedProducts = (payload) => axios.get(`/product/get-searched/${payload.searchValue}?${payload.query}`);
export const getSearchedProductsCount = (payload) =>axios.get(`/product/searched-count/${payload.searchValue}?${payload.query}`);
export const setComparedProductsToLocalStorage = (products) => localStorage.setItem("vf_products_compared", JSON.stringify(products));
export const subtractProductQuantity = (products) => axios.post("/product/subtract-quantity",products);
export const addProduct = (product)=>axios.post("/product/add-product",product);
export const getDashboardProductsCount = (queryString)=>axios.get(`/product/dashboard/searched-count?${queryString}`);
export const getDashboardProducts = (queryString) => axios.get(`/product/dashboard/get-searched?${queryString}`);
export const deleteProduct = (productId)=>axios.delete(`/product/delete/${productId}`);
export const updateProduct = (productData,productId)=>axios.put(`/product/update/${productId}`,productData);



export const getFinalPrice = (product,currencyData,quantity=1)=>{
        let priceNoDisc = product.price;
        let discount = product.discountPercentage;
        let priceWithDiscount = (priceNoDisc - priceNoDisc * discount)*quantity;

        if(currencyData.currency === "eur"){
            let finalPrice = priceWithDiscount.toFixed(2);
            if(discount){
                return ({
                    priceNoDisc: <>&euro;{priceNoDisc.toFixed(2)}</>,
                    finalPrice: <>&euro;{finalPrice}</>
                });
            }
            return {finalPrice:<>&euro;{finalPrice}</>};
        }else{
            let usd = currencyData.eurToUsd;
            let finalPrice = (priceWithDiscount*usd).toFixed(2);

            if(discount){
                return ({
                    priceNoDisc: <>${(priceNoDisc*usd).toFixed(2)}</>,
                    finalPrice: <>${finalPrice}</>
                });
            }
            return {finalPrice:<>${finalPrice}</>};
        }

}

export const getCartTotalPrice = (price,currencyData)=>{
    if(currencyData.currency === "eur"){
        return {finalPrice: <>&euro;{price.toFixed(2)}</>}
    }else{
        let usd = currencyData.eurToUsd;
        let finalPrice = (price*usd).toFixed(2);
        return {finalPrice:<>${finalPrice}</>};
    }
}