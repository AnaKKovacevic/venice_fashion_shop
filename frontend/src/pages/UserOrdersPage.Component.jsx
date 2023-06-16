import OrderListComponent from "../components/orderList/OrderList.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const UsersOrdersPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Your orders" />
            <OrderListComponent />
        </>
    );
}

export default UsersOrdersPageComponent;