const FormTextareaComponent = ({formik,labelText,inputName,specificClass,inputId,rows})=>{
    return(
        <div className={specificClass}>
            <label htmlFor={inputId} className="form-label">{labelText}</label>
            <textarea
                id={inputId} 
                name={inputName}
                className="form-control"
                rows={rows}
                value={formik.values[inputName]}
                onChange={formik.handleChange}></textarea>

            {
                formik.touched[inputName] && formik.errors[inputName] ? <span className="input-msg-span">{formik.errors[inputName]}</span> : null
            }

        </div>
    );
}

export default FormTextareaComponent;