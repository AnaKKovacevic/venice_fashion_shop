import OrderListTableRowComponent from "./OrderListTableRow.Component";

const OrderListTableComponent = ({orderList})=>{

    const showOrderListRows = ()=>{
        return orderList.map((order,index)=>{
            return <OrderListTableRowComponent order={order} key={index} /> 
        })
    }

    return(
        <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Products</th>
                    <th scope="col" className="text-center">Quantity</th>
                    <th scope="col" className="text-center">Price</th>
                    <th scope="col" className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {showOrderListRows()}
            </tbody>
        </table>
    </div>
    );
}

export default OrderListTableComponent;