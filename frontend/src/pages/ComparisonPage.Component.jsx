import ProductComparisonComponent from "../components/productComparison/ProductComparison.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const ComparisonPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Comparison" />
            <ProductComparisonComponent />
        </>
    );
}

export default ComparisonPageComponent;