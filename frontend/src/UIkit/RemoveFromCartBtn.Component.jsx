import {BsXLg} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cart.slicer";

const RemoveFromCartBtnComponent = ({product})=>{

    const dispatch = useDispatch();

    const handleClick = ()=>{
        dispatch(removeFromCart(product));
    }
    return(
        <div className="remove-btn-holder">
            <button type="button" onClick={()=>handleClick()}><BsXLg /></button>
        </div>
    );
}

export default RemoveFromCartBtnComponent;