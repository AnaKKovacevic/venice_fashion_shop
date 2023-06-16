import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice } from "../../../services/product.service";
import CartProductArticleComponent from "./CartProductArticleComponent";

const CartProductsComponent = forwardRef(function CartProductsComponent(props,ref){

    const cartStore = useSelector((state)=>state.cartStore);
    const currencyStore = useSelector((state)=>state.currencyStore);
    const {mouseEvents} = props;


    const showProducts = ()=>{
        return cartStore.products.map((product,index)=>{
            return <CartProductArticleComponent product={product} key={product.product._id} currencyStore={currencyStore} />
        })
    }

    return(
            
                cartStore.products.length
                ?
                
                <div className="cart-products-holder" ref={ref} {...mouseEvents}>
                    <div className="cart-products-content-holder">
                        <p className="quantity-info-par">Cart: {`${cartStore.totalQuantity} ${cartStore.totalQuantity === 1 ? "item" : "items"}`}</p>

                        <div className="cart-products-articles-holder">
                            {showProducts()}
                        </div>
                        <div className="cart-total-price-holder d-flex justify-content-between">
                            <p>Total</p>
                            <p>{getCartTotalPrice(cartStore.totalPrice,currencyStore).finalPrice}</p>
                        </div>

                    </div>

                    <div className="cart-products-btns-holder text-center">
                        <Link to="/cart">View Cart</Link>
                        <Link to="/checkout">Proceed To Checkout</Link>
                    </div>
                </div>    
                
                :
                <p className="no-products-par" ref={ref} {...mouseEvents}>No products in cart</p>
            
            

        
    );
});

export default CartProductsComponent;