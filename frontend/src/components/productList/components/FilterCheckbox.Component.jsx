import { useNavigate } from "react-router-dom";

const FilterCheckboxComponent = ({checkName,searchParams,searchParamsKey})=>{

    const navigate = useNavigate();

    const changeFilter = (e)=>{
        let currentCheckboxChecked = e.target.checked;
        let currentCheckboxValue = e.target.value;
        if(searchParams.has(searchParamsKey)){
            let queryString = searchParams.get(searchParamsKey);
            let queryArr = queryString.split("_");
            if(currentCheckboxChecked){
                queryArr.push(currentCheckboxValue);
                let newQueryString = queryArr.join("_");
                searchParams.set(searchParamsKey, newQueryString);
            }else{
                let currentCheckboxIndex = queryArr.indexOf(currentCheckboxValue);
                queryArr.splice(currentCheckboxIndex,1);
                if(queryArr.length){
                    let newQueryString = queryArr.join("_");
                    searchParams.set(searchParamsKey, newQueryString);
                }else{
                    searchParams.delete(searchParamsKey);
                }
            }

        }else{
            searchParams.set(searchParamsKey, currentCheckboxValue);
        }
        searchParams.set("page",1);
        let searchParamsString = searchParams.toString();
        navigate(`/shop?${searchParamsString}`);
    }

    const checkIfInputChecked = ()=>{
        let inputChecked = false;
        if(searchParams.has(searchParamsKey)){
            let queryString = searchParams.get(searchParamsKey)
            let queryArr = queryString.split("_");
            if(queryArr.includes(checkName)){
                inputChecked = true;
            }
        }

        return inputChecked;
    }

    return(
        <div className="form-check">

            <label className="form-check-label">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name={checkName} 
                    value={checkName} 
                    onChange={(e)=>changeFilter(e)}
                    checked={checkIfInputChecked()} />

                {checkName.replaceAll("-", " ")}

            </label>

        </div>
    );
}

export default FilterCheckboxComponent;