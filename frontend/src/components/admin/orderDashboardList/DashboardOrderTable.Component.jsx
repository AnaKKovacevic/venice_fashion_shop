import DashboardOrderTableRowComponent from "./components/DashboardOrderTableRow.Component";

const DashboardOrderTableComponent = ({dashboardItems})=>{


    const showTableRows = ()=>{
        if(dashboardItems.length){
            return dashboardItems.map((oneItem,index)=>{
                return (<DashboardOrderTableRowComponent 
                    item={oneItem}
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
                    <th scope="col">Customer email</th>
                    <th scope="col" className="text-center">Quantity</th>
                    <th scope="col" className="text-center">Price</th>
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

export default DashboardOrderTableComponent;