import { useParams } from "react-router-dom";
import CompareActionComponent from "./CompareAction.Component";
import RankComponent from "./Rank.Component";
import WishlistActionComponent from "./WishlistAction.Component";
import SocialNetworkLinkComponent from "./SocialNetworkLink.Component";
import CartActionComponent from "./CartAction.Component";
import StockCircleIndicatorComponent from "./StockCircleIndicator.Component";
import { useSelector } from "react-redux";
import { getFinalPrice } from "../services/product.service";
import CartOffcanvasComponent from "./CartOffcanvasComponent";
import ProductQuantityComponent from "./ProductQuantity.Component";

const ProductInfoComponent = ({product,specificClass,specificOffcanvas,showOffcanvas,productQuantity,setProductQuantity})=>{

    const params = useParams();
    const currencyStore = useSelector((state)=>state.currencyStore);


    return(
        <section className={`product-info-section ${specificClass}`}>


            <WishlistActionComponent product={product} titleSpecificClass="custom-title-holder-product-info" />
    
            
            
            <div className="product-rank-holder">
                <RankComponent rating={product.rating} />
                <p>({product.rating ? product.rating.toFixed(1) : product.rating.toFixed(0)})</p>
            </div>

            <StockCircleIndicatorComponent product={product} />
        {params?.category && params?.brand 
            ?
            <>
                <p className="category-p"><span>Category:</span> <span>{params.category.replaceAll("-"," ")}</span></p>
                <p className="brand-p"><span>Brand:</span> <span>{params.brand.replaceAll("-"," ")}</span></p>
            </>
            :
            <p className="description-p">{product.description}</p>
        }
            <div className="price-holder">
                {product.discountPercentage ?

                <>
                    <p className="discount">-{Math.round(product.discountPercentage*100)}%</p>
                    <p className="price-no-discount">{getFinalPrice(product,currencyStore).priceNoDisc}</p>
                    <p className="price-discount">{getFinalPrice(product,currencyStore).finalPrice}</p>
                </>
                
                :
                <p className="original-price">{getFinalPrice(product,currencyStore).finalPrice}</p>              
                }
            </div>

            <div className="quantity-holder">

                <p>Quantity:</p>
                <ProductQuantityComponent 
                productQuantity={productQuantity} 
                setProductQuantity={setProductQuantity} />
                
            </div>
            

            <CartActionComponent 
                showCustomTitle={false} 
                specificClass="cart-action"
                productQuantity={productQuantity}
                product={product}
                specificOffcanvas={specificOffcanvas} />
            
            <CompareActionComponent product={product} />

            <section className="social-networks-section">
                <SocialNetworkLinkComponent socialNet="facebook" />
                <SocialNetworkLinkComponent socialNet="twitter" />
                <SocialNetworkLinkComponent socialNet="instagram" />
            </section>
            {
                showOffcanvas && <CartOffcanvasComponent product={product} productQuantity={productQuantity} specificOffcanvas={specificOffcanvas} />
            }
        </section>
    );
}

export default ProductInfoComponent;