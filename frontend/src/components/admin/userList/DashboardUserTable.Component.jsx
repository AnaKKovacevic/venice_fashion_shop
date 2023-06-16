import DashboardUserTableRowComponent from "./components/DashboardUserTableRow.Component";

const DashboardUserTableComponent = ({dashboardItems,setToggleStatus})=>{

    const showTableRows = ()=>{
        if(dashboardItems.length){
            return dashboardItems.map((oneItem,index)=>{
                return (<DashboardUserTableRowComponent 
                    item={oneItem}
                    setToggleStatus={setToggleStatus}
                    key={index} />);
            })
        }
    }

    return(
        <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">Change status</th>
                </tr>
            </thead>
            <tbody>
                {showTableRows()}
            </tbody>
        </table>
    </div>
    );
}

export default DashboardUserTableComponent;