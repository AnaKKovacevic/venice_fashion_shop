import { useNavigate } from "react-router-dom";

const SortRadioComponent = ({radioValue,radioText,searchParams})=>{

    const navigate = useNavigate();


    const changeSortCriterium = (e)=>{
        let newSortCriterium = e.target.value;
        searchParams.set("sort",newSortCriterium);
        let searchParamsString = searchParams.toString();
        navigate(`/shop?${searchParamsString}`);
        window.scrollTo(0,0);
    }

    return(
        <div className="form-check-holder">
            <div className="form-check">
            
                <label className="form-check-label">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="sortRadio" 
                    value={radioValue}
                    checked={radioValue === searchParams.get("sort")}
                    onChange={(e)=>changeSortCriterium(e)} />
                    {radioText}
                </label>
            </div>
        </div>
        
    );
}

export default SortRadioComponent;