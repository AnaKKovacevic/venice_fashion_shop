import { Navigate } from "react-router-dom";

const AuthGuardComponent = ({children})=>{

    let user = localStorage.getItem("vf_user");
    if(user){
        return children;
    }

    return <Navigate to="/login" />
}

export default AuthGuardComponent;