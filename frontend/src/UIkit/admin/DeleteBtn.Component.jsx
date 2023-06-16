import { useRef } from "react";
import ModalComponent from "../Modal.Component";
import {toast} from "react-toastify";


const DeleteBtnComponent = ({item,path,setItemDeleted,deleteItem})=>{

    const modalDashboardItem = useRef(null);

    const handleDeleteBtnClick =  ()=>{
        modalDashboardItem.current.style.display = "block";
        setItemDeleted(false);
    }

    const handleMouseModalDashboardItemClick = ()=>{
        modalDashboardItem.current.style.display = "none";
    }

    const preventModalClose = (e)=>{
        e.stopPropagation();
    }

    const handleConfirmDeleteBtnClick = ()=>{

        deleteItem(item._id)
            .then((res)=>{
                toast.success(res.data);
                setItemDeleted(true);
            })
            .catch((err)=>{
                if(err.response && (err.response.status === 401 || err.response.status === 408 || err.response.status === 409)){
                    toast.error(err.response.data);
                }else{
                    toast.error("Something went wrong. Please try again.");
                }
            })
        
        modalDashboardItem.current.style.display = "none";  
    }

    const showItemTitle = ()=>{
            if(path.includes("product") || path.includes("blog")){
                return item.title;
            }else if(path.includes("category")){
                return `${item.name} (${item.gender})`;
            }else if(path.includes("subscriber")){
                return item.email;
            }else{
                return item.name;
            }
    }

    return(
        <>
            <button type="buton" className="btn delete-btn" onClick={()=>handleDeleteBtnClick()}>
                {path.includes("subscriber") ? "Unsubscribe" : "Delete"}
            </button>
            <ModalComponent ref={modalDashboardItem} specificClass="modal-dashboard-delete" handleMouseModalClick={handleMouseModalDashboardItemClick}>
                <div className="delete-confirmation-holder" onClick={(e)=>preventModalClose(e)}>
                    <p>Are you sure you want to {path.includes("subscriber") ? "unsubscribe" : "delete"} <span className={path.includes("subscriber") ? "no-capitalize-span" : "capitalize-span"}>{showItemTitle()}</span>?</p>
                    <div className="confirm-delete-btns-holder text-end">
                        <button className="btn delete-confirmed-btn" type="button" onClick={()=>handleConfirmDeleteBtnClick()}>{path.includes("subscriber") ? "Unsubscribe" : "Delete"}</button>
                        <button className="btn delete-cancel-btn" type="button" onClick={()=>handleMouseModalDashboardItemClick()}>Cancel</button>
                    </div>
                </div>               
            </ModalComponent>
        
        </>
    );
}

export default DeleteBtnComponent;