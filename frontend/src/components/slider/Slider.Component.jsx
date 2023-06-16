import { useEffect,useRef } from "react";
import Slider_all from "../../assets/imgs/slider-all.jpg";
import Slider_women from "../../assets/imgs/slider-women.jpg";
import Slider_men from "../../assets/imgs/slider-men.jpg";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import SliderImgComponent from "./components/SliderImg.Component";


const SliderComponent = ()=>{

    const sliderAllRef = useRef(null);
    const sliderWomenRef = useRef(null);
    const sliderMenRef = useRef(null);


    const indicatorAllRef = useRef(null);
    const indicatorWomenRef = useRef(null);
    const indicatorMenRef = useRef(null);

    let slideTimeout;
    let slideTimeoutAllCentered;
    let slideTimeoutWomenCentered;
    let slideTimeoutMenCentered;


    const startSlideTimeoutAllCentered = ()=>{

        
        sliderAllRef.current.setAttribute("class", "slider-img-all-holder animation-to-left-from-center");
        sliderWomenRef.current.setAttribute("class", "slider-img-women-holder animation-to-left-from-right");
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
         
        indicatorAllRef.current.classList.remove("slider-indicator-active");
        indicatorWomenRef.current.classList.add("slider-indicator-active");
    }

    const startSlideTimeoutWomenCentered = ()=>{
        
        sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right"); 
        sliderWomenRef.current.setAttribute("class", "slider-img-women-holder animation-to-left-from-center");
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder animation-to-left-from-right");


        indicatorWomenRef.current.classList.remove("slider-indicator-active");
        indicatorMenRef.current.classList.add("slider-indicator-active");
    }


    const startSlideTimeoutMenCentered = ()=>{


        sliderAllRef.current.setAttribute("class", "slider-img-all-holder animation-to-left-from-right");
        sliderWomenRef.current.setAttribute("class", "slider-img-women-holder"); 
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder animation-to-left-from-center");

        indicatorMenRef.current.classList.remove("slider-indicator-active");
        indicatorAllRef.current.classList.add("slider-indicator-active");
    }


    const startSlider = ()=>{

        slideTimeoutAllCentered = setTimeout(startSlideTimeoutAllCentered,4000);
        slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,10000);
        slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,16000);


        slideTimeout = setTimeout(startSlider,19000);
    }

    const startSlideTimeoutAllCenteredReverse = ()=>{

        sliderAllRef.current.setAttribute("class","slider-img-all-holder animation-to-right-from-center");
        sliderWomenRef.current.setAttribute("class","slider-img-women-holder");
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder animation-to-right-from-left");
       
        
        indicatorAllRef.current.classList.remove("slider-indicator-active");
        indicatorMenRef.current.classList.add("slider-indicator-active");

        slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,6000);

        slideTimeout = setTimeout(startSlider,8000);


        
    }

    const startSlideTimeoutWomenCenteredReverse = ()=>{

        sliderAllRef.current.setAttribute("class","slider-img-all-holder animation-to-right-from-left");
        sliderWomenRef.current.setAttribute("class","slider-img-women-holder animation-to-right-from-center");
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
       
        
        indicatorWomenRef.current.classList.remove("slider-indicator-active");
        indicatorAllRef.current.classList.add("slider-indicator-active");

        slideTimeout = setTimeout(startSlider,2000);
    }

    const startSlideTimeoutMenCenteredReverse = ()=>{

        sliderAllRef.current.setAttribute("class","slider-img-all-holder position-right");
        sliderWomenRef.current.setAttribute("class","slider-img-women-holder animation-to-right-from-left");
        sliderMenRef.current.setAttribute("class", "slider-img-men-holder animation-to-right-from-center");
    

        indicatorMenRef.current.classList.remove("slider-indicator-active");
        indicatorWomenRef.current.classList.add("slider-indicator-active");

        slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,6000);
        slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,12000);

        slideTimeout = setTimeout(startSlider,14000);

        

    }
    const replayTimeoutFromStart = ()=>{
        startSlideTimeoutAllCentered();
        slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,6000);
        slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,12000);

        slideTimeout = setTimeout(startSlider,14000);
    }

    const replayTimeoutFromMiddle = ()=>{
        startSlideTimeoutWomenCentered();
        slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,6000);

        slideTimeout = setTimeout(startSlider,8000);

    }

    const replayTimeoutFromEnd = ()=>{
        startSlideTimeoutMenCentered();
        slideTimeout = setTimeout(startSlider,2000);
    }

    const clearTimeouts = () =>{
        clearTimeout(slideTimeoutAllCentered);
        clearTimeout(slideTimeoutWomenCentered);
        clearTimeout(slideTimeoutMenCentered);
        clearTimeout(slideTimeout);
    }

    useEffect(()=>{

        
        indicatorAllRef.current.classList.add("slider-indicator-active");
        startSlider();

        return ()=> {
            clearTimeouts();
        }
    });



    const handleSlideFromRight = (e)=>{
        e.stopPropagation();

        clearTimeouts();

        if(indicatorAllRef.current.classList.contains("slider-indicator-active")){

            let positionLeft = parseInt(window.getComputedStyle(sliderAllRef.current,null).getPropertyValue("left").replace("px","").trim());

            // Case when ALL slides in from right
            if(sliderAllRef.current.classList.contains("animation-to-left-from-right")){
                if(positionLeft === 0){
                    replayTimeoutFromStart();

                }else if(positionLeft > 0){

                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                    

                    startSlider();
                }
            
            }else if(sliderAllRef.current.classList.contains("animation-to-right-from-left")){

                //Case when animation from left to right is in progrees and user clicks on right arrow
                
                if(positionLeft === 0){ 
                    replayTimeoutFromStart();

                }else if(positionLeft < 0){

                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");

                    slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                    slideTimeout = setTimeout(startSlider,12000);
                    
                    indicatorAllRef.current.classList.remove("slider-indicator-active");
                    indicatorWomenRef.current.classList.add("slider-indicator-active");
        
                }
            }else{
                //Case when All is at start position, without animation (if the user clicks before slide show started)
                replayTimeoutFromStart();
            }



        }else if(indicatorWomenRef.current.classList.contains("slider-indicator-active")){
           
            let positionLeft = parseInt(window.getComputedStyle(sliderWomenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(sliderWomenRef.current.classList.contains("animation-to-left-from-right")){

                if(positionLeft === 0){
                    replayTimeoutFromMiddle(); 
    
                }else if(positionLeft > 0){
    
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
    
                    slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);
    
                    slideTimeout = setTimeout(startSlider,12000);
                }
            }else if(sliderWomenRef.current.classList.contains("animation-to-right-from-left")){
                if(positionLeft === 0){
                    replayTimeoutFromMiddle(); 
    
                }else if(positionLeft < 0){
    
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");
    
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);
    
                    slideTimeout = setTimeout(startSlider,6000);

                    indicatorWomenRef.current.classList.remove("slider-indicator-active");
                    indicatorMenRef.current.classList.add("slider-indicator-active");
                }
            }else{
                replayTimeoutFromMiddle();
            }


        }else if(indicatorMenRef.current.classList.contains("slider-indicator-active")){ 
           
            let positionLeft = parseInt(window.getComputedStyle(sliderMenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(sliderMenRef.current.classList.contains("animation-to-left-from-right")){
                if(positionLeft === 0){
                    replayTimeoutFromEnd(); 
    
                }else if(positionLeft > 0){ 
    
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-left");
    
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);
    
                    slideTimeout = setTimeout(startSlider,6000);
                }
            }else if(sliderMenRef.current.classList.contains("animation-to-right-from-left")){
                if(positionLeft === 0){
                    replayTimeoutFromEnd();  
    
                }else if(positionLeft < 0){ 
    
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
    
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);
    
                    slideTimeout = setTimeout(startSlider,6000);

                    indicatorAllRef.current.classList.remove("slider-indicator-active");
                    indicatorMenRef.current.classList.add("slider-indicator-active");
                }
            }else{
                replayTimeoutFromEnd();  
            }
            


        }
    }

    const handleSlideFromLeft = (e)=>{
        e.stopPropagation();

        clearTimeouts();

        if(indicatorAllRef.current.classList.contains("slider-indicator-active")){ 

            let positionLeft = parseInt(window.getComputedStyle(sliderAllRef.current,null).getPropertyValue("left").replace("px","").trim());


            // Case when ALL slides in from left
            if(sliderAllRef.current.classList.contains("animation-to-left-from-right")){
                if(positionLeft === 0){ 
                    //reverse starts
                    startSlideTimeoutAllCenteredReverse();

                }else if(positionLeft > 0){ 
                    sliderAllRef.current.setAttribute("class","slider-img-all-holder position-right");
                    sliderMenRef.current.setAttribute("class","slider-img-men-holder position-centered");
                    
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                    slideTimeout = setTimeout(startSlider,6000);

                    indicatorAllRef.current.classList.remove("slider-indicator-active");
                    indicatorMenRef.current.classList.add("slider-indicator-active");

                }
            
            }else if(sliderAllRef.current.classList.contains("animation-to-right-from-left")){

               
                if(positionLeft === 0){ 
                    //reverse starts
                    startSlideTimeoutAllCenteredReverse();

                }else if(positionLeft < 0){ 
                    
                    sliderAllRef.current.setAttribute("class","slider-img-all-holder position-centered");
                    sliderWomenRef.current.setAttribute("class","slider-img-women-holder");
                    

                    startSlider();

                    indicatorWomenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");
                }
            }else{
                //Case when All is at start position, without animation (if the user clicks before slide show started)

                //reverse starts
                startSlideTimeoutAllCenteredReverse(); 
            }


        }else if(indicatorWomenRef.current.classList.contains("slider-indicator-active")){

            let positionLeft = parseInt(window.getComputedStyle(sliderWomenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(sliderWomenRef.current.classList.contains("animation-to-left-from-right")){
                if(positionLeft === 0){ 
                    startSlideTimeoutWomenCenteredReverse();
    
                }else if(positionLeft > 0){ 
    
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    
                    indicatorWomenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");

                    startSlider();
                    
                }
            }else if(sliderWomenRef.current.classList.contains("animation-to-right-from-left")){ 
                if(positionLeft === 0){ 
                    startSlideTimeoutWomenCenteredReverse();
    
                }else if(positionLeft < 0){ 
    
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");

                    slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                    slideTimeout = setTimeout(startSlider,12000);
                    
                    indicatorMenRef.current.classList.remove("slider-indicator-active");
                    indicatorWomenRef.current.classList.add("slider-indicator-active");

                    
                    
                }
            }else{
                startSlideTimeoutWomenCenteredReverse();
            }

        

        }else if(indicatorMenRef.current.classList.contains("slider-indicator-active")){
            
            let positionLeft = parseInt(window.getComputedStyle(sliderMenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(sliderMenRef.current.classList.contains("animation-to-left-from-right")){
                if(positionLeft === 0){ 
                    startSlideTimeoutMenCenteredReverse();
                    console.log("Usao u position 0 case - men left arrow");
    
                }else if(positionLeft > 0){ 
                    console.log("Usao u position>0 case - men left arrow");
    
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");

                    slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);
            
                    slideTimeout = setTimeout(startSlider,12000);
                    
                    indicatorMenRef.current.classList.remove("slider-indicator-active");
                    indicatorWomenRef.current.classList.add("slider-indicator-active");

    
                }
            }else if(sliderMenRef.current.classList.contains("animation-to-right-from-left")){
                if(positionLeft === 0){ 
                    startSlideTimeoutMenCenteredReverse();
                    console.log("Usao u position 0 case - men left arrow");
    
                }else if(positionLeft < 0){ 
                    console.log("Usao u position>0 case - men left arrow");
    
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");

                    slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);
            
                    slideTimeout = setTimeout(startSlider,6000);
                    
                    indicatorAllRef.current.classList.remove("slider-indicator-active");
                    indicatorMenRef.current.classList.add("slider-indicator-active");

    
                }
            }else{
                startSlideTimeoutMenCenteredReverse();
                console.log("Usao u men bez animacije");
            }

            console.log("usao u men left activated");

        }
    }

    const handleIndicatorAllClick = (e)=>{
        e.stopPropagation();
        clearTimeouts();
       
            // All indicator click

            
            if(e.currentTarget.classList.contains("slider-indicator-active")){
                let positionLeft = parseInt(window.getComputedStyle(sliderAllRef.current,null).getPropertyValue("left").replace("px","").trim());
                //Case when position is 0  
                if(positionLeft === 0){
                    startSlider();

                    console.log("Pozicija je 0 - indikator all aktivan");
                }else if(positionLeft > 0){
                    //Case when position more than 0
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                    
                    startSlider();
                    console.log("Pozicija je >0 - indikator all aktivan");

                }else{
                    //Case when position less than 0
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    startSlider();
                    console.log("Pozicija je <0 - indikator all aktivan");
                }
                
                
                
            }else if(indicatorWomenRef.current.classList.contains("slider-indicator-active")){
                //case woman active
                let positionLeft = parseInt(window.getComputedStyle(sliderWomenRef.current,null).getPropertyValue("left").replace("px","").trim());
                if(positionLeft === 0){
                    startSlideTimeoutWomenCenteredReverse();
                }else if(positionLeft > 0){
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    indicatorWomenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");
                    startSlider();
                }else{
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                    indicatorWomenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");
                    startSlider();
                }
            }else{
                //case men active
                let positionLeft = parseInt(window.getComputedStyle(sliderMenRef.current,null).getPropertyValue("left").replace("px","").trim());
                if(positionLeft === 0){
                    replayTimeoutFromEnd();
                }else if(positionLeft > 0){
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                    indicatorMenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");
                    startSlider();

                }else{
                    sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-centered");
                    sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                    indicatorMenRef.current.classList.remove("slider-indicator-active");
                    indicatorAllRef.current.classList.add("slider-indicator-active");
                    startSlider();
                    console.log("usao u men aktivan <0");
                }
            }
            
           

    }

    const handleIndicatorWomenClick = (e)=>{
        e.stopPropagation();
        clearTimeouts();

        if(e.currentTarget.classList.contains("slider-indicator-active")){
            let positionLeft = parseInt(window.getComputedStyle(sliderWomenRef.current,null).getPropertyValue("left").replace("px","").trim());
            //Case when position is 0  
            if(positionLeft === 0){
                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                console.log("Pozicija je 0 - indikator women aktivan");
            }else if(positionLeft > 0){ 
                //Case when position more than 0
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                
                
                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                
                console.log("Pozicija je >0 - indikator woman aktivan");

            }else{
                //Case when position less than 0
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                
                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                console.log("Pozicija je <0 - indikator woman aktivan");
            }
            
            
            
        }else if(indicatorAllRef.current.classList.contains("slider-indicator-active")){ 
            //case all active
            let positionLeft = parseInt(window.getComputedStyle(sliderAllRef.current,null).getPropertyValue("left").replace("px","").trim());
            if(positionLeft === 0){ 
                replayTimeoutFromStart();

                console.log("Pozicija 0 - indikator all aktivan");
            }else if(positionLeft > 0){
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder");

                indicatorAllRef.current.classList.remove("slider-indicator-active");
                indicatorWomenRef.current.classList.add("slider-indicator-active");

                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                console.log("Pozicija je >0 - indikator all aktivan");
                
            }else{
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-left");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder");

                indicatorAllRef.current.classList.remove("slider-indicator-active");
                indicatorWomenRef.current.classList.add("slider-indicator-active");

                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                console.log("Pozicija je <0 - indikator all aktivan");
            }
        }else{
            //case men active 
            let positionLeft = parseInt(window.getComputedStyle(sliderMenRef.current,null).getPropertyValue("left").replace("px","").trim());
            if(positionLeft === 0){ 
                startSlideTimeoutMenCenteredReverse();
                console.log("Men indikator aktivan - 0");
            }else if(positionLeft > 0){
                
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder");
                indicatorMenRef.current.classList.remove("slider-indicator-active");
                indicatorWomenRef.current.classList.add("slider-indicator-active");

                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);

                console.log("Pozicija je <0 - indikator all aktivan");
            }else{
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder position-centered");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder");

                indicatorMenRef.current.classList.remove("slider-indicator-active");
                indicatorWomenRef.current.classList.add("slider-indicator-active");

                slideTimeoutWomenCentered = setTimeout(startSlideTimeoutWomenCentered,4000);
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,10000);

                slideTimeout = setTimeout(startSlider,12000);
                
                console.log("usao u men aktivan <0");
            }
        }
        
       
    }

    const handleIndicatorMenClick = (e)=>{
        e.stopPropagation();
        clearTimeouts();

        if(e.currentTarget.classList.contains("slider-indicator-active")){
            let positionLeft = parseInt(window.getComputedStyle(sliderMenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(positionLeft === 0){ 
                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                console.log("Pozicija je 0 - indikator men aktivan");
            }else if(positionLeft > 0){
                
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                console.log("Pozicija je >0 - indikator men aktivan");
            }else{
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                console.log("Pozicija je >0 - indikator men aktivan");
            }

        }else if(indicatorAllRef.current.classList.contains("slider-indicator-active")){
            let positionLeft = parseInt(window.getComputedStyle(sliderAllRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(positionLeft === 0){ 
                startSlideTimeoutAllCenteredReverse();
            }else if(positionLeft > 0){
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                indicatorAllRef.current.classList.remove("slider-indicator-active");
                indicatorMenRef.current.classList.add("slider-indicator-active");

                console.log("Pozicija je >0 - indikator men aktivan");
            }else{
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                indicatorAllRef.current.classList.remove("slider-indicator-active");
                indicatorMenRef.current.classList.add("slider-indicator-active");

                console.log("Pozicija je <0 - indikator men aktivan");
            }
        }else{
            //case woman active
            let positionLeft = parseInt(window.getComputedStyle(sliderWomenRef.current,null).getPropertyValue("left").replace("px","").trim());

            if(positionLeft === 0){ 
                replayTimeoutFromMiddle();
                console.log("Pozicija je 0 - women aktivan");
            }else if(positionLeft > 0){
                sliderAllRef.current.setAttribute("class", "slider-img-all-holder position-right");
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                indicatorWomenRef.current.classList.remove("slider-indicator-active");
                indicatorMenRef.current.classList.add("slider-indicator-active");

                console.log("Pozicija je >0 - indikator women aktivan");
            }else{
                
                sliderWomenRef.current.setAttribute("class", "slider-img-women-holder");
                sliderMenRef.current.setAttribute("class", "slider-img-men-holder position-centered");

                slideTimeoutMenCentered = setTimeout(startSlideTimeoutMenCentered,4000);

                slideTimeout = setTimeout(startSlider,6000);

                indicatorWomenRef.current.classList.remove("slider-indicator-active");
                indicatorMenRef.current.classList.add("slider-indicator-active");

                console.log("Pozicija je <0 - indikator women aktivan");
            }
        }
    }

    return(

        <div className="container-custom">
            <div className="row g-0">
                <div className="col">
                    <section className="slider-holder">
                        <div className="slider-img-msg-holder">
                            <SliderImgComponent
                                wrapClass="slider-img-all-holder"
                                path={"/shop?page=1&limit=30&sort=rating-desc"}
                                imgSrc={Slider_all}
                                imgAlt="Yellow clothes on yellow background"
                                imgClass="slider-img-all"
                                msgClass="slider-msg-all-holder"
                                textOne="shop"
                                textTwo="now"
                                ref={sliderAllRef}
                                />

                            <SliderImgComponent
                                wrapClass="slider-img-women-holder"
                                path={"/shop?page=1&limit=30&sort=rating-desc&gender=women"}
                                imgSrc={Slider_women}
                                imgAlt="Women sitting and wearing different parts of clothes, with wall background"
                                imgClass="slider-img-women"
                                msgClass="slider-msg-women-holder"
                                textOne="women"
                                textTwo="collection"
                                ref={sliderWomenRef}
                                 />

                            <SliderImgComponent
                                wrapClass="slider-img-men-holder"
                                path={"/shop?page=1&limit=30&sort=rating-desc&gender=men"}
                                imgSrc={Slider_men}
                                imgAlt="Men wearing different parts of clothes, with wall background"
                                imgClass="slider-img-men"
                                msgClass="slider-msg-men-holder"
                                textOne="men"
                                textTwo="collection"
                                ref={sliderMenRef}
                                 />


                        </div>
                        <div className="slider-arrows-indicators-holder d-flex">
                            <div className="slider-left-arrow-holder slider-arrows" onClick={(e)=>handleSlideFromLeft(e)}>
                                <BsChevronLeft  />
                            </div>
                            <div className="slider-indicators-holder">
                                <span className="slider-indicator" ref={indicatorAllRef} onClick={(e)=>handleIndicatorAllClick(e)}></span>
                                <span className="slider-indicator" ref={indicatorWomenRef} onClick={(e)=>handleIndicatorWomenClick(e)}></span>
                                <span className="slider-indicator" ref={indicatorMenRef} onClick={(e)=>handleIndicatorMenClick(e)}></span>
                            </div>
                            <div className="slider-right-arrow-holder slider-arrows" onClick={(e)=>handleSlideFromRight(e)}>
                                <BsChevronRight  />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    )

}

export default SliderComponent;