import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart.slicer";

const ProductQuantityComponent = ({productQuantity,setProductQuantity,product})=>{

    const dispatch = useDispatch();

    const changeQuantity = (index)=>{
        if(index === -1){
            if(productQuantity > 1){
                if(product){
                    console.log("test");
                    dispatch(addToCart({product,productQuantity:index}));
                }
                setProductQuantity(prevState => prevState + index);

            }
        }else{
            if(product){
                dispatch(addToCart({product,productQuantity:index}));
            }
            setProductQuantity(prevState => prevState + index);
        }


        
    }
    return(

            <div className="quantity-action">
                <div className="quantity-minus" onClick={()=>changeQuantity(-1)}>-</div>
                <div className="quantity">{productQuantity}</div>
                <div className="quantity-plus" onClick={()=>changeQuantity(1)}>+</div>
            </div>
    );
}

export default ProductQuantityComponent;