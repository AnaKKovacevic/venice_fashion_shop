import {Link} from "react-router-dom";
import { getFinalPrice } from "../../../services/product.service";
import { useSelector } from "react-redux";
import StockCircleIndicatorComponent from "../../../UIkit/StockCircleIndicator.Component";
import CartActionComponent from "../../../UIkit/CartAction.Component";
import CartOffcanvasComponent from "../../../UIkit/CartOffcanvasComponent";
import WishlistActionComponent from "../../../UIkit/WishlistAction.Component";

const WishlistTableRowComponent = ({product})=>{

    const currencyStore = useSelector((state)=>state.currencyStore);

    const removeSpaces = (param)=>{
        let newParam = param.replaceAll(" ","-");
        return newParam;
    }


    return(
        <tr className="align-middle">
            <td>
                <WishlistActionComponent product={product} />
            </td>
            <td>
                <Link className="img-link" to={`/shop/${removeSpaces(product.product_category[0].gender)}/${removeSpaces(product.product_category[0].name)}/${removeSpaces(product.product_brand[0].name)}/${product._id}`}>
                    <img src={product.thumbnail} alt={product.title} referrerPolicy="no-referrer" />
                </Link>
            </td>
            <td className="title-td">
                <Link to={`/shop/${removeSpaces(product.product_category[0].gender)}/${removeSpaces(product.product_category[0].name)}/${removeSpaces(product.product_brand[0].name)}/${product._id}`}>
                    {product.title}
                </Link>
            </td>
            <td className="text-center">
                {
                    product.discountPercentage
                    ?
                    <>
                        <span className="no-disc-span">{getFinalPrice(product,currencyStore).priceNoDisc}</span><br/>
                    </>
                    :
                    null
                }
                
                <span className="final-price-span">{getFinalPrice(product,currencyStore).finalPrice}</span>
            </td>
            <td className="text-center stock-td">
                <StockCircleIndicatorComponent product={product} />
            </td>
            <td className="text-center">
                <CartActionComponent 
                    showCustomTitle={false} 
                    specificClass="cart-action"
                    productQuantity={1}
                    product={product}
                    specificOffcanvas="wishlist" />
                
                <CartOffcanvasComponent product={product} productQuantity={1} specificOffcanvas="wishlist" />
            </td>
        </tr>
    );
}

export default WishlistTableRowComponent;