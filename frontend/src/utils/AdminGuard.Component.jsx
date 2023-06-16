import { Navigate } from "react-router-dom";

const AdminGuardComponent = ({children})=>{
    let user = localStorage.getItem("vf_user");
    if(user && JSON.parse(user).isAdmin){
        return children;
    }else{
        return <Navigate to="/" />
    }


}

export default AdminGuardComponent;