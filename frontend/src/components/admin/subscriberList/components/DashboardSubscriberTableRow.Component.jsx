import DeleteBtnComponent from "../../../../UIkit/admin/DeleteBtn.Component";

const DashboardSubscriberTableRowComponent = ({item,path,setItemDeleted,deleteItem})=>{
    return(
        <tr className="align-middle">
            <td>
                {item.email}
            </td>
            <td className="text-center">
                <DeleteBtnComponent
                    item={item} 
                    path={path} 
                    setItemDeleted={setItemDeleted}
                    deleteItem={deleteItem} />
            </td>
        </tr>
    );
}

export default DashboardSubscriberTableRowComponent;