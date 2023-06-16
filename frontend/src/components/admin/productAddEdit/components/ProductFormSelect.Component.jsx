import ProductOptionComponent from "./ProductOption.Component";

const ProductFormSelectComponent = ({specificClass,labelText,ariaLabel,inputName,formik,collection,cat})=>{
    
    const showOptions = ()=>{
        if(collection){
            return collection.map((obj,index)=>{
                return <ProductOptionComponent key={index} obj={obj} cat={cat} />
            })
        }
    }
    
    return(
        <div className={specificClass}>
            <label>
                {labelText}
            <select 
                className="form-select" 
                aria-label={ariaLabel} 
                name={inputName} 
                value={formik.values[inputName]}
                onChange={formik.handleChange}>
            <option value=""></option>
                {showOptions()}

            </select>
            </label>

            {
                    formik.touched[inputName] && formik.errors[inputName] ? <span className="input-msg-span">{formik.errors[inputName]}</span> : null
            }
        </div>
    );
}

export default ProductFormSelectComponent;