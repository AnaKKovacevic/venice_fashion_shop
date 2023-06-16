import { useEffect, useRef, useState } from "react";
import MoreInfoBtnComponent from "./MoreInfoBtn.Component";
import MoreInfoDetailsComponent from "./MoreInfoDetails.Component";
import MoreInfoReviewsComponent from "./MoreInfoReviews.Component";
import { useParams } from "react-router-dom";

const ProductMoreInfoComponent = ({product})=>{
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
    const [windowResizeExists, setWindowResizeExists] = useState(false);

    const [btnDetailsActive,setbtnDetailsActive] = useState(false);
    const [btnReviewsActive,setbtnReviewsActive] = useState(false);

    const btnDetailsRef = useRef(null);
    const btnReviewsRef = useRef(null);

    const params = useParams();


    

    useEffect(()=>{

        const handleWindowResizeMoreInfo = ()=>{
            if(windowWidth < 400 && window.innerWidth >= 400){
                setWindowWidth(window.innerWidth);
                if((!btnDetailsActive && !btnReviewsActive) || (btnDetailsActive && btnReviewsActive)){
                    setbtnDetailsActive(true);
                    setbtnReviewsActive(false);
                }
                
            }else if(windowWidth >= 400 && window.innerWidth < 400){
                setWindowWidth(window.innerWidth);
                setbtnDetailsActive(false);
                setbtnReviewsActive(false);
            }
            
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResizeMoreInfo);
        }

        window.addEventListener("resize",handleWindowResizeMoreInfo);
        setWindowResizeExists(true);
        return ()=> window.removeEventListener("resize",handleWindowResizeMoreInfo);
    },[windowResizeExists,windowWidth,btnDetailsActive,btnReviewsActive])

    useEffect(()=>{
        if(window.innerWidth >= 400){
            setbtnDetailsActive(true);
            setbtnReviewsActive(false);
        }
        
    },[])

    useEffect(()=>{
        setbtnDetailsActive(true);
        setbtnReviewsActive(false);
    },[params.productId])

    const handleBtnDetailsClick = ()=>{
        if(windowWidth < 400){
            if(btnDetailsActive){
                setbtnDetailsActive(false);
            }else{
                setbtnDetailsActive(true);
            }
            
        }else{
            setbtnDetailsActive(true);
            setbtnReviewsActive(false);
        }
    }

    const handleBtnReviewsClick = ()=>{
        if(windowWidth < 400){
            if(btnReviewsActive){
                setbtnReviewsActive(false);
            }else{
                setbtnReviewsActive(true);
            }
            
        }else{
            setbtnReviewsActive(true);
            setbtnDetailsActive(false);
        }
    }


    const displayBtnsContent = ()=>{
        if(windowWidth < 400){
            return(
                <>
                    <div className="btn-info-content-holder">
                        <div className="btn-info-holder">
                            <MoreInfoBtnComponent 
                                    specificClass={btnDetailsActive ? "product-details-btn active-info-btn" : "product-details-btn"}
                                    windowWidth={windowWidth} 
                                    id="product-details"
                                    handleBtnInfoClick={handleBtnDetailsClick}
                                    ref={btnDetailsRef}>
                                Product details
                            </MoreInfoBtnComponent>
                        </div>
                        <div className={`content-holder ${windowWidth < 400 ? "collapse" : null}`} id={windowWidth < 400 ? "product-details" : null}>
                            <MoreInfoDetailsComponent product={product} />
                        </div>
                    </div>
                    <div className="btn-info-content-holder">
                        <div className="btn-info-holder">
                            <MoreInfoBtnComponent 
                                    specificClass={btnReviewsActive ? "reviews-btn active-info-btn" : "reviews-btn"}
                                    windowWidth={windowWidth} 
                                    id="reviews"
                                    handleBtnInfoClick={handleBtnReviewsClick}
                                    ref={btnReviewsRef}>
                                Reviews
                            </MoreInfoBtnComponent>
                        </div>
                        <div className={`content-holder ${windowWidth < 400 ? "collapse" : null}`} id={windowWidth < 400 ? "reviews" : null}>
                            <MoreInfoReviewsComponent product={product} /> 
                        </div>
                    </div>
                </>
            )
        }else{
            return(
                <>              
                    <div className="btn-info-holder">
                        <MoreInfoBtnComponent 
                                specificClass={btnDetailsActive ? "product-details-btn active-info-btn" : "product-details-btn"}
                                windowWidth={windowWidth}
                                handleBtnInfoClick={handleBtnDetailsClick}
                                ref={btnDetailsRef}>
                            Product details
                        </MoreInfoBtnComponent>
                        <MoreInfoBtnComponent 
                                specificClass={btnReviewsActive ? "reviews-btn active-info-btn" : "reviews-btn"}
                                windowWidth={windowWidth}
                                handleBtnInfoClick={handleBtnReviewsClick}
                                ref={btnReviewsRef}>
                            Reviews
                        </MoreInfoBtnComponent>
                    </div>
                    <div className="content-holder">
                        <div className={btnDetailsActive ? "more-info-details-holder" : "more-info-content-hidden"}>
                            <MoreInfoDetailsComponent product={product} />
                        </div>
                        <div className={btnReviewsActive ? "reviews-holder" : "more-info-content-hidden"}>
                            <MoreInfoReviewsComponent product={product} /> 
                        </div>
                        
                    </div>
                </>
                
            )
        }
    }

    return(
        <section className="desc-review-section">
            <div className="desc-review-holder">
                {displayBtnsContent()}
                
            </div>
        </section>
    );
}

export default ProductMoreInfoComponent;