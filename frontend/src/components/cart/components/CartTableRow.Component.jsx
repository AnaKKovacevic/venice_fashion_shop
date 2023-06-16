import { useState } from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { getFinalPrice } from "../../../services/product.service";
import ProductQuantityComponent from "../../../UIkit/ProductQuantity.Component";
import RemoveFromCartBtnComponent from "../../../UIkit/RemoveFromCartBtn.Component";

const CartTableRowComponent = ({product})=>{

    const [cartProductQuantity,setCartProductQuantity] = useState(product.productQuantity);
    const currencyStore = useSelector((state)=>state.currencyStore);
    let productObj = product.product;

    const removeSpaces = (param)=>{
        let newParam = param.replaceAll(" ","-");
        return newParam;
    }

    return(
        <tr className="align-middle">
            <td>
                <RemoveFromCartBtnComponent product={product} />
            </td>
            <td>
                <Link className="img-link" to={`/shop/${removeSpaces(productObj.product_category[0].gender)}/${removeSpaces(productObj.product_category[0].name)}/${removeSpaces(productObj.product_brand[0].name)}/${productObj._id}`}>
                    <img src={productObj.thumbnail} alt={productObj.title} referrerPolicy="no-referrer" />
                </Link>
            </td>
            <td className="title-td">
                <Link to={`/shop/${removeSpaces(productObj.product_category[0].gender)}/${removeSpaces(productObj.product_category[0].name)}/${removeSpaces(productObj.product_brand[0].name)}/${productObj._id}`}>
                    {productObj.title}
                </Link>
            </td>
            <td className="text-center">
                {
                    productObj.discountPercentage
                    ?
                    <>
                        <span className="no-disc-span">{getFinalPrice(productObj,currencyStore).priceNoDisc}</span><br/>
                    </>
                    :
                    null
                }
                
                <span className="final-price-span">{getFinalPrice(productObj,currencyStore).finalPrice}</span>
            </td>
            <td className="text-center">
                <ProductQuantityComponent 
                    productQuantity={cartProductQuantity} 
                    setProductQuantity={setCartProductQuantity}
                    product={productObj} />
            </td>
            <td className="text-center subtotal-td">{getFinalPrice(productObj,currencyStore,cartProductQuantity).finalPrice}</td>
        </tr>
    );
}

export default CartTableRowComponent;