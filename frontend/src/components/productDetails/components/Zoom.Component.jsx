import { useRef } from "react";
import ZoomInModalComponent from "./ZoomInModal.Component";

const ZoomComponent = ({product,activeImg,imgsArray})=>{

    const imgRef = useRef(null);
    const helperHolderRef = useRef(null);

    let helperOffsetX = 0;
    let helperOffsetY = 0;
    let helperHalfWidth = 0;
    let helperHalfHeight = 0;

    const handleMouseOver = (e)=>{
        

        let imgEl = imgRef.current;

        helperHalfWidth = helperHolderRef.current.clientWidth / 2;
        helperHalfHeight = helperHolderRef.current.clientHeight / 2;

        imgEl.style.transform = "scale(1.2,1.2)";

        helperOffsetX = e.nativeEvent.offsetX;
        helperOffsetY = e.nativeEvent.offsetY;

        if(helperOffsetX <= helperHalfWidth){
            imgEl.style.left = (helperHalfWidth - helperOffsetX) + "px";
        }else{
            imgEl.style.right = (helperOffsetX - helperHalfWidth) + "px";
            imgEl.style.left = "auto";
        }

        if(helperOffsetY <= helperHalfHeight){
            imgEl.style.top = (helperHalfHeight - helperOffsetY) + "px";
        }else{
            imgEl.style.bottom = (helperOffsetY - helperHalfHeight) + "px";
            imgEl.style.top = "auto";
        }
        
        helperHolderRef.current.addEventListener("mousemove",handleMouseMoveX);
        helperHolderRef.current.addEventListener("mousemove",handleMouseMoveY);

    }

    const handleMouseMoveX = (e)=>{
        let helperNewOffsetX = e.offsetX;
        let imgEl = imgRef.current;

        if(helperOffsetX <= helperHalfWidth){
            imgEl.style.left = (helperHalfWidth - helperNewOffsetX) + "px";
            imgEl.style.right = "auto";
        }else{
            imgEl.style.right = (helperNewOffsetX - helperHalfWidth) + "px";
            imgEl.style.left = "auto";
        }
    }

    const handleMouseMoveY = (e)=>{
        let helperNewOffsetY = e.offsetY;
        let imgEl = imgRef.current;

        if(helperOffsetY <= helperHalfHeight){
            imgEl.style.top = (helperHalfHeight - helperNewOffsetY) + "px";
            imgEl.style.bottom = "auto";
        }else{
            imgEl.style.bottom = (helperNewOffsetY - helperHalfHeight) + "px";
            imgEl.style.top = "auto";
        }
    }

    const handleMouseOut = ()=>{
        setImgStartPosition();
        helperHolderRef.current.removeEventListener("mousemove",handleMouseMoveX);
        helperHolderRef.current.removeEventListener("mousemove",handleMouseMoveY);
    }

    const setImgStartPosition = ()=>{
        let imgEl = imgRef.current;
        imgEl.style.top = 0;
        imgEl.style.left = 0;
        imgEl.style.right = "auto";
        imgEl.style.bottom = "auto";

        imgEl.style.transform = "scale(1,1)";
    }


    return(
        <section className="main-img-section">
            <div className="main-img-zoom-holder">
                <div className="main-img-holder" ref={imgRef}>
                    <img src={activeImg} alt={product.title} referrerPolicy="no-referrer" />
                </div>
                <div className="zoom-helper-holder" onMouseOver={(e)=>handleMouseOver(e)} onMouseOut={()=>handleMouseOut()} ref={helperHolderRef}></div>
                <ZoomInModalComponent 
                    product={product} 
                    setImgStartPosition={setImgStartPosition} 
                    activeImg={activeImg}
                    imgsArray={imgsArray} />
            </div>
        </section>
    );
}

export default ZoomComponent;