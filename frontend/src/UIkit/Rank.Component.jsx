import {BsStarFill,BsStarHalf,BsStar} from "react-icons/bs";

const RankComponent = ({rating})=>{

    let stars = [];
   
    let ratingDecimal = rating - Math.trunc(rating);

    for(let i =0; i < Math.trunc(rating);i++){
        stars.push(<BsStarFill />);
    }

    if(ratingDecimal > 0 && ratingDecimal < 0.25){
        stars.push(<BsStar />);
    }else if(ratingDecimal >= 0.25 && ratingDecimal < 0.75){
        stars.push(<BsStarHalf />);
    }else if(ratingDecimal >= 0.75){
        stars.push(<BsStarFill />);
    }

    for(let i = stars.length; i < 5;i++){
        stars.push(<BsStar />);
    }

    const starsList = ()=>{
        
        return stars.map((star,index)=>{
            return(
                <div className="star-holder" key={index}>
                    {star}
                </div>
            );
        })
    }
    return(
        <div className="stars-holder">
            {starsList()}
        </div>
    );
} 

export default RankComponent;