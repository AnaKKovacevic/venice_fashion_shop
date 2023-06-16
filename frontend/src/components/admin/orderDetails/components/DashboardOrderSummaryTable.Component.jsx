import { getShortNumDate } from "../../../../services/date.service";
import { getTotalOrderPrice, getTotalOrderQuantity } from "../../../../services/order.service";

const DashboardOrderSummaryTableComponent = ({order})=>{

    return(
        <div className="table-responsive">
            <table className="table table-bordered scope-row-table">
                    <thead>
                        <tr>
                            <td></td>
                            <th scope="col" className="text-center">Order summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Date</th>
                            <td className="text-center">{getShortNumDate(order.date)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Quantity</th>
                            <td className="text-center">{getTotalOrderQuantity(order)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Currency</th>
                            <td className="text-center">{order.currencyData.currency.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total price</th>
                            <td className="text-center">{getTotalOrderPrice(order).finalPrice}</td>
                        </tr>
                    </tbody>

            </table>
        </div>
    );
}

export default DashboardOrderSummaryTableComponent;