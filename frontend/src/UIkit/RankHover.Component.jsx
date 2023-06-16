import { useRef } from "react";
import RankHoverStarComponent from "./RankHoverStar.Component";

const RankHoverComponent = ({setProductRating})=>{

    const emptyStar1 = useRef(null);
    const emptyStar2 = useRef(null);
    const emptyStar3 = useRef(null);
    const emptyStar4 = useRef(null);
    const emptyStar5 = useRef(null);

    const fullStar1 = useRef(null);
    const fullStar2 = useRef(null);
    const fullStar3 = useRef(null);
    const fullStar4 = useRef(null);
    const fullStar5 = useRef(null);

    

    let emptyStarsArr = [emptyStar1,emptyStar2,emptyStar3,emptyStar4,emptyStar5];
    let fullStarsArr = [fullStar1,fullStar2,fullStar3,fullStar4,fullStar5];
    let starIndex = null;
    let starClickedIndex = useRef(null);


    const handleEmptyStarMouseEnter = (e)=>{


        starIndex = parseInt(e.currentTarget.getAttribute("class").slice(-1));

        for(let i = 0; i < starIndex;i++){
                emptyStarsArr[i].current.style.display = "none";
                fullStarsArr[i].current.style.display = "inline-block";           
        }

        for(let i = starIndex; i < 5;i++){
            emptyStarsArr[i].current.style.display = "inline-block";
            fullStarsArr[i].current.style.display = "none";           
    }

    }

    const handleFullStarMouseEnter = (e)=>{

        starIndex = parseInt(e.currentTarget.getAttribute("class").slice(-1));

        if(starClickedIndex.current){
            for(let i = 0; i < starIndex;i++){
            
                emptyStarsArr[i].current.style.display = "none";
                fullStarsArr[i].current.style.display = "inline-block";
            }

            for(let i = starIndex; i < 5;i++){
            
                emptyStarsArr[i].current.style.display = "inline-block";
                fullStarsArr[i].current.style.display = "none";
            }
        }
    }



    const handleFullStarMouseLeave = (e)=>{

        starIndex = parseInt(e.currentTarget.getAttribute("class").slice(-1));

        if(starClickedIndex.current){
            for(let i = 0; i < starClickedIndex.current;i++){
                emptyStarsArr[i].current.style.display = "none";
                fullStarsArr[i].current.style.display = "inline-block";           
            }

            for(let i = starClickedIndex.current; i < 5;i++){
                emptyStarsArr[i].current.style.display = "inline-block";
                fullStarsArr[i].current.style.display = "none";        
            }

        }else{

                for(let i = 0; i < starIndex;i++){
            
                    emptyStarsArr[i].current.style.display = "inline-block";
                    fullStarsArr[i].current.style.display = "none";
                }
            
        }

        
    }

    const handleFullStarMouseClick = (e)=>{

        starClickedIndex.current = parseInt(e.currentTarget.getAttribute("class").slice(-1));

        for(let i = 0; i < starClickedIndex.current;i++){
            emptyStarsArr[i].current.style.display = "none";
            fullStarsArr[i].current.style.display = "inline-block";
        }

        for(let i = starClickedIndex.current; i < 5;i++){
            emptyStarsArr[i].current.style.display = "inline-block";
            fullStarsArr[i].current.style.display = "none";
        }

        setProductRating(starClickedIndex.current);
    }

    return(
        <div className="stars-holder stars-hover-holder">

            <RankHoverStarComponent 
                emptyStar={true} 
                ref={emptyStar1} 
                starNum={1} 
                event={{onMouseOver:handleEmptyStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={false} 
                ref={fullStar1} 
                starNum={1} 
                event={{onClick:handleFullStarMouseClick, onMouseLeave:handleFullStarMouseLeave, onMouseOver:handleFullStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={true} 
                ref={emptyStar2} 
                starNum={2} 
                event={{onMouseOver:handleEmptyStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={false} 
                ref={fullStar2} 
                starNum={2} 
                event={{onClick:handleFullStarMouseClick, onMouseLeave:handleFullStarMouseLeave, onMouseOver:handleFullStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={true} 
                ref={emptyStar3} 
                starNum={3} 
                event={{onMouseOver:handleEmptyStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={false} 
                ref={fullStar3} 
                starNum={3} 
                event={{onClick:handleFullStarMouseClick, onMouseLeave:handleFullStarMouseLeave, onMouseOver:handleFullStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={true} 
                ref={emptyStar4} 
                starNum={4} 
                event={{onMouseOver:handleEmptyStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={false} 
                ref={fullStar4} 
                starNum={4} 
                event={{onClick:handleFullStarMouseClick, onMouseLeave:handleFullStarMouseLeave, onMouseOver:handleFullStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={true} 
                ref={emptyStar5} 
                starNum={5} 
                event={{onMouseOver:handleEmptyStarMouseEnter}} />
            <RankHoverStarComponent 
                emptyStar={false} 
                ref={fullStar5} 
                starNum={5} 
                event={{onClick:handleFullStarMouseClick, onMouseLeave:handleFullStarMouseLeave, onMouseOver:handleFullStarMouseEnter}} />
        </div>
    );
}

export default RankHoverComponent;