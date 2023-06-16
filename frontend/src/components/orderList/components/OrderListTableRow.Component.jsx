import { Link } from "react-router-dom";
import { getShortDate, getTotalOrderPrice, getTotalOrderQuantity } from "../../../services/order.service";

const OrderListTableRowComponent = ({order})=>{


    const showProductTitle = ()=>{
        if(order.productsDetails.length > 1){
            return `${order.productsDetails[0].title},...`;
        }

        return order.productsDetails[0].title;
    }

    return(
        <tr className="align-middle">
            <td>
                {getShortDate(order.date)}
            </td>
            <td className="title-td">
                {showProductTitle()}
            </td>
            <td className="text-center">
                {getTotalOrderQuantity(order)}
            </td>
            <td className="text-center">
                {getTotalOrderPrice(order).finalPrice}
            </td>
            <td className="text-center">
                <Link to={`/user/order/${order._id}`}>View order</Link>
            </td>
        </tr>
    );
}

export default OrderListTableRowComponent;