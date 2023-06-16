import { useEffect, useRef, useState } from "react";
import {BsChevronUp} from "react-icons/bs";

const ButtonToTopComponent = ()=>{

    const [windowScrollEventExists,setWindowScrollEventExists] = useState(false);
    const topBtnRef = useRef();
    
    const toPageTop = ()=>{
        window.scrollTo(0,0);
    }

    useEffect(()=>{
        const toggleTopBtn = ()=>{
            if(topBtnRef.current){
                if(window.scrollY > 200){
                    topBtnRef.current.style.display = "block";
                }else{
                    topBtnRef.current.style.display = "none";
                }
            }

        }
        if(windowScrollEventExists){
            window.removeEventListener("scroll",toggleTopBtn);
        }
        window.addEventListener("scroll",toggleTopBtn);
        setWindowScrollEventExists(true);

        return () => window.removeEventListener("scroll",toggleTopBtn);
    },[windowScrollEventExists])

    return(
        <div className="top-btn-holder" ref={topBtnRef}>
            <button type="button" className="top-btn" onClick={()=>toPageTop()}>
                <BsChevronUp />
            </button>
        </div>
    );
}

export default ButtonToTopComponent;