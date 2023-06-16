import DashboardSubscriberTableRowComponent from "./components/DashboardSubscriberTableRow.Component";

const DashboardSubscriberTableComponent = ({dashboardItems,path,setItemDeleted,deleteItem})=>{

    const showTableRows = ()=>{
        if(dashboardItems.length){
            return dashboardItems.map((oneItem,index)=>{
                return (<DashboardSubscriberTableRowComponent 
                    item={oneItem}
                    path={path}
                    setItemDeleted={setItemDeleted}
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
                        <th scope="col">Email</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showTableRows()}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardSubscriberTableComponent;