import { useNavigate } from "react-router-dom";

const FilterResetButtonComponent = ({searchParams})=>{

    const navigate = useNavigate();

    const handleClick = ()=>{
        searchParams.delete("sale");
        searchParams.delete("gender");
        searchParams.delete("category");
        searchParams.delete("brand");
        let searchParamsString = searchParams.toString();
        navigate(`/shop?${searchParamsString}`);
    }

    return(
        <button type="button" className="filter-action-btn filter-reset-btn" onClick={()=>handleClick()}>
            Reset Filters
        </button>
    );
}

export default FilterResetButtonComponent;