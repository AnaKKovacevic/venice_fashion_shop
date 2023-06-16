import { useEffect, useRef } from "react";

const ImgItemComponent = ({imgSrc, alt, index,windowWidth,handleImgClick,activeImg})=>{

    const liRef = useRef(null);

    useEffect(()=>{
        if(index > 0){
            if(windowWidth < 576){
                liRef.current.style.left = (index*100 + 50) + "%";
            }else if(windowWidth >= 576 && windowWidth < 1200){
                liRef.current.style.left = (index*33.33) + "%";
            }else if(windowWidth >= 1200 && windowWidth < 1400){
                liRef.current.style.left = (index*25) + "%";
            }else if(windowWidth >= 1400){
                liRef.current.style.left = (index*20) + "%";
            }
            
        }
    },[index,windowWidth])

    return(
        <li className="img-list-item text-center" ref={liRef}>
            <div className={`img-holder ${activeImg === imgSrc ? null : "disabled-img"}`} onClick={()=>{handleImgClick(imgSrc)}}>
                <img src={imgSrc} alt={alt} referrerPolicy="no-referrer" />
            </div>
            
        </li>
    );
}

export default ImgItemComponent;