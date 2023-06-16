import {BsCart3} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart.slicer";
import CustomTitleComponent from "./CustomTitle.Component";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const CartActionComponent = ({showCustomTitle,specificClass,titleSpecificClass,productQuantity,product,specificOffcanvas})=>{


    const cartStore = useSelector((state)=>state.cartStore);
    const dispatch = useDispatch();
    const [btnAttributes,setBtnAttributes] = useState({
        "data-bs-toggle":"offcanvas", 
        "data-bs-target":`#addedToCartOffcanvas${specificOffcanvas}${product._id}`,
        "aria-controls":`addedToCartOffcanvas${specificOffcanvas}${product._id}`
    });
    const [stockMsg,setStockMsg] = useState("");


    useEffect(()=>{
        let possibleProductInCart = productQuantity;
        let productInCart = cartStore.products.find((el)=>{
            return el.product._id === product._id;
        }) 

        if(productInCart){
            possibleProductInCart += productInCart.productQuantity;
        }

        if(!product.stock){
            setBtnAttributes(null);
            setStockMsg(`${product.title} is out of stock.`);
        }else if(product.stock < possibleProductInCart){
            setBtnAttributes(null);
            setStockMsg(`You have selected ${product.title} more than we have it in stock. Please add products according to their stock status.`);
        }else{
            setBtnAttributes({
                "data-bs-toggle":"offcanvas", 
                "data-bs-target":`#addedToCartOffcanvas${specificOffcanvas}${product._id}`,
                "aria-controls":`addedToCartOffcanvas${specificOffcanvas}${product._id}`
            });
            setStockMsg("");
        }
    },[cartStore,product,productQuantity,specificOffcanvas])
    
    const handleCartClick = (e)=>{
        e.preventDefault();

        if(!stockMsg){
            dispatch(addToCart({product,productQuantity}));
        }else{
            toast.info(stockMsg,{autoClose:false});
        }       
    }


    return(
        
            <button 
                type="button" 
                className={specificClass} 
                onClick={handleCartClick}
                {...btnAttributes}
                >
            
                {showCustomTitle
                ?
                <>
                    <CustomTitleComponent name={`cart ${titleSpecificClass}`}>
                        Add to cart
                    </CustomTitleComponent>
                    <BsCart3 />
                </>
                :
                "Add to cart"
                }
            
            </button>


    );
}

export default CartActionComponent;