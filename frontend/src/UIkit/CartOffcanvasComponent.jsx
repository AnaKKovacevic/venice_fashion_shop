import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getFinalPrice } from "../services/product.service";

const CartOffcanvasComponent = ({product,productQuantity,specificOffcanvas})=>{

    const cartStore = useSelector((state)=>state.cartStore);
    const currencyStore = useSelector((state)=>state.currencyStore);
    return(
        <div 
            className="offcanvas offcanvas-end offcanvasAddedToCart" 
            tabIndex="-1" 
            id={`addedToCartOffcanvas${specificOffcanvas}${product._id}`} 
            aria-labelledby={`addedToCartOffcanvasLabel${specificOffcanvas}${product._id}`}>
        <div className="offcanvas-header">
            <h2 className="offcanvas-title" id={`addedToCartOffcanvasLabel${specificOffcanvas}${product._id}`}>Added to cart</h2>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div className="added-product-holder">
                <h3>{product.title}</h3>
                <div className="img-holder text-center">
                    <img src={product.thumbnail} alt={product.title} className="cart-offcanvas-img" referrerPolicy="no-referrer" />
                </div>
                <div className="added-product-price-quantity-holder">
                    <div className="added-product-price-holder d-flex justify-content-between align-items-center">
                        <span className="title-span">Price per product</span>
                        <div className="added-product-price-num-holder">
                            {
                                product.discountPercentage
                                ?
                                <>
                                    <span className="no-disc-span">{getFinalPrice(product,currencyStore).priceNoDisc}</span><br/>
                                    <span>{getFinalPrice(product,currencyStore).finalPrice}</span>
                                </>
                                :
                                <span>{getFinalPrice(product,currencyStore).finalPrice}</span>
                            }

                        </div>
                    </div>
                    <div className="added-product-quantity-holder d-flex justify-content-between">
                        <span className="title-span">Quantity</span>
                        <span>{productQuantity}</span>
                    </div>
                </div>
                <div className="cart-info-holder">
                    <h4>Your cart</h4>
                    <div className="cart-quantity-holder d-flex justify-content-between align-items-center">
                        <span className="title-span">Total items</span>
                        <span>{cartStore.totalQuantity}</span>
                    </div>
                    <div className="cart-price-holder d-flex justify-content-between align-items-center">
                        <span className="title-span">Total price</span>
                        <span>{getCartTotalPrice(cartStore.totalPrice,currencyStore).finalPrice}</span>
                    </div>
                </div>
            </div>
            <div className="shop-checkout-btns-holder text-center">
                <button 
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close">
                        Continue shopping
                </button>
                <Link to="/checkout">Proceed to checkout</Link>
            </div>               
        </div>
    </div>
    );
}

export default CartOffcanvasComponent;