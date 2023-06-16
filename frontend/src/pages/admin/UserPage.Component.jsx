import { useState } from "react";
import { getDashboardUsers, getDashboardUsersCount } from "../../services/user.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";

const UserPageComponent = ()=>{
    
    const [toggleStatus,setToggleStatus] = useState(false);

    return(
        <section className="dashboard-content user-section">
            <HeadingSearchGroupComponent heading="Users" path="user" />
            <ItemListComponent
                getCount={getDashboardUsersCount}
                getItems={getDashboardUsers}
                path="user"
                toggleStatus={toggleStatus}
                setToggleStatus={setToggleStatus} />
        </section>
    );
}

export default UserPageComponent;