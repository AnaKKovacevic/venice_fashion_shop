import { deleteSubscriber, getDashboardSubscribers, getDashboardSubscribersCount } from "../../services/user.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";

const SubscriberPageComponent = ()=>{
    return(
        <section className="dashboard-content subscriber-section">
            <HeadingSearchGroupComponent heading="Subscribers" path="subscriber/unsubscribe" /> 
            <ItemListComponent
                getCount={getDashboardSubscribersCount}
                getItems={getDashboardSubscribers}
                path="subscriber/unsubscribe"
                deleteItem={deleteSubscriber} />
        </section>
    );
}

export default SubscriberPageComponent;