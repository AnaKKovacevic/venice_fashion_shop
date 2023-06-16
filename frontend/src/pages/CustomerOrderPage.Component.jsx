import CustomerOrderComponent from "../components/customerOrder/CustomerOrderComponent";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const CustomerOrderPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Your order" />
            <CustomerOrderComponent />
        </>
    );
}

export default CustomerOrderPageComponent;