import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import LoaderComponent from "../../components/loader/Loader.Component";
import { useSelector,useDispatch } from "react-redux";
import DashboardHeaderComponent from "../../components/admin/header/DashboardHeader.Component";
import { useEffect, useRef } from "react";
import { saveUser,removeUser } from "../../redux/user.slicer";
import { checkTokenValidity } from "../../services/auth.service";
import DashboardNavComponent from "../../components/admin/nav/DashboardNav.Component";

const AdminPageComponent = ()=>{

    const loaderStore = useSelector((state)=>state.loaderStore);
    const dispatch = useDispatch();
    const location = useLocation();
    let headerColRef = useRef();

    useEffect(()=>{
        checkTokenValidity()
        .then((res)=>{
          let userData = localStorage.getItem("vf_user");
          let token = localStorage.getItem("vf_token");
          if(userData && token){
            dispatch(saveUser(JSON.parse(userData)));
          }
        })
        .catch((err)=>{
          dispatch(removeUser());
        })
    },[dispatch])

    useEffect(()=>{
        headerColRef.current.scrollTo(0,0);
    },[location])

    return(
        <>
            <ToastContainer />
            <div className="container-fluid dashboard-holder">
                <div className="row">
                    <div className="d-none d-lg-block col-lg-3 dashboard-navbar-lg">
                        <DashboardNavComponent navOffcanvas={false} />
                    </div>
                    <div className="col-lg-9 header-col" ref={headerColRef}>
                        <div className="row">
                            <div className="col-12">
                                <DashboardHeaderComponent />
                            </div>
                            <div className="col-12 col-main">
                                <main>
                                    <Outlet />
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoaderComponent showFirstCriterium={loaderStore.showFirstCriterium} showSecondCriterium={loaderStore.showSecondCriterium} />
        </>
    );
}

export default AdminPageComponent;