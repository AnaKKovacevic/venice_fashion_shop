import { useEffect,useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PaginationComponent from "../Pagination.Component";
import ItemCardComponent from "./ItemCard.Component";
import DashboardBlogTableComponent from "../../components/admin/blogList/DashboardBlogTable.Component";
import DashboardUserTableComponent from "../../components/admin/userList/DashboardUserTable.Component";
import DashboardSubscriberTableComponent from "../../components/admin/subscriberList/DashboardSubscriberTable.Component";
import DashboardOrderTableComponent from "../../components/admin/orderDashboardList/DashboardOrderTable.Component";

const ItemListComponent = ({getCount,getItems,path,deleteItem,toggleStatus,setToggleStatus})=>{

    const [dashboardItems,setDashboardItems] = useState([]);
    const [dashboardItemsErr,setDashboardItemsErr] = useState("");
    const [itemDeleted,setItemDeleted] = useState(false);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [paginationInfo,setPaginationInfo] = useState({
        page: searchParams.get("page"),
        totalItems: 0
    });

    useEffect(()=>{

        let queryString = searchParams.toString();


        getCount(queryString)
            .then((res)=>{
                if(res.data?.totalItemsCount){
                    setPaginationInfo({
                        page: searchParams.get("page"),
                        totalItems: res.data?.totalItemsCount
                    })
                }else{
                    setPaginationInfo({
                        page: searchParams.get("page"),
                        totalItems: 0
                    })
                }
            })
            .catch((err)=>{
                setDashboardItemsErr("Something went wrong while getting searched data from the database. Please try again.");
            })

            getItems(queryString)
            .then((res)=>{
                setDashboardItems(res.data);
            })
            .catch((err)=>{
                setDashboardItemsErr("Something went wrong while getting searched data from the database. Please try again.");
            })

    },[searchParams,itemDeleted,getCount,getItems,toggleStatus])

    const showItems = ()=>{
        if(dashboardItems.length){
            return dashboardItems.map((oneItem,index)=>{
                return(
                    <div className="col-sm-6 col-md-4 col-lg-4 col-xxl-3 mb-3" key={index}>
                        <ItemCardComponent 
                            item={oneItem} 
                            setItemDeleted={setItemDeleted} 
                            path={path}
                            deleteItem={deleteItem} />
                    </div>
                ); 
                
            })
        }
    }



    const showItemsHolder = ()=>{
        if(location.pathname.includes("product") || location.pathname.includes("category") ||
        location.pathname.includes("brand")){
            return(
                <div className="item-articles-holder row align-items-stretch">
                    {showItems()}
                </div>
            );
        }else if(location.pathname.includes("blog")){
            return(
                <DashboardBlogTableComponent
                    dashboardItems={dashboardItems}
                    setItemDeleted={setItemDeleted} 
                    path={path}
                    deleteItem={deleteItem} />
            );
        }else if(location.pathname.includes("subscriber")){
            return(
                <DashboardSubscriberTableComponent
                    dashboardItems={dashboardItems}
                    path={path}
                    setItemDeleted={setItemDeleted} 
                    deleteItem={deleteItem}/>
            )
        }else if(location.pathname.includes("user")){
            return(
                <DashboardUserTableComponent dashboardItems={dashboardItems} setToggleStatus={setToggleStatus}  />
            );
        }else if(location.pathname.includes("order")){
            return(
                <DashboardOrderTableComponent dashboardItems={dashboardItems} />
            );
        }
    }

    return(
        <div className="dashboard-items-holder">
            {
                dashboardItemsErr
                ?
                <p className="error-get-data-par my-3">{dashboardItemsErr}</p>
                :

                (
                    paginationInfo.totalItems
                    ?
                    <>
                        {showItemsHolder()}
                        <div className="pagination-holder">
                                <PaginationComponent searchParams={searchParams} paginationInfo={paginationInfo} dashboardPath={path} />
                        </div>
                    </>
                    :
                    <p className="no-results-par m-0">
                        No results found{searchParams.get("search") ? ` for "${searchParams.get("search")}"` : ""}.
                    </p>
                )

            }

            
        </div>
    );
}

export default ItemListComponent;