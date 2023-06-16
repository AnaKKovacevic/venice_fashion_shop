import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuardRegLogComponent = ({children})=>{

    const userStore = useSelector((state)=>state.userStore);

    if(!userStore.user){
        return children;
    }
    if(userStore.user.isActive){
        return <Navigate to="/dashboard" />
    }else{
        return <Navigate to="/" />
    }
    
}

export default AuthGuardRegLogComponent;