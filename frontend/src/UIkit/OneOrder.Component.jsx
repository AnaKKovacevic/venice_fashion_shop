import { getShortDate, getTotalOrderPrice, getTotalOrderQuantity } from "../services/order.service";
import OneOrderTableComponent from "./OneOrderTable.Component";

const OneOrderComponent = ({order})=>{


    return(
        <section className="table-section one-order-section">
            <div className="order-date-holder">
                <p>Order Date: <span>{order ? getShortDate(order.date) : null}</span></p>
            </div>
            <OneOrderTableComponent order={order} />
            <div className="order-total-holder">
                <p>Total {`(${getTotalOrderQuantity(order)} ${getTotalOrderQuantity(order)===1 ? "item" : "items"}): `}
                    <span>{order ? getTotalOrderPrice(order).finalPrice : null}</span>
                </p>
            </div>
        </section>
    );
}

export default OneOrderComponent;