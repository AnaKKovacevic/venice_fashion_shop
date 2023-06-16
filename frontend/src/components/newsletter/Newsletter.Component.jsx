import { useRef, useState } from "react";
import SocialNetworkLinkComponent from "../../UIkit/SocialNetworkLink.Component";
import { subscribeUser } from "../../services/user.service";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NewsletterComponent = ()=>{

    const comparisonStore = useSelector((state)=>state.comparisonStore);
    const cartStore = useSelector((state)=>state.cartStore);
    const [userEmail,setUserEmail] = useState({email: ""});
    const inputRef = useRef(null);
    const location = useLocation();


    const handleInputOnChange = (e)=>{
        let newUserEmail = userEmail;
        newUserEmail[e.target.name] = e.target.value;
        setUserEmail(newUserEmail);
    }

    const handleOnClick = ()=>{
        let mailFormat = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

        if(!userEmail.email){
            toast.error("Your email is required for subscription.");
        }else if(!userEmail.email.match(mailFormat)){
            toast.error("The email you entered is invalid.");

        }else{
            subscribeUser(userEmail)
                .then((res)=>{

                    if(res.status === 210){
                        toast.info(res.data);
                    }else{
                        toast.success(res.data);
                    }
                })
                .catch((err)=>{
                    if(err.response && err.response.status === 409){
                        toast.error(err.response.data);
                    }else{
                        toast.error("Problem while subscribing occured. Please try again.");
                    }
                    
                })
        }

        inputRef.current.value = "";
        setUserEmail({email: ""});


    }

    const checkHeadingLevel = (text)=>{
        if(location.pathname.includes("login") 
            || (location.pathname.includes("comparison") && comparisonStore.productsCompared.length) 
            || location.pathname.includes("register")
            || location.pathname.includes("blog")
            || location.pathname.includes("payment")
            || location.pathname.includes("account-activation")){
            return <h3>{text}</h3>
        }else if(location.pathname.includes("cart") 
        || location.pathname.includes("wishlist") 
        || location.pathname.includes("customer-order") 
        || location.pathname.includes("order") 
        || (location.pathname.includes("comparison") && !comparisonStore.productsCompared.length)
        || (location.pathname.includes("checkout") && !cartStore.totalQuantity)){
            return <h2>{text}</h2>
        }else{
            return <h4>{text}</h4>
        }
    }

    return(
        <section className="newsletter-section">
            <div className="container">
                <div className="row g-sm-0">
                    <div className="col-md-5">
                        <section className="social-networks-section">
                            {checkHeadingLevel("Connect with us")}
                            <div className="social-network-holder d-flex justify-content-center">
                                <SocialNetworkLinkComponent socialNet="facebook" />
                                <SocialNetworkLinkComponent socialNet="twitter" />
                                <SocialNetworkLinkComponent socialNet="youtube" />
                                <SocialNetworkLinkComponent socialNet="pinterest" />
                                <SocialNetworkLinkComponent socialNet="instagram" />
                            </div>
                        </section>
                    </div>
                    <div className="col-md-7">
                        <section className="subscribe-section">
                            {checkHeadingLevel("Subscribe to our newsletter")}
                            <div className="input-group">
                                <input 
                                    type="email"
                                    name="email" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    aria-label="Email" 
                                    aria-describedby="button-addon2"
                                    onChange={(e)=>handleInputOnChange(e)}
                                    ref={inputRef} />
                                <button className="btn btn-dark" type="button" id="button-addon2" onClick={()=>handleOnClick()}>Button</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsletterComponent;