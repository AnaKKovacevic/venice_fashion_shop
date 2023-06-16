import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../services/order.service";
import OrderListTableComponent from "./components/OrderListTable.Component";

const OrderListComponent = ()=>{

    const userStore = useSelector((state)=>state.userStore);
    const [orderList,setOrderList] = useState([]);
    const [orderListError,setOrderListError] = useState("");

    useEffect(()=>{
        
        if(userStore.user){
            getUserOrders(userStore.user.email)
            .then((res)=>{
                setOrderList(res.data);
            })
            .catch((err)=>{
                setOrderListError("Problem occured while getting your orders from the database. Please reload the page.")
            })
        }

    },[userStore])

    const showOrderList = ()=>{
        if(orderListError){
            return <p className="error-get-data-par">{orderListError}</p>;
        }else if(orderList.length){
            return <OrderListTableComponent orderList={orderList} />
        }else if(orderList.length === 0){
            return <p className="no-products-par">You haven't ordered anything yet.</p>;
        }
    }

    return(
        <section className="order-list-section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        {showOrderList()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrderListComponent;