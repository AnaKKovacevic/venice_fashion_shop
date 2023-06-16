import CartComponent from "../components/cart/CartComponent";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const CartPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Cart" />
            <CartComponent />
        </>
    );
}

export default CartPageComponent;