const CustomTitleComponent = ({children,name})=>{
    return(
        <div className={`custom-title-holder custom-title-${name}`}>
            <div className="helper-triangle"></div>
            {children}
        </div>
    );
}

export default CustomTitleComponent;