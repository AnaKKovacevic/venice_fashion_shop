import { useLocation,Link } from "react-router-dom";
import {HiOutlineUserGroup} from "react-icons/hi2";
import {TbTruckDelivery} from "react-icons/tb";

const DashboardNavLiComponent = ({specificClass,offcanvasAttributes,path})=>{

    const location = useLocation();

    const showIcon = ()=>{
        if(specificClass === "users"){
            return <HiOutlineUserGroup/>;
        }else if(specificClass === "orders"){
            return <TbTruckDelivery />;
        }
    }

    return(
        <li className={`nav-item nav-item-single nav-item-${specificClass}`} {...offcanvasAttributes}>
            <Link to={`/dashboard/${path}?page=1`}
                  className={location.pathname.includes(path) ? "active" : ""}>
                {showIcon()}
                  <span className="name-span">{specificClass}</span>
            </Link>
        </li>
    );
}

export default DashboardNavLiComponent;