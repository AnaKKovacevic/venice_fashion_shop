import { useState,useEffect, useRef } from "react";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import ProductComponent from "./Product.Component";

const ProductsSliderComponent = ({products,sliderTitle,classPrefix, h2Title})=>{

    const [productsArray, setProductsArray] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowResizeExists, setWindowResizeExists] = useState(false);

    let productsArticlesHolder = useRef(null);

    let leftArrow = useRef(null);
    let rightArrow = useRef(null);

    let refCounter = useRef(1);


    useEffect(()=>{
        setProductsArray(products);
    },[products])

    const setRightArrowDisabled = (disabled)=>{
        if(disabled){
            if(!rightArrow.current.classList.contains("disabled-arrow")){
                rightArrow.current.classList.add("disabled-arrow")
            }
        }else{
            if(rightArrow.current.classList.contains("disabled-arrow")){
                rightArrow.current.classList.remove("disabled-arrow")
            }
        }
        
    }

    useEffect(()=>{

        const handleWindowResizeProducts = ()=>{
            let windowInnerWidth = window.innerWidth;
            productsArticlesHolder.current.style.left = 0;
            refCounter.current = 1;
            if(!leftArrow.current.classList.contains("disabled-arrow")){
                leftArrow.current.classList.add("disabled-arrow")
            }

            if(productsArray.length === 1){
                setRightArrowDisabled(true);
            }else if(productsArray.length === 2){
    
                if(windowInnerWidth >= 576){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }           
            }else if(productsArray.length === 3){
                if(windowInnerWidth >= 768){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }else if(productsArray.length === 4){
                if(windowInnerWidth >= 992){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }


            if(windowWidth < 576){
                if(window.innerWidth >= 576){
                    setWindowWidth(window.innerWidth);                   
                }
            }else if(windowWidth >= 576 && windowWidth < 768){
                if(window.innerWidth < 576 || window.innerWidth >= 768){                    
                    setWindowWidth(window.innerWidth);                   
                }               
            }else if(windowWidth >= 768 && windowWidth < 992){
                if(window.innerWidth < 768 || window.innerWidth >= 992){
                    setWindowWidth(window.innerWidth);                   
                }              
            }else if(windowWidth >= 992){
                if(window.innerWidth < 992){
                    setWindowWidth(window.innerWidth);
                }
            }
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResizeProducts);
        }

        window.addEventListener("resize",handleWindowResizeProducts);
        setWindowResizeExists(true);

        return ()=> window.removeEventListener("resize",handleWindowResizeProducts);
    },[windowResizeExists,windowWidth,productsArray])

    useEffect(()=>{
        if(productsArray){
            if(productsArray.length === 1){
                setRightArrowDisabled(true);
            }else if(productsArray.length === 2){
    
                if(windowWidth >= 576){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }           
            }else if(productsArray.length === 3){
                if(windowWidth >= 768){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }else if(productsArray.length === 4){
                if(windowWidth >= 992){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }
        }

    },[productsArray,windowWidth])


    const productsList = () =>{
        if(productsArray){
            return(
                productsArray.map((product,index)=>{
                    return(
                        <ProductComponent 
                            key={index} 
                            product={product} 
                            classes="products-cards-slider-article"
                            index={index} 
                            windowWidth={windowWidth}
                              />
                    )
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
        productsArticlesHolder.current.style.left = `-${percentageLeft}%`;
        refCounter.current = refCounter.current + refCounterAddend;
    }

    const handleRightClick = ()=>{
            let productsArrayLength = productsArray.length;

            if(!rightArrow.current.classList.contains("disabled-arrow")){
                if (windowWidth < 576 && refCounter.current < productsArrayLength) {
                               
                    changePosition(0,100,0,1);
                    checkDisabledArrow(productsArrayLength,1);
               
                }else if(windowWidth >= 576 && windowWidth < 768 && refCounter.current < productsArrayLength -1){
                    changePosition(0,50,0,1);
                    checkDisabledArrow(productsArrayLength -1,1);                
                }else if(windowWidth >= 768 && windowWidth < 992 && refCounter.current < productsArrayLength - 2){
                    changePosition(0,33.33,0,1);
                    checkDisabledArrow(productsArrayLength - 2,1);
    
                }else if(windowWidth >= 992 && refCounter.current < productsArrayLength - 3){
                    changePosition(0,25,0,1);
                    checkDisabledArrow(productsArrayLength - 3,1);
                }  
            }
            
  
    }

    const handleLeftClick = ()=>{
        
        let productsArrayLength = productsArray.length;

        if(refCounter.current > 1){
            
            if (windowWidth < 576) {

                changePosition(-1,100,-100,-1);   
                checkDisabledArrow(productsArrayLength,1);

            }else if(windowWidth >= 576 && windowWidth < 768){
                changePosition(-1,50,-50,-1);
                checkDisabledArrow(productsArrayLength - 1,1);
            }else if(windowWidth >= 768 && windowWidth < 992){
                
                changePosition(-1,33.33,-33.33,-1);
                checkDisabledArrow(productsArrayLength -2,1);
            }else if(windowWidth >= 992){
                changePosition(-1,25,-25,-1);
                checkDisabledArrow(productsArrayLength - 3,1);
            }      
        }  
    }

    return(

        
        <section className={`products-cards-slider-section ${classPrefix}-section`}>
            <div className="container px-sm-0">
                <div className="row gy-4">
                    <div className="col-12">
                        {h2Title ? 
                        <h2>{sliderTitle}</h2>
                        : 
                        <h3>{sliderTitle}</h3>
                        }
                        
                    </div>

                    <div className="col-12 text-center">
                        <div 
                            className={`products-cards-slider-left-arrow-holder ${classPrefix}-left-arrow-holder disabled-arrow`}
                            onClick={()=>handleLeftClick()} ref={leftArrow}>
                            <BsChevronLeft />
                        </div>
                        <div 
                            className={`products-cards-slider-right-arrow-holder ${classPrefix}-right-arrow-holder`}
                            onClick={()=>handleRightClick()} ref={rightArrow}>
                            <BsChevronRight />
                        </div>
                    </div>

                    <div className="col-12 px-sm-0">
                        <div className={`products-cards-slider-articles-parent ${classPrefix}-articles-parent`}>
                        <div className={`products-cards-slider-articles-holder ${classPrefix}-articles-holder`} ref={productsArticlesHolder}>
                            {productsList()}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default ProductsSliderComponent;