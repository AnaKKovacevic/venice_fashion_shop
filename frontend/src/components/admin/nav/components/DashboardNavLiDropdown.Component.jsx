import {BsChevronDown,BsShop,BsPlus,BsAward,BsEnvelope} from "react-icons/bs";
import {HiPencil,HiOutlineNewspaper} from "react-icons/hi2";
import {AiOutlineSend,AiOutlineUserDelete} from "react-icons/ai";
import {TbCategory2} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const DashboardNavLiDropdownComponent = ({specificClass,collapseSpecificClass,offcanvasAttributes,path})=>{

    const location = useLocation();

    const showIcon = ()=>{
        if(specificClass === "products"){
            return <BsShop/>;
        }else if(specificClass === "categories"){
            return <TbCategory2 />;
        }else if(specificClass === "brands"){
            return <BsAward />;
        }else if(specificClass === "posts"){
            return <HiOutlineNewspaper />;
        }else if(specificClass === "subscribers"){
            return <BsEnvelope />;
        }
    }
    return(
        <li className={`nav-item nav-item-${specificClass}`}>
            <button 
                className="btn d-flex align-items-center collapse-btn" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#${collapseSpecificClass}`} 
                aria-expanded="false" 
                aria-controls={collapseSpecificClass}>
                {showIcon()}
                <span className="name-span">{specificClass}</span>
                <BsChevronDown />
            </button>
            <ul className={`${specificClass}-ul collapse-ul collapse`} id={collapseSpecificClass}>
                <li {...offcanvasAttributes}>
                    {
                        specificClass === "subscribers"
                        ?
                        <Link to={`/dashboard/${path}/newsletter`} 
                            className={location.pathname.includes(path) && location.pathname.includes("newsletter") ? "active" : ""}>
                            <AiOutlineSend />
                            <span>Send newsletter</span>
                        </Link>
                        :
                        <Link to={`/dashboard/${path}/create`} 
                            className={location.pathname.includes(path) && location.pathname.includes("create") ? "active" : ""}>
                            <BsPlus />
                            <span>Add {specificClass}</span>
                        </Link>
                    }                   

                </li>
                <li {...offcanvasAttributes}>
                    {
                        specificClass === "subscribers"
                        ?
                        <Link to={`/dashboard/${path}/unsubscribe?page=1`}
                            className={location.pathname.includes(path) && location.pathname.includes("unsubscribe") ? "active" : ""}>
                            <AiOutlineUserDelete />
                            <span>Unsubscribe</span>
                        </Link>
                        :
                        <Link to={`/dashboard/${path}/update?page=1`}
                            className={location.pathname.includes(path) && location.pathname.includes("update") ? "active" : ""}>
                            <HiPencil />
                            <span>Edit/Delete {specificClass}</span>
                        </Link>
                    }                   

                </li>
            </ul>
        </li>
    );
}

export default DashboardNavLiDropdownComponent;