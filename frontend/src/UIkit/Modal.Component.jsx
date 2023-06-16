import { forwardRef } from "react";
import {BsXLg} from "react-icons/bs";

const ModalComponent = forwardRef(function ModalComponent({children,specificClass,handleMouseModalClick},ref){
    


    return(
        <div className={`custom-modal ${specificClass}`} ref={ref} onClick={()=>handleMouseModalClick()}>
            <div className="x-holder">
                <BsXLg/>
            </div>
            <div className="children-holder">
                {children}
            </div>
        </div>
    );
});

export default ModalComponent;