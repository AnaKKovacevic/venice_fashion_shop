import OrderDetailsComponent from "../../components/admin/orderDetails/OrderDetails.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const OrderPageComponent = ()=>{
    return(
        <section className="dashboard-one-order-section">
            <HeadingTwoComponent h2Text="Order" />
            <OrderDetailsComponent />
        </section>
    );
}

export default OrderPageComponent;