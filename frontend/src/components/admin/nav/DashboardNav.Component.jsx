import Venice_shop_logo from "../../../assets/imgs/Venice_shop_logo.png";
import Admin_profile from "../../../assets/imgs/admin_profile.png";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {BsChevronDown} from "react-icons/bs";
import {HiLogout} from "react-icons/hi";
import { removeUser } from "../../../redux/user.slicer";
import DashboardNavLiDropdownComponent from "./components/DashboardNavLiDropdown.Component";
import DashboardNavLiComponent from "./components/DashboardNavLi.Component";

const DashboardNavComponent = ({navOffcanvas})=>{

    const userStore = useSelector((state)=>state.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    let offcanvasAttributes = {};

    if(navOffcanvas){
        offcanvasAttributes = {
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#offcanvasAdminNavbar"
        }
    }else{
        offcanvasAttributes = {}
    }

    const handleClick = ()=>{
        dispatch(removeUser());
        navigate("/");
    }

    return(
        <div className="dashboard-navbar">
            <div className="logo-holder">
                <Link to="/dashboard" className="logo-link"><img src={Venice_shop_logo} alt="Venice shop logo" /></Link>
            </div>
            <ul>
                <li className="nav-item nav-item-acc">
                    <button className="btn d-flex align-items-center collapse-btn" type="button" data-bs-toggle="collapse" data-bs-target="#adminLogout" aria-expanded="false" aria-controls="adminLogout">
                            <img src={Admin_profile} alt="Admin profile" />
                            <span className="name-span">{`${userStore.user?.firstname} ${userStore.user?.lastname}`}</span>
                            <BsChevronDown />
                    </button>
                    <ul className="logout-ul collapse-ul collapse" id="adminLogout">
                        <li>
                            <button type="button" onClick={()=>handleClick()} {...offcanvasAttributes}>
                                <HiLogout />
                                <span>Log out</span>
                            </button>
                        </li>
                    </ul>
                </li>
                <DashboardNavLiDropdownComponent 
                    specificClass="products" 
                    collapseSpecificClass="adminProduct" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="product" />
                
                <DashboardNavLiDropdownComponent 
                    specificClass="categories" 
                    collapseSpecificClass="adminCategory" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="category" />

                <DashboardNavLiDropdownComponent 
                    specificClass="brands" 
                    collapseSpecificClass="adminBrand" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="brand" />

                <DashboardNavLiDropdownComponent 
                    specificClass="posts" 
                    collapseSpecificClass="adminBlog" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="blog" />

                <DashboardNavLiDropdownComponent 
                    specificClass="subscribers" 
                    collapseSpecificClass="adminSubscriber" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="subscriber" />

                <DashboardNavLiComponent
                    specificClass="users" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="user"
                />

                <DashboardNavLiComponent
                    specificClass="orders" 
                    offcanvasAttributes={offcanvasAttributes}
                    path="order"
                />


            </ul>
        </div>
    );
}

export default DashboardNavComponent;