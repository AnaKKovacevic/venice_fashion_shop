import LoginComponent from "../components/login/Login.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const LoginPageComponent = () =>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Login" />
            <LoginComponent />
        </>
    )
}

export default LoginPageComponent;