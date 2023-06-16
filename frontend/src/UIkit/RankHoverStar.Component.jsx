import { forwardRef } from "react";
import {BsStarFill,BsStar} from "react-icons/bs";

const RankHoverStarComponent = forwardRef(function RankHoverStarComponent({emptyStar,starNum,event},ref){
    return(
        <div className={
            emptyStar 
            ? 
            `star-holder empty-star-holder empty-star-${starNum}` 
            : 
            `star-holder full-star-holder full-star-${starNum}`} ref={ref} {...event}>
            {emptyStar ? <BsStar /> : <BsStarFill />}
        </div>
    );
});

export default RankHoverStarComponent;