import { useEffect, useRef, useState } from "react";
import {BsZoomIn,BsChevronLeft, BsChevronRight} from "react-icons/bs";
import ModalComponent from "../../../UIkit/Modal.Component";

const ZoomInModalComponent = ({product,setImgStartPosition,activeImg,imgsArray})=>{

    const modalRef = useRef(null);
    const [activeModalImg,setActiveModalImg] = useState("");
    let modalImgIndexRef = useRef(0);
    let modalImgsArray = [...imgsArray];
    

    useEffect(()=>{
      setActiveModalImg(activeImg);
    },[activeImg])

    const handleMouseBtnClick = ()=>{
      modalRef.current.style.display = "block";
      modalImgIndexRef.current = modalImgsArray.findIndex(imgSrc=>{
        return imgSrc === activeImg;
      })

    }

    const handleMouseModalClick = ()=>{
      modalRef.current.style.display = "none";
      setActiveModalImg(activeImg);
    }

    const handleRightClick = (e)=>{
      e.stopPropagation();
      let newActiveImg = "";
      if(modalImgIndexRef.current === modalImgsArray.length - 1){
         modalImgIndexRef.current = 0;
      }else{
         modalImgIndexRef.current = modalImgIndexRef.current + 1;        
      }
      newActiveImg = modalImgsArray[modalImgIndexRef.current];
      setActiveModalImg(newActiveImg);
    }

    const handleLeftClick = (e)=>{
      e.stopPropagation();
      let newActiveImg = "";
      if(modalImgIndexRef.current === 0){
         modalImgIndexRef.current = modalImgsArray.length - 1;
      }else{
         modalImgIndexRef.current = modalImgIndexRef.current - 1;        
      }
      newActiveImg = modalImgsArray[modalImgIndexRef.current];
      setActiveModalImg(newActiveImg);
    }

    return(
        <>
            
            <button 
                type="button" 
                className="zoom-btn" 
                onMouseOver={()=>setImgStartPosition()}
                onClick={()=>handleMouseBtnClick()}>
                <BsZoomIn />
            </button>


          <ModalComponent ref={modalRef} specificClass="modal-img-slider" handleMouseModalClick={handleMouseModalClick}>
            <div className="modal-left-arrow-holder modal-arrows-holder" onClick={(e)=>handleLeftClick(e)}>
                <BsChevronLeft />
            </div>
            <div className="modal-img-holder">
              <img src={activeModalImg} alt={product.title} referrerPolicy="no-referrer" />
            </div>
            <div className="modal-right-arrow-holder modal-arrows-holder" onClick={(e)=>handleRightClick(e)} >
                <BsChevronRight />
            </div>
          </ModalComponent>
        
        </>
    );
}

export default ZoomInModalComponent;