import { useNavigate } from "react-router-dom";

const LimitSelectComponent = ({searchParams})=>{

    const elPerPageNums = [10,20,30,40,50];
    const navigate = useNavigate();

    const changeLimit = (e)=>{
        let newLimit = e.target.value;
        searchParams.set("limit",newLimit);
        searchParams.set("page",1);
        let searchParamsString = searchParams.toString();
        navigate(`/shop?${searchParamsString}`);
        window.scrollTo(0,0);
    }

    const showOptions = ()=>{
        return(
            elPerPageNums.map((num,index)=>{
                return(
                    <option value={num} key={index}>{num}</option>
                );
            })
        );  
    }
    return(
        <div className="limit-select-holder">
            <label className="text-md-end">
            Per Page:
            <select 
                className="form-select" 
                aria-label="Select number of products per page" 
                name="products-per-page"                
                value={searchParams.get("limit")}
                onChange={(e)=>changeLimit(e)}>
                {showOptions()}
            </select>
            </label>
        </div>
    );
}

export default LimitSelectComponent;