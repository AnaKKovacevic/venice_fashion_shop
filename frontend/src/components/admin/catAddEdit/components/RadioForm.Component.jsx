const RadioFormComponent = ({radioName, radioValue,radioText,formik})=>{


    return(
        <div className="form-check">
            <label className="form-check-label">
            <input 
                className="form-check-input" 
                type="radio" 
                name={radioName} 
                value={radioValue}
                onChange={formik.handleChange}
                checked={formik.values[radioName] === radioValue} />            
                {radioText}
            </label>

        </div>
    );
}

export default RadioFormComponent;