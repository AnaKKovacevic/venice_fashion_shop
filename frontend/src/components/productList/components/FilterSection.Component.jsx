import FilterCheckboxComponent from "./FilterCheckbox.Component";
import {BsChevronDown} from "react-icons/bs";

const FilterSectionComponent = ({filterName,checkboxesFiltered,searchParams,collapse})=>{

    const checkboxesList = ()=>{

        return (checkboxesFiltered.map((filter,index)=>{
            return(
                <FilterCheckboxComponent 
                    checkName={filterName === "Brand"? filter.replaceAll(" ","-") : filter.toLowerCase().replaceAll(" ","-")} 
                    key={index} 
                    searchParams={searchParams}
                    searchParamsKey={filterName.toLowerCase()} />
            );
        }));
    }
    return(
        <section className={`${filterName.toLowerCase()}-filters`}>
            {
                collapse 
                ?
                <>
                    <h3>
                        <button className="filter-collapse-btn d-flex justify-content-between" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapse${filterName}`} 
                                aria-expanded={filterName === "Sale" || filterName === "Gender" ? "true" : "false"}
                                aria-controls={`collapse${filterName}`} >
                            {filterName}

                            <span>
                                <BsChevronDown />
                            </span>
                            
                        </button>
                    </h3>
                    <div className={`${filterName === "Sale" || filterName === "Gender" ? "show " : ""} checkbox-collapse-holder collapse`}  
                        id={`collapse${filterName}`}>
                        {checkboxesList()}
                    </div>
                    
                </>
                :
                <>
                    <h3>{filterName}</h3>
                    {checkboxesList()}
                </>
            }
            
        </section>
    );
}

export default FilterSectionComponent;

