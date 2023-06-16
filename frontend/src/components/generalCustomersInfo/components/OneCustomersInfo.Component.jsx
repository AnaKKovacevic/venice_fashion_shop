const OneCustomersInfoComponent = ({imgSrc, infoTitle, infoParagraph})=>{
    return(
        <div className="col-12 col-sm-6 col-md-3">
            <article className="customers-info-article">
                <div className="customers-info-img-holder">
                    <img src={imgSrc} alt={`${infoTitle} icon`} />
                </div>
                <h4>{infoTitle}</h4>
                <p>{infoParagraph}</p>

            </article>
        </div>
    );
}

export default OneCustomersInfoComponent;