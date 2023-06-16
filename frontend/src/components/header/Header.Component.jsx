import { useEffect, useRef, useState } from "react";
import NavComponent from "./components/Nav.Component";
import SearchBar from "./components/SearchBar.Component";
import UserAccount from "./components/UserAccount.Component";
import CartNavComponent from "./components/CartNav.Component";
import CurrencySelectComponent from "./components/CurrencySelect.Component";
import UserAccountActionsComponent from "./components/UserAccountActions.Component";
import CartProductsComponent from "./components/CartProducts.Component";



const HeaderComponent = () =>{

    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
    const [windowResizeExists, setWindowResizeExists] = useState(false);
    const [bodyClickExists, setBodyClickExists] = useState(false);

    let userAccActionsRef = useRef(null);
    let dropdownListSmRef = useRef(null);
    let cartProductsRef = useRef(null);

    useEffect(()=>{

        let userAccActions = userAccActionsRef.current;
        let dropdownListSm = dropdownListSmRef.current;
        let cartProducts = cartProductsRef.current;
        
        const handleWindowResize = ()=>{
            
            if(windowWidth < 576){
                if(window.innerWidth >= 576){
                    setWindowWidth(window.innerWidth);
                }
            }else if(windowWidth >= 576 && windowWidth < 992){
                if(window.innerWidth < 576 || window.innerWidth >= 992){
                    setWindowWidth(window.innerWidth);
                }
            }else if(windowWidth >= 992){
                if(window.innerWidth < 992){
                    setWindowWidth(window.innerWidth);
                }
            }


            if(window.innerWidth <= 576 && dropdownListSm.classList.contains("hide-fadeout")){
                dropdownListSm.classList.remove("hide-fadeout");
            }else if(window.innerWidth <= 576 && dropdownListSm.classList.contains("show-fadein")){
                dropdownListSm.classList.remove("show-fadein");
            }
            
        }

        const handleBodyClick = ()=>{
            if(userAccActions.classList.contains("show-fadein")){
                userAccActions.classList.replace("show-fadein","hide-fadeout");
            }
            if(dropdownListSm.classList.contains("show-fadein")){
                dropdownListSm.classList.replace("show-fadein","hide-fadeout");
            }

            if(cartProducts.classList.contains("show-fadein")){
                cartProducts.classList.replace("show-fadein","hide-fadeout");
            }
            
        }

        if(windowResizeExists){
            window.removeEventListener("resize",handleWindowResize);
        }

        window.addEventListener("resize",handleWindowResize);
        setWindowResizeExists(true);

        if(windowWidth <= 992){
            if(bodyClickExists){
                document.body.removeEventListener("click",handleBodyClick);
                setBodyClickExists(false);
            }
            document.body.addEventListener("click",handleBodyClick);
            setBodyClickExists(true);
        }else{
            if(bodyClickExists){
                document.body.removeEventListener("click",handleBodyClick);
                setBodyClickExists(false);
            }
            if(userAccActions.classList.contains("show-fadein")){
                userAccActions.classList.replace("show-fadein","hide-fadeout");
            }
            if(dropdownListSm.classList.contains("show-fadein")){
                dropdownListSm.classList.replace("show-fadein","hide-fadeout");
            }

            if(cartProducts.classList.contains("show-fadein")){
                cartProducts.classList.replace("show-fadein","hide-fadeout");
            }
        }
        
        return ()=>{
            window.removeEventListener("resize",handleWindowResize);
            document.body.removeEventListener("click",handleBodyClick);
        }
    },[windowWidth,windowResizeExists,bodyClickExists]);

    const checkCurrentRef = (e) =>{
        let currentRef = null;

        if(e.currentTarget.classList.contains("user-account-holder")){
            currentRef = userAccActionsRef.current;
        }else if(e.currentTarget.classList.contains("nav-shop-link")){
            currentRef = dropdownListSmRef.current;
        }else if(e.currentTarget.classList.contains("cart-holder")){
            currentRef = cartProductsRef.current;
        }

        return currentRef;
    }

    const handleClick = (e)=>{
        e.stopPropagation();
        let currentRef = checkCurrentRef(e);
            if(currentRef.classList.contains("show-fadein")){
                currentRef.classList.replace("show-fadein","hide-fadeout");
            }else if(currentRef.classList.contains("hide-fadeout")){
                currentRef.classList.replace("hide-fadeout","show-fadein");
            }else{
                currentRef.classList.add("show-fadein");
            }

            if(e.currentTarget.classList.contains("user-account-holder")){
                if(dropdownListSmRef.current.classList.contains("show-fadein")){
                    dropdownListSmRef.current.classList.replace("show-fadein","hide-fadeout");
                }
                if(cartProductsRef.current.classList.contains("show-fadein")){
                    cartProductsRef.current.classList.replace("show-fadein","hide-fadeout");
                }
            }else if(e.currentTarget.classList.contains("nav-shop-link")){

                if(userAccActionsRef.current.classList.contains("show-fadein")){
                    userAccActionsRef.current.classList.replace("show-fadein","hide-fadeout");
                }

                if(cartProductsRef.current.classList.contains("show-fadein")){
                    cartProductsRef.current.classList.replace("show-fadein","hide-fadeout");
                }
            }else if(e.currentTarget.classList.contains("cart-holder")){
                if(dropdownListSmRef.current.classList.contains("show-fadein")){
                    dropdownListSmRef.current.classList.replace("show-fadein","hide-fadeout");
                }
                if(userAccActionsRef.current.classList.contains("show-fadein")){
                    userAccActionsRef.current.classList.replace("show-fadein","hide-fadeout");
                }
            }

    }

    const handleMouseEnter = (e)=>{

        let currentRef = checkCurrentRef(e);

        if(currentRef.classList.contains("hide-fadeout")){
            currentRef.classList.replace("hide-fadeout","show-fadein");
        }else{
            currentRef.classList.add("show-fadein");
        }

    }

    const handleMouseLeave = (e)=>{
        let currentRef = checkCurrentRef(e);
        currentRef.classList.replace("show-fadein","hide-fadeout");
    }

    const handleMouseEnterElement = (e)=>{
        e.currentTarget.classList.replace("hide-fadeout","show-immediate");
    }

    const handleMouseLeaveElement = (e)=>{
        e.currentTarget.classList.replace("show-immediate","hide-fadeout");
    }

    let events = {};
    let mouseEvents = {};

    if (windowWidth > 992){
        events = {
            onMouseEnter:handleMouseEnter,
            onMouseLeave:handleMouseLeave
        };

        mouseEvents = {
            onMouseEnter:handleMouseEnterElement,
            onMouseLeave:handleMouseLeaveElement
        }
    }else{
        events = {
            onClick: handleClick
        };

        mouseEvents = null;
    }



    return(
        <header className="main-header">
            <div className="container">
                <div className="row main-header-row">
                    <div className="col-lg-7 col-xl-6">
                        <NavComponent 
                            windowWidth={windowWidth} 
                            ref={dropdownListSmRef}
                            events={events}
                            mouseEvents={mouseEvents} />
                    </div>
                    <div className="col-lg-5 col-xl-6 d-flex align-items-center justify-content-center nav-actions-holder">
                        <SearchBar />
                        <UserAccount events={events} />
                        <CartNavComponent events={events} />
                        <CartProductsComponent 
                            ref={cartProductsRef}
                            mouseEvents={mouseEvents} />
                        <CurrencySelectComponent />
                        <UserAccountActionsComponent 
                            ref={userAccActionsRef} 
                            mouseEvents={mouseEvents} />
                        
                    </div>
                </div>
                
            </div>
            
        </header>
    )
}

export default HeaderComponent;