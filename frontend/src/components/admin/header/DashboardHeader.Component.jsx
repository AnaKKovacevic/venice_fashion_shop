import DashboardNavComponent from "../nav/DashboardNav.Component";

const DashboardHeaderComponent = ()=>{
    return(
        <header className="dashboard-header">
            <div className="d-flex justify-content-between align-items-center d-lg-block">
                <h1>Dashboard</h1>
                <nav className="navbar bg-body-tertiary fixed-top d-lg-none">
                    <div className="container-fluid">
                        <button className="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAdminNavbar" aria-controls="offcanvasAdminNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
                        </button>
                        <div className="offcanvas offcanvas-end offcanvas-custom" tabIndex="-1" id="offcanvasAdminNavbar" aria-labelledby="offcanvasAdminNavbarLabel">
                            <div className="offcanvas-header justify-content-end">
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">                                                            
                                <DashboardNavComponent navOffcanvas={true} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            

        </header>
    );
}

export default DashboardHeaderComponent;