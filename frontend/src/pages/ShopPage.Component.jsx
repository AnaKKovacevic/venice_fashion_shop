import ProductListComponent from "../components/productList/ProductList.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const ShopPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Shop" />
            <ProductListComponent />
        </>
        
    );
}

export default ShopPageComponent;