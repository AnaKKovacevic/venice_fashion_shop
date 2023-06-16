import { useNavigate } from "react-router-dom";

const SortSelectComponent = ({searchParams})=>{
    const navigate = useNavigate();
    
    const changeSortCriterium = (e)=>{
        let newSortCriterium = e.target.value;
        searchParams.set("sort",newSortCriterium);
        let searchParamsString = searchParams.toString();
        navigate(`/shop?${searchParamsString}`);
        window.scrollTo(0,0);
    }

    return(
        <div className="sort-select-holder">
            <label>
            Sort by:
            <select 
                className="form-select" 
                aria-label="Select sort criterium" 
                name="sort-criterium" 
                value={searchParams.get("sort")}
                onChange={(e)=>changeSortCriterium(e)}>

                <option value="title-asc">Product name A-Z</option>
                <option value="title-desc">Product name Z-A</option>
                <option value="rating-desc">Rank</option>
                <option value="finalPrice-asc">Price low to high</option>
                <option value="finalPrice-desc">Price high to low</option>
            </select>
            </label>
        </div>
        

    );
}

export default SortSelectComponent;