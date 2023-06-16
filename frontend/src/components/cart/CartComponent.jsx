import { useSelector } from "react-redux";
import CartTableComponent from "./components/CartTable.Component";
import { getCartTotalPrice } from "../../services/product.service";
import { Link } from "react-router-dom";

const CartComponent = ()=>{

    const cartStore = useSelector((state)=>state.cartStore);
    const currencyStore = useSelector((state)=>state.currencyStore);

    return(
        <section className="table-section view-cart-section">
            <div className="container">
                <div className="row">
                    {
                        cartStore.totalQuantity
                        ?
                        <>
                            <div className="col-12">
                                <CartTableComponent />
                            </div>
                            <div className="col-12">
                                <div className="cart-total-holder">
                                    <p>Total {`(${cartStore.totalQuantity} ${cartStore.totalQuantity === 1 ? "item" : "items"}): `}
                                        <span>{getCartTotalPrice(cartStore.totalPrice,currencyStore).finalPrice}</span>
                                    </p>
                                    <Link to="/checkout">Proceed to checkout</Link>
                                </div>
                            </div>
                        </>
                        :
                        <div className="col">
                            <p className="no-products-par">There are no products in cart.</p>
                        </div>  
                    }

                </div>
            </div>
        </section>
    );
}

export default CartComponent;