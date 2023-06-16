import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrder } from "../../../services/order.service";
import OneOrderTableComponent from "../../../UIkit/OneOrderTable.Component";
import DahsboardCustomerTableComponent from "./components/DashboardCustomerTable.Component";
import DashboardOrderSummaryTableComponent from "./components/DashboardOrderSummaryTable.Component";

const OrderDetailsComponent = ()=>{

    const [order,setOrder] = useState(null);
    const [orderErr,setOrderErr] = useState("");
    const params = useParams();

    useEffect(()=>{
        getUserOrder(params.id)
        .then((res)=>{
            setOrder(res.data[0]);
        })
        .catch((err)=>{
            setOrderErr("Something went wrong while getting order from the database. Please reload the page.")
        })
    },[params])

    return(
        <div className="dashboard-one-order-holder">
            {
                orderErr
                ?
                <p className="error-get-data-par my-3">{orderErr}</p>
                :
                (
                    order
                    ?
                    <div className="row">
                        <div className="col-md-5 mb-5">
                            <DashboardOrderSummaryTableComponent order={order} />
                        </div>
                        <div className="col-md-7 mb-5">
                            <DahsboardCustomerTableComponent customer={order.customer} /> 
                        </div>
                        
                        <div className="col-12 table-section one-order-section">
                            <h3>Order details</h3>
                            <OneOrderTableComponent order={order} />
                        </div>
                        
                        
                    </div>
                    :
                    null
                )
                    
               
            }
        </div>
    );
}

export default OrderDetailsComponent;