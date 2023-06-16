import { useRef, useState,useEffect } from "react";
import ImgItemComponent from "./ImgItem.Component";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

const ProductImgsSliderComponent = ({product,imgsArray,handleImgClick,activeImg})=>{

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowResizeExists, setWindowResizeExists] = useState(false);
    
    

    let imgsList = useRef(null);
    let leftArrow = useRef(null);
    let rightArrow = useRef(null);

    let refCounter = useRef(1);

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

        const handleWindowResizeProductImgsSlider = ()=>{
            let windowInnerWidth = window.innerWidth;
            imgsList.current.style.left = 0;
            refCounter.current = 1;
            if(!leftArrow.current.classList.contains("disabled-arrow")){
                leftArrow.current.classList.add("disabled-arrow")
            }


            if(imgsArray.length === 1){
                setRightArrowDisabled(true);
            }else if((imgsArray.length === 2 || imgsArray.length === 3)){
                if(windowInnerWidth >= 576){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }else if(imgsArray.length === 4){
                if(windowInnerWidth >= 1200){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }else if(imgsArray.length === 5){
                if(windowInnerWidth >= 1400){
                    setRightArrowDisabled(true);
                }else{
                    setRightArrowDisabled(false);
                }  
            }

            if(windowWidth < 576){
                if(window.innerWidth >= 576){
                    setWindowWidth(window.innerWidth);                   
                }
            }else if(windowWidth >= 576 && windowWidth < 1200){
                if(window.innerWidth < 576 || window.innerWidth >= 1200){                    
                    setWindowWidth(window.innerWidth);                   
                }               
            }else if(windowWidth >= 1200 && windowWidth < 1400){
                if(window.innerWidth < 1200 || window.innerWidth >= 1400){
                    setWindowWidth(window.innerWidth);                   
                }              
            }else if(windowWidth >= 1400){
                if(window.innerWidth < 1400){
                    setWindowWidth(window.innerWidth);
                }
            }
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResizeProductImgsSlider);
        }

        window.addEventListener("resize",handleWindowResizeProductImgsSlider);
        setWindowResizeExists(true);

        return ()=>{
            window.removeEventListener("resize",handleWindowResizeProductImgsSlider);
           
        }

    },[windowResizeExists,windowWidth,imgsArray.length])

    

    useEffect(()=>{
        if(imgsArray.length === 1){
            setRightArrowDisabled(true);
        }else if(imgsArray.length === 2 || imgsArray.length === 3){

            if(windowWidth >= 576){
                setRightArrowDisabled(true);
            }else{
                setRightArrowDisabled(false);
            }           
        }else if(imgsArray.length === 4){
            if(windowWidth >= 1200){
                setRightArrowDisabled(true);
            }else{
                setRightArrowDisabled(false);
            }  
        }else if(imgsArray.length === 5){
            if(windowWidth >= 1400){
                setRightArrowDisabled(true);
            }else{
                setRightArrowDisabled(false);
            }  
        }
    },[imgsArray.length,windowWidth])




    const productImgsItems = ()=>{
        

        if(imgsArray.length){
            return(
                imgsArray.map((imgSrc,index)=>{
                    return <ImgItemComponent 
                                    key={index} 
                                    imgSrc={imgSrc} 
                                    alt={product.title} 
                                    index={index} 
                                    windowWidth={windowWidth}
                                    handleImgClick={handleImgClick}
                                    activeImg={activeImg} />
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
        imgsList.current.style.left = `-${percentageLeft}%`;
        refCounter.current = refCounter.current + refCounterAddend;
    }



    const handleRightClick = ()=>{
        let imgsArrayLength = imgsArray.length;
      
        if(!rightArrow.current.classList.contains("disabled-arrow")){
            if(windowWidth < 576 && refCounter.current < imgsArrayLength){
                changePosition(0,100,0,1);
                checkDisabledArrow(imgsArrayLength,1);               
            }else if(windowWidth >= 576 && windowWidth < 1200 && refCounter.current < imgsArrayLength - 2){
                changePosition(0,33.33,0,1);
                checkDisabledArrow(imgsArrayLength - 2,1);                
            }else if(windowWidth >= 1200 && windowWidth < 1400 && refCounter.current < imgsArrayLength - 3){
                changePosition(0,25,0,1);
                checkDisabledArrow(imgsArrayLength - 3,1);
            }else if(windowWidth >= 1400 && refCounter.current < imgsArrayLength - 4){
                changePosition(0,20,0,1);
                checkDisabledArrow(imgsArrayLength - 4,1);
            }
        }
    }

    const handleLeftClick = ()=>{
        let imgsArrayLength = imgsArray.length;
        if(refCounter.current > 1){

            if (windowWidth < 576) {
                changePosition(-1,100,-100,-1);     
                checkDisabledArrow(imgsArrayLength,1);
            }else if(windowWidth >= 576 && windowWidth < 1200){
                changePosition(-1,33.33,-33.33,-1);
                checkDisabledArrow(imgsArrayLength-2,1);
            }else if(windowWidth >= 1200 && windowWidth < 1400){
                changePosition(-1,25,-25,-1);
                checkDisabledArrow(imgsArrayLength - 3,1);
            }else if(windowWidth >= 1400){
                changePosition(-1,20,-20,-1);
                checkDisabledArrow(imgsArrayLength - 4,1);
            }


    }
    }

    return(
        <section className="additional-imgs-section">
            <div className="product-imgs-parent">
                <div className="product-imgs-left-arrow-holder disabled-arrow" onClick={()=>handleLeftClick()} ref={leftArrow}>
                    <div className="product-imgs-left-arrow">
                        <BsChevronLeft />
                    </div>
                </div>
                            
                <ul className="product-imgs-list-holder" ref={imgsList}>
                    {productImgsItems()}
                </ul>

                <div className={`product-imgs-right-arrow-holder`} onClick={()=>handleRightClick()} ref={rightArrow}>
                    <div className="product-imgs-right-arrow">
                        <BsChevronRight />
                    </div>
                 </div>      
            </div>
        </section>
    );
}

export default ProductImgsSliderComponent;