import { Link } from "react-router-dom";
import { getFinalPrice } from "../../../services/product.service";
import RemoveFromCartBtnComponent from "../../../UIkit/RemoveFromCartBtn.Component";

const CartProductArticleComponent = ({product,currencyStore})=>{


    const removeSpaces = (param)=>{
        let newParam = param.replaceAll(" ","-");
        return newParam;
    }

    const shortenTitle = ()=>{
        let shortTitle = null;
        let productTitle = product.product.title;
        if(productTitle.length > 10){
            shortTitle = productTitle.slice(0,10) + "...";
            return shortTitle;
        }else{
            return productTitle;
        }
        
    }


    return(
        <div className="content-holder">    
            <article className="cart-product-article">

                <RemoveFromCartBtnComponent product={product} />

                <Link to={`/shop/${removeSpaces(product.product.product_category[0].gender)}/${removeSpaces(product.product.product_category[0].name)}/${removeSpaces(product.product.product_brand[0].name)}/${product.product._id}`}>
                    <div className="d-flex align-items-center">
                        <div className="img-holder text-center">
                            <img src={product.product.thumbnail} alt={product.product.title} referrerPolicy="no-referrer" />
                        </div>
                        <div className="text-center flex-grow-1">
                            <h4>{shortenTitle()}</h4>
                            <div className="quantity-holder">
                                <span>{product.productQuantity} X</span><br/>
                                <span>{getFinalPrice(product.product,currencyStore).finalPrice}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </article>
        </div>
    );
}

export default CartProductArticleComponent;