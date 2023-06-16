import EditBtnComponent from "../../../../UIkit/admin/EditBtn.Component";
import DeleteBtnComponent from "../../../../UIkit/admin/DeleteBtn.Component";
import { getShortNumDate } from "../../../../services/date.service";

const DashboardBlogTableRowComponent = ({item,setItemDeleted,path,deleteItem})=>{
    return(
        <tr className="align-middle">
            <td>
                {getShortNumDate(item.postedAt)}
            </td>
            <td>
                {item.author}
            </td>
            <td>
                {item.title}
            </td>
            <td className="edit-btn-td text-center">
                <EditBtnComponent item={item} path={path} />
            </td>
            <td className="delete-btn-td text-center">
                <DeleteBtnComponent 
                    item={item} 
                    path={path} 
                    setItemDeleted={setItemDeleted}
                    deleteItem={deleteItem} />
            </td>
        </tr>
    );
}

export default DashboardBlogTableRowComponent;