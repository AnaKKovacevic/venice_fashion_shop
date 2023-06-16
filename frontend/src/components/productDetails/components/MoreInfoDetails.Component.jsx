import { useEffect, useRef } from "react";

const MoreInfoDetailsComponent = ({product})=>{

    const indicatorRef = useRef(null);
    useEffect(()=>{
        if(product.stock >= 30){
            indicatorRef.current.classList.add("stock-number-indicator-full");
        }else{
            indicatorRef.current.classList.remove("stock-number-indicator-full");
        }
    },[product])
    return(
        <>
            <p>{product.description}</p>
            <div className="stock-info-holder">
                <p>Stock status:</p>
                <div className="stock-number-indicator" ref={indicatorRef}>
                    {
                        product.stock < 30 && product.stock > 0
                        ?
                        <div className="stock-number-indicator-yellow"></div>
                        :
                        null
                    }
                    
                </div>
                <p>{product.stock} items</p>
            </div>
        </>
    );
}

export default MoreInfoDetailsComponent;