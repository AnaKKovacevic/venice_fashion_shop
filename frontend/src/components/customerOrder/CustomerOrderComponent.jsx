import { useSelector } from "react-redux";
import OneOrderComponent from "../../UIkit/OneOrder.Component";

const CustomerOrderComponent = ()=>{

    const orderStore = useSelector((state)=>state.orderStore);

    return(
        <section className="customer-order-section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                        orderStore.order
                        ?
                        <OneOrderComponent order={orderStore.order} />
                        :
                        <p className="no-products-par">You haven't ordered anything yet.</p>   
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerOrderComponent;


//Commented part is used for stripe instead of the above code
/*
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { resetCart } from "../../redux/cart.slicer";
import { toggleLoader } from "../../redux/loader.slicer";
import { resetOrder } from "../../redux/order.slicer";
import { createOrder } from "../../services/order.service";
import { subtractProductQuantity } from "../../services/product.service";
import {toast} from "react-toastify";
import OneOrderComponent from "../../UIkit/OneOrder.Component";

const CustomerOrderComponent = ()=>{

    const orderStore = useSelector((state)=>state.orderStore);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [redirectStatusSuccess,setRedirectStatusSuccess] = useState(false);
    const [errorMsg,setErrorMsg] = useState("");
    const [order,setOrder] = useState(null);


    useEffect(()=>{
        
        if(searchParams.get("redirect_status") === "succeeded"){
            setRedirectStatusSuccess(true);
            let orderRestore = localStorage.getItem("vf_order_restore");
            if(orderRestore){
                setOrder(JSON.parse(orderRestore));
            }
            if(orderStore.order.customer && orderStore.order.currencyData && orderStore.order.cart && orderStore.createOrderDatabase){
                dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}))

                subtractProductQuantity(orderStore.order.cart)
                    .then((res)=>{
                        console.log(res.data);
                    })
                    .catch((err)=>{
                        toast.warn("Something went wrong. It may happen that some information about stock aren't updated.");
                    })
                createOrder(orderStore.order)
                .then((res)=>{
                    setOrder(res.data[0]);
                    localStorage.setItem("vf_order_restore",JSON.stringify(res.data[0]));
                    dispatch(resetCart());
                    dispatch(resetOrder());
                })
                .catch((err)=>{
                    if(err.response && (err.response.status === 408)){
                        setErrorMsg(err.response.data);
                    }else{
                        setErrorMsg("Something went wrong with displaying this page.");
                    }
                    
                })
                .finally(()=>{
                    dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}))
                })
            }
        }else{
            setRedirectStatusSuccess(false);
        }

    },[searchParams,orderStore,dispatch])

    useEffect(()=>{
        dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}))
    },[dispatch])

    const showOrderContent = ()=>{
        if(!redirectStatusSuccess){
            return <p className="error-get-data-par">Something went wrong during payment process. Please contact our customer support.</p>;
        }else if(errorMsg){
            return <p className="error-get-data-par">{errorMsg}</p>;
        }else if(order){
            return <OneOrderComponent order={order} />;
        }
    }

    return(
        <section className="customer-order-section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        {showOrderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerOrderComponent;*/