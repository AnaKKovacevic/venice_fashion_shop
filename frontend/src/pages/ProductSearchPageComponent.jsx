import ProductSearchListComponent from "../components/search/ProductSearchList.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const ProductSearchPageComopnent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Shop Search" />
            <ProductSearchListComponent />
        </>
    );
}

export default ProductSearchPageComopnent;