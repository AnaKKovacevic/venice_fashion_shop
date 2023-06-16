import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterBtnComponent from "./FooterBtn.Component";

const FooterSectionComponent = ({titleFooter,id,children})=>{

    const comparisonStore = useSelector((state)=>state.comparisonStore);
    const cartStore = useSelector((state)=>state.cartStore);
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
    const [windowResizeExists, setWindowResizeExists] = useState(false);
    const location = useLocation();

    useEffect(()=>{


        const handleWindowResizeFooter = ()=>{
            if(windowWidth < 768 && window.innerWidth >= 768){
                setWindowWidth(window.innerWidth);
            }else if(windowWidth >= 768 && window.innerWidth < 768){
                setWindowWidth(window.innerWidth);
            }
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResizeFooter);
        }

        window.addEventListener("resize",handleWindowResizeFooter);
        setWindowResizeExists(true);

        return ()=> window.removeEventListener("resize",handleWindowResizeFooter);
    },[windowResizeExists,windowWidth])

    const checkHeadingLevel = ()=>{
        if(location.pathname.includes("login") 
        || (location.pathname.includes("comparison") && comparisonStore.productsCompared.length) 
        || location.pathname.includes("register")
        || location.pathname.includes("blog")
        || location.pathname.includes("payment") 
        || location.pathname.includes("account-activation")){
            return(
                <h4>
                    <FooterBtnComponent windowWidth={windowWidth} id={id} titleFooter={titleFooter} />        
                </h4>
            );

        }else if(location.pathname.includes("cart") 
        || location.pathname.includes("wishlist") 
        || location.pathname.includes("customer-order") 
        || location.pathname.includes("order") 
        || (location.pathname.includes("comparison") && !comparisonStore.productsCompared.length)
        || (location.pathname.includes("checkout") && !cartStore.totalQuantity)){
            return(
                <h3>
                    <FooterBtnComponent windowWidth={windowWidth} id={id} titleFooter={titleFooter} />         
                </h3>
            );
        }else{
            return(
                <h5>
                    <FooterBtnComponent windowWidth={windowWidth} id={id} titleFooter={titleFooter} />       
                </h5>
            ); 
        }
    }

    return(
        <div className="col-md-auto">
            <section className="footer-link-section">
              {checkHeadingLevel()}
              <div className={`footer-links-holder ${windowWidth < 768 ? "collapse" : null}`} id={windowWidth < 768 ? id : null}>
                 <div className="footer-links-content-holder">
                    {children}
                 </div>
              </div>
            </section>
            
        </div>
    );
}

export default FooterSectionComponent;