import { useEffect } from "react";
import {BsCart3} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromLocalStorage } from "../../../redux/cart.slicer";

const CartNavComponent = ({events}) =>{

    const cartStore = useSelector((state)=>state.cartStore);
    const dispatch = useDispatch();

    useEffect(()=>{
        let cartData = localStorage.getItem("vf_cart");
        if(cartData){
            dispatch(setCartFromLocalStorage(JSON.parse(cartData)));
        }

    },[dispatch])

    return(
        <div className="cart-holder position-relative" {...events}>
            <div className="cart-icon">
                <BsCart3 />
                <BsCart3 />
            </div>
            <span className="position-absolute top-0 start-100 translate-middle rounded-circle text-white">
                {cartStore.totalQuantity}
            </span>
        </div>
    );
}

export default CartNavComponent;