import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () =>{

    const [searchValue,setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e)=>{
        setSearchValue(e.target.value);
    }

    const handleClick = ()=>{
        if(searchValue){
            navigate(`/shop/search/${searchValue.replaceAll(" ","-")}?page=1`);
        }
    }

    return(
        <div className="search-bar-holder">
            <input 
                className="form-control" 
                type="text"
                name="searchNav"
                id="searchNav" 
                placeholder="Search" 
                aria-label="Search"
                value={searchValue}
                onChange={(e)=>handleOnChange(e)}></input>
            
            <button type="button" className="search-btn" onClick={()=>handleClick()}>
                <svg xmlns="http://www.w3.org/2000/svg"
                 width="1.2rem"
                 height="1.2rem" 
                 fill="currentColor"
                 className="bi bi-search search-bar-icon" 
                 viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </div>
    )
}

export default SearchBar;