import { Link } from "react-router-dom";
import CartActionComponent from "../../../UIkit/CartAction.Component";
import CompareActionComponent from "../../../UIkit/CompareAction.Component";
import RankComponent from "../../../UIkit/Rank.Component";
import StockCircleIndicatorComponent from "../../../UIkit/StockCircleIndicator.Component";
import { getFinalPrice } from "../../../services/product.service";
import { useSelector } from "react-redux";
import CartOffcanvasComponent from "../../../UIkit/CartOffcanvasComponent";

const ProductComparsionCardComponent = ({product})=>{

    const currencyStore = useSelector((state)=>state.currencyStore);


    const removeSpaces = (param)=>{
        let newParam = param.replaceAll(" ","-");
        return newParam;
    }

    return(
        <div className="col-sm-6 col-xl-5 col-xxl-4 comparison-card-article-col">
            <article className="comparison-card-article">
                <Link to={`/shop/${removeSpaces(product.product_category[0].gender)}/${removeSpaces(product.product_category[0].name)}/${removeSpaces(product.product_brand[0].name.toLowerCase())}/${product._id}`}>
                
                    <div className="compare-btn-holder">
                        <CompareActionComponent product={product} />
                    </div>
                
                    <h2>
                        {product.title}                      
                    </h2>
                        
                    <div className="img-holder">
                        <img src={product.thumbnail} alt={product.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="rank-holder d-flex justify-content-center">
                        <RankComponent rating={product.rating} />
                        <p>({product.rating ? product.rating.toFixed(1) : product.rating.toFixed(0)})</p>
                    </div>
                    <div className="price-holder">
                        {
                            product.discountPercentage
                            ?
                            <>
                                <p>
                                    {getFinalPrice(product,currencyStore).finalPrice}
                                </p>
                                <p>{getFinalPrice(product,currencyStore).priceNoDisc}</p>
                            </>
                            :
                            <p>
                                {getFinalPrice(product,currencyStore).finalPrice}
                            </p>
                        }
                    </div>
                    <div className="stock-indicator-number-holder">
                        <StockCircleIndicatorComponent product={product} />
                        <span>{`(${product.stock} ${product.stock === 1 ? "item" : "items"})`}</span> 
                    </div>
                    <div className="cart-action-holder">
                        <CartActionComponent 
                            showCustomTitle={false} 
                            specificClass="cart-action"
                            product={product}
                            productQuantity={1}
                            specificOffcanvas="comparison" />
                    </div>
                    
                    
                    
                </Link>

                <CartOffcanvasComponent product={product} productQuantity={1} specificOffcanvas="comparison" />

            </article>
        </div>
    );
}

export default ProductComparsionCardComponent;