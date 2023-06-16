import { getDashboardOrders, getDashboardOrdersCount } from "../../services/order.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";

const OrdersPageComponent = ()=>{
    return(
        <section className="dashboard-content dashboard-orders-section">
            <HeadingSearchGroupComponent heading="Orders" path="order" />
            <ItemListComponent
                getCount={getDashboardOrdersCount}
                getItems={getDashboardOrders}
                path="order" />
        </section>
    );
}

export default OrdersPageComponent;