import CheckoutComponent from "../components/checkout/Checkout.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const CheckoutPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Checkout" />
            <CheckoutComponent />
        </>
    );  
}

export default CheckoutPageComponent;