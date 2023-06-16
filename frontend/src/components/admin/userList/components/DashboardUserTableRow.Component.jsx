import { setUserStatus } from "../../../../services/user.service";
import {toast} from "react-toastify";

const DashboardUserTableRowComponent = ({item,setToggleStatus})=>{


    const handleSwitch = ()=>{

        setUserStatus({isActive: !item.isActive},item._id)
        .then((res)=>{
            setToggleStatus((prevState)=>!prevState);
        })
        .catch((err)=>{
            if(err.response && (err.response.status === 401 || err.response.status === 408 || err.response.status === 409)){
                toast.error(err.response.data);
            }else{
                toast.error("Something went wrong. Please try again.");
            }
        })
    }

    return(
        <tr className="align-middle">
            <td>
                {item.firstname}
            </td>
            <td>
                {item.lastname}
            </td>
            <td>
                {item.email}
            </td>
            <td className="td-status">
                {item.isActive ? "Active" : "Inactive"}
            </td>
            <td className="text-center">
                <div className="switch-holder">
                    <div className="form-check form-switch m-0">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            role="switch"
                            checked={item.isActive} 
                            onChange={()=>handleSwitch()} />
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default DashboardUserTableRowComponent;