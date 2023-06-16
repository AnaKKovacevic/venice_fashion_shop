import { forwardRef } from "react";

const MoreInfoBtnComponent = forwardRef(function MoreInfoBtnComponent({children,windowWidth,handleBtnInfoClick,specificClass,id},ref){

    

    
    return(
            <h3>
                {windowWidth < 400 ?
                    <button 
                        className={`custom-btn-info ${specificClass}`}
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#${id}`} 
                        aria-expanded="false" 
                        aria-controls={id}
                        onClick={handleBtnInfoClick}
                        ref={ref}>
                        {children}

                    </button>
                    :
                    <button
                        className={ `custom-btn-info ${specificClass}`}
                        type="button"
                        onClick={handleBtnInfoClick}
                        ref={ref} >
                        {children}
                    </button>

                    }          
              </h3>
    );
});

export default MoreInfoBtnComponent;