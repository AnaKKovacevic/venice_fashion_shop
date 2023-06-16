/*import {loadStripe} from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { initPayment } from "../../services/order.service";
import {Elements} from "@stripe/react-stripe-js";
import PaymentElementsComponent from "./components/PaymentElementsComponent";
const publishableKey = "";
const stripeObj = loadStripe(publishableKey);


const PaymentComponent = ()=>{

    const [clientKey,setClientKey] = useState("");
    const [error,setError] = useState("");
    const cartStore = useSelector((state)=>state.cartStore);
    const currencyStore = useSelector((state)=>state.currencyStore);
    let totalPriceRef = useRef(0);
    let currencyRef = useRef("");

    const appearance = {
        theme: "stripe",
        variables:{
            colorPrimary: "#fed219",
            colorText: "#000",
            colorDanger: "#cc3300",
            fontFamily: "Poppins, sans-serif"
        }
    }


    useEffect(()=>{

        if(totalPriceRef.current && currencyRef.current){
            initPayment({
                amount: totalPriceRef.current,
                currency: currencyRef.current
            })
            .then((res)=>{
                console.log(res.data);
                setClientKey(res.data);
            })
            .catch((err)=>{
                console.log(err);
                setError("Something went wrong. Please fill the checkout form again.")
            
            })
        }

    },[])

    useEffect(()=>{
        if(currencyStore.currency === "eur"){
            totalPriceRef.current = parseInt((parseFloat(cartStore.totalPrice.toFixed(2))*100).toFixed(0));
        }else{
            totalPriceRef.current = parseInt((parseFloat((cartStore.totalPrice * currencyStore.eurToUsd).toFixed(2))*100).toFixed(0));
        }
    },[cartStore,currencyStore])

    useEffect(()=>{
        currencyRef.current = currencyStore.currency;
    },[currencyStore])

    return(
        <section className="payment-section">
            <div className="container">
                <div className="row">
                    {error && 
                    <div className="col">
                        <p className="error-get-data-par">{error}</p>
                    </div> }

                    {
                        clientKey && 
                        <>
                            <div className="col-12">
                                <h2>Payment details</h2>
                            </div>
                            <div className="col-12">
                                <Elements stripe={stripeObj} options={{clientSecret: clientKey,appearance}}>
                                    <PaymentElementsComponent clientKey={clientKey}  />
                                </Elements>
                            </div>
                        </>
                    }
                </div>
            </div>
        </section>
    );
}

export default PaymentComponent;*/