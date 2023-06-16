import HeadingTwoComponent from "./HeadingTwo.Component"
import {BsSearch} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const HeadingSearchGroupComponent = ({heading,path})=>{

    const navigate = useNavigate();
    let inputRef = useRef(null);


    const handleClick = ()=>{
        let searchValue = inputRef.current.value;
        
        if(searchValue){
            navigate(`/dashboard/${path}?search=${searchValue.replaceAll(" ","-")}&page=1`);
        }else{
            navigate(`/dashboard/${path}?page=1`);
        }

    }

    return(
        <div className="dashboard-heading-search-holder d-sm-flex align-items-start justify-content-between">
            <HeadingTwoComponent h2Text={heading} />

            <div className="input-group search-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search" 
                    aria-label="Search" 
                    aria-describedby="button-addon2"
                    ref={inputRef} />
                <button 
                    className="btn search-btn" 
                    type="button" 
                    id="button-addon2"
                    onClick={()=>handleClick()}>
                    <BsSearch />
                </button>
            </div>
        </div>
    );
}

export default HeadingSearchGroupComponent;