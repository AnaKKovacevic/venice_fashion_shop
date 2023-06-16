import intro2 from "../assets/imgs/intro-2.jpg";

const HeaderMainHeadingComponent = ({h1Text})=>{
    return(
        <section className="header-main-heading-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="img-heading-holder">
                            <div className="img-holder">
                                <img src={intro2} alt="A girl in front of yellow background" />
                            </div>
                            <h1>{h1Text}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeaderMainHeadingComponent;