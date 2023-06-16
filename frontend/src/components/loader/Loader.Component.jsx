const LoaderComponent = ({showFirstCriterium,showSecondCriterium})=>{
    if(showFirstCriterium && showSecondCriterium){
        return(
            <div className="loader">
                <div className="spinner-holder">
                    <div className="spinner-grow text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }else{
        return null;
    }
}

export default LoaderComponent;