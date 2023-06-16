import { useState,useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import BrandLogoComponent from "./components/BrandLogo.Component";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

const BrandSliderComponent = ()=>{

    const [windowResizeExists, setWindowResizeExists] = useState(false);

    let brandLogoArticlesHolder = useRef(null);

    let leftArrow = useRef(null);
    let rightArrow = useRef(null);

    let refCounter = useRef(1);

    const brandStore = useSelector((store)=>store.brandStore.brand);


    useEffect(()=>{

        const handleWindowResizeBrandSlider = ()=>{
            if(brandLogoArticlesHolder !== null){
                brandLogoArticlesHolder.current.style.left = 0;
            }
            
            refCounter.current = 1;
            if(!leftArrow.current.classList.contains("disabled-arrow")){
                leftArrow.current.classList.add("disabled-arrow")
            }
            if(rightArrow.current.classList.contains("disabled-arrow")){
                rightArrow.current.classList.remove("disabled-arrow")
            }
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResizeBrandSlider);
        }

        window.addEventListener("resize",handleWindowResizeBrandSlider);
        setWindowResizeExists(true);

        return ()=>{
            window.removeEventListener("resize",handleWindowResizeBrandSlider);
           
        }

    },[windowResizeExists])


    const brandsImgsList = ()=>{
        if(brandStore.length){
            
            let slideArr = brandStore.slice(0,11);
            
            return(
                slideArr.map((brand,index)=>{
                        return(
                            <BrandLogoComponent key={index} brand={brand} />
                        );

                })
            );
        }
    }

    const checkDisabledArrow = (numRight,numLeft)=>{
        if(refCounter.current < numRight){
            if(rightArrow.current.classList.contains("disabled-arrow")){
                rightArrow.current.classList.remove("disabled-arrow")
            }
        }else{
            if(!rightArrow.current.classList.contains("disabled-arrow")){
                rightArrow.current.classList.add("disabled-arrow")
            }
        }

        if(refCounter.current > numLeft){
            if(leftArrow.current.classList.contains("disabled-arrow")){
                leftArrow.current.classList.remove("disabled-arrow")
            }
        }else{
            if(!leftArrow.current.classList.contains("disabled-arrow")){
                leftArrow.current.classList.add("disabled-arrow")
            }
        }
    }

    const changePosition = (addend1,multiplier,addend2,refCounterAddend) =>{
        let percentageLeft = (refCounter.current + addend1)*multiplier +addend2;
        brandLogoArticlesHolder.current.style.left = `-${percentageLeft}%`;
        refCounter.current = refCounter.current + refCounterAddend;
    }

    const handleRightClick = ()=>{
        let windowWidth = window.innerWidth;

        if (windowWidth < 576 && refCounter.current < 11) {
            changePosition(0,100,0,1);
            checkDisabledArrow(11,1);     
        }else if(windowWidth >= 576 && windowWidth < 768 && refCounter.current < 10){
            changePosition(0,50,0,1);
            checkDisabledArrow(10,1);                
        }else if(windowWidth >= 768 && windowWidth < 992 && refCounter.current < 9){
            changePosition(0,33.33,0,1);
            checkDisabledArrow(9,1);
        }else if(windowWidth >= 992 && windowWidth < 1200 && refCounter.current < 8){
            changePosition(0,25,0,1);
            checkDisabledArrow(8,1);
        }else if(windowWidth >= 1200 && refCounter.current < 7){
            changePosition(0,20,0,1);
            checkDisabledArrow(7,1);
        }
    }

    const handleLeftClick = ()=>{
        let windowWidth = window.innerWidth;
        if(refCounter.current > 1){

            if (windowWidth < 576) {
                changePosition(-1,100,-100,-1);     
                checkDisabledArrow(11,1);
            }else if(windowWidth >= 576 && windowWidth < 768){
                changePosition(-1,50,-50,-1);
                checkDisabledArrow(10,1);
            }else if(windowWidth >= 768 && windowWidth < 992){
                changePosition(-1,33.33,-33.33,-1);
                checkDisabledArrow(9,1);
            }else if(windowWidth >= 992 && windowWidth < 1200){
                changePosition(-1,25,-25,-1);
                checkDisabledArrow(8,1);
            }else if(windowWidth >= 1200){
                changePosition(-1,20,-20,-1);
                checkDisabledArrow(7,1);
            }


    }
}




    return(
        <section className="brand-slider-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="brand-logo-articles-parent">
                            <div className="brand-slider-left-arrow-holder disabled-arrow" onClick={()=>handleLeftClick()} ref={leftArrow}>
                                <div className="brand-slider-left-arrow">
                                    <BsChevronLeft />
                                </div>
                            </div>
                            
                            <div className="brand-logo-articles-holder" ref={brandLogoArticlesHolder}>
                                {brandsImgsList()}
                            </div>
                            <div className="brand-slider-right-arrow-holder" onClick={()=>handleRightClick()} ref={rightArrow}>
                                <div className="brand-slider-right-arrow">
                                    <BsChevronRight />
                                </div>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandSliderComponent;