import { forwardRef } from "react";
import { Link } from "react-router-dom";
import LogoComponent from "./Logo.Component";
import Venice_shop_logo from "../../../assets/imgs/Venice_shop_logo.png";
import NavDropdownComponent from "./NavDropdown.Component";

const NavComponent = forwardRef(function NavComponent({windowWidth,events,mouseEvents},ref){

    let offcanvasAttributes = {};

    if(windowWidth < 576){
        offcanvasAttributes = {
            className:"nav-item",
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#navbarOffcanvasSm"
        }
    }else{
        offcanvasAttributes = {
            className:"nav-item",
        }
    }

    return(
        <nav className="navbar navbar-expand-sm">

                <LogoComponent>
                    <Link to="/">
                        <img src={Venice_shop_logo} alt="Venice shop logo" className="img-fluid" />
                    </Link>
                </LogoComponent>

                <button className="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasSm" aria-controls="navbarOffcanvasSm" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
                </button>

                <div 
                    className="offcanvas offcanvas-end navbar-collapse-custom align-items-sm-end align-items-xxl-center" 
                    id="navbarOffcanvasSm" tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                        <ul className="navbar-nav main-nav text-center">
                            <li {...offcanvasAttributes}>
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className={windowWidth < 576 ? "nav-item dropdown" : "nav-item custom-dropdown"}>
                                <NavDropdownComponent 
                                    windowWidth={windowWidth} 
                                    ref={ref} events={events} 
                                    mouseEvents={mouseEvents}
                                    offcanvasAttributes={offcanvasAttributes} />
                            </li>
                            <li {...offcanvasAttributes}>
                                <Link className="nav-link" to="/shop?page=1&limit=30&sort=rating-desc&sale=yes">Sale</Link>
                            </li>
                            <li {...offcanvasAttributes}>
                                <Link className="nav-link" to="/blog?page=1">Blog</Link>
                            </li>
                            <li {...offcanvasAttributes}>
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        </div>
                
                </div>

        </nav>
    );
});

export default NavComponent;