import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrder } from "../services/order.service";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";
import OneOrderComponent from "../UIkit/OneOrder.Component";

const UserOrderPageComponent = ()=>{

    const [order,setOrder] = useState(null);
    const [orderError,setOrderError] = useState("");
    const params = useParams();

    useEffect(()=>{
        getUserOrder(params.id)
        .then((res)=>{
            setOrder(res.data[0]);
        })
        .catch((err)=>{
            setOrderError("Problem occured while getting your order from the database. Please reload the page.");
        })
    },[params])

    return(
        <>
            <HeaderMainHeadingComponent h1Text="Your Order" />
            <section className="user-order-section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        {
                            orderError
                            ?
                            <p className="error-get-data-par">{orderError}</p>
                            :
                            <OneOrderComponent order={order} />
                        }
                        </div>
                    </div>
                </div>
            </section>            
        </>
    );
}

export default UserOrderPageComponent;