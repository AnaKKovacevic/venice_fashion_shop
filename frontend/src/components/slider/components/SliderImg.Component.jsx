import { forwardRef } from "react";
import { Link } from "react-router-dom";

const SliderImgComponent = forwardRef(function SliderImgComponent({wrapClass,path,imgSrc,imgAlt,imgClass,msgClass,textOne,textTwo},ref){
    return(
        <article>
            <Link className={wrapClass} to={path} ref={ref} >
           
                <div className="slider-img-holder">
                    <img src={imgSrc} alt={imgAlt} className={`slider-img ${imgClass}`} />
                </div>

                <h2 className={`slider-msg-holder ${msgClass}`}>
                    <span>{textOne}</span> {textTwo}
                </h2>
            
            </Link>
        </article>
    );
});

export default SliderImgComponent;