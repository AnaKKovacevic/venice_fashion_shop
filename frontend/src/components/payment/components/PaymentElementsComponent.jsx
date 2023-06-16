/*import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleLoader } from "../../../redux/loader.slicer";
import { allowOrderDatabaseInsertion } from "../../../redux/order.slicer";

const PaymentElementsComponent = ({clientKey})=>{
    const stripe = useStripe();
    const elements = useElements();
    const [errorStripe, setErrorStripe] = useState("");
    const dispatch = useDispatch();
    let location = useLocation();



    const finishPayment = ()=>{
        if(!stripe || !elements || !clientKey){
            setErrorStripe("Something went wrong during payment process. Please try again.");
        }else{
            dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
            setTimeout(function(){
                if(location.pathname.includes("payment")){
                    dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                }
            },3000)
            dispatch(allowOrderDatabaseInsertion());
            stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "https://venicefashionshop.onrender.com/customer-order"
                }
            });
        }
    }

    return(
        <>
            {
            stripe && 
                <>
                    <PaymentElement />
                    <div className="pay-btn-holder text-center">
                        <button type="button" onClick={()=>finishPayment()}>Finish payment</button>
                    </div>
                </>
            }
            {
                errorStripe &&
                <p className="error-get-data-par">{errorStripe}</p>
            }
        </>       
    );
}

export default PaymentElementsComponent;*/