const MainHeadingComponent = ({h1Text})=>{
    return(
        <section className="main-heading">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{h1Text}</h1>
                    </div>
                </div>
            </div>

        </section>
       
    );
}

export default MainHeadingComponent;