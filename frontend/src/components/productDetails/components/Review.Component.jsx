import { getShortNumDate } from "../../../services/date.service";
import RankComponent from "../../../UIkit/Rank.Component";

const ReviewComponent = ({review}) =>{

    return(
        <>
            <RankComponent rating={review.rating} />
            <h5>{review.title}</h5> 
            <p>{review.reviewText}</p>
            <span>{review.userName}</span>
            <span>{getShortNumDate(review.writtenAt)}</span>
        
        </>
    );
}

export default ReviewComponent;