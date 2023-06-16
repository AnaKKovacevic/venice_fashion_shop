import DashboardBlogTableRowComponent from "./components/DashboardBlogTableRow.Component";

const DashboardBlogTableComponent = ({dashboardItems,path,setItemDeleted,deleteItem})=>{
    
    const showTableRows = ()=>{
        if(dashboardItems.length){
            return dashboardItems.map((oneItem,index)=>{
                return (<DashboardBlogTableRowComponent 
                    item={oneItem}
                    setItemDeleted={setItemDeleted}
                    path={path}
                    deleteItem={deleteItem}
                    key={index} />);
            })
        }
    }

    return(
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Author</th>
                        <th scope="col">Title</th>
                        <th scope="col" className="text-center" colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showTableRows()}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardBlogTableComponent;