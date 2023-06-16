const FormInputComponent = ({formik,labelText,inputName,inputType,specificClass,inputId})=>{
    return(
        <div className={specificClass}>
            <label htmlFor={inputId} className="form-label">{labelText}</label>

                <input 
                    type={inputType}
                    id={inputId}
                    name={inputName}
                    className="form-control"
                    value={formik.values[inputName]}
                    onChange={formik.handleChange} />
                    

                {
                    formik.touched[inputName] && formik.errors[inputName] ? <span className="input-msg-span">{formik.errors[inputName]}</span> : null
                }
        </div>
    );
}

export default FormInputComponent;