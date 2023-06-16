import { Link } from "react-router-dom";
import { getShortNumDate } from "../../../../services/date.service";
import { getTotalOrderPrice, getTotalOrderQuantity } from "../../../../services/order.service";

const DashboardOrderTableRowComponent = ({item})=>{
    return(
        <tr className="align-middle">
            <td>{getShortNumDate(item.date)}</td>
            <td>{item.customer.email}</td>
            <td className="text-center">{getTotalOrderQuantity(item)}</td>
            <td className="text-center">{getTotalOrderPrice(item).finalPrice}</td>
            <td className="text-center">
                <Link to={`/dashboard/order/${item._id}`} className="btn view-order-btn">View order</Link>
            </td>
        </tr>
    );
}

export default DashboardOrderTableRowComponent;