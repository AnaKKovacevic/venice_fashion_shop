import RegisterComponent from "../components/register/Register.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const RegisterPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Registration" />
            <RegisterComponent />
        </>
        
    );
}

export default RegisterPageComponent;