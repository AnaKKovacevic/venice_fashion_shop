import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";


const LogoComponent = ({children}) =>{
    const [currentUrl, setCurrentUrl] = useState("");
    let location = useLocation();

    useEffect(()=>{
        setCurrentUrl(location.pathname);
    },[location]);

    const showLogo = () => {
        if(currentUrl === "/"){
            return(
                <h1 className="logo-holder">
                    {children}
                </h1>
            );
        }else{
            return(
                <div className="logo-holder">
                    {children}
                </div>

            );
        }
    }


    return(
        <>
            {showLogo()}
        </>
    )
}

export default LogoComponent;