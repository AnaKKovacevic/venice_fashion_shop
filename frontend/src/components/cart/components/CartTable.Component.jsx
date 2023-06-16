import { useSelector } from "react-redux";
import CartTableRowComponent from "./CartTableRow.Component";

const CartTableComponent = ()=>{

    const cartStore = useSelector((state)=>state.cartStore);

    const showCartProductRows = ()=>{
        return cartStore.products.map((product,index)=>{
            return <CartTableRowComponent product={product} key={product.product._id} />
        })
    }

    return(
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" colSpan={3}>Product</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Quantity</th>
                        <th scope="col" className="text-center">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {showCartProductRows()}
                </tbody>
            </table>
        </div>
    );
}

export default CartTableComponent;