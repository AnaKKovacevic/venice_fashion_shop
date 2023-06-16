import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {userLogin,setUserToLocalStorage, setTokenToLocalStorage} from "../../services/auth.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/user.slicer";


const LoginComponent = ()=>{

    const [showPass,setShowPass] = useState(false);
    const [emailEmptyMsg,setEmailEmptyMsg] = useState(false);
    const [passwordEmptyMsg,setPasswordEmptyMsg] = useState(false);
    const [userLoginData,setUserLoginData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changePassVisibility = ()=>{
        if(showPass){
            setShowPass(false);
        }else{
            setShowPass(true);
        }
    }

    const handleInputOnChange = (e)=>{
        let newUserLoginData = {...userLoginData};
        newUserLoginData[e.currentTarget.name] = e.currentTarget.value;
        setUserLoginData(newUserLoginData);

        if(e.target.name === "email"){
            setEmailEmptyMsg(false);
        }else{
            setPasswordEmptyMsg(false);
        }

    }

    const submitInputForm = (e)=>{
        e.preventDefault();
        
        if(!userLoginData.email){
            setEmailEmptyMsg(true);
        }

        if(!userLoginData.password){
            setPasswordEmptyMsg(true);
        }
        
        if(userLoginData.email && userLoginData.password){
            userLogin(userLoginData)
                    .then((res)=>{
                            setUserToLocalStorage(res.data.userData);
                            setTokenToLocalStorage(res.data.token);
                            dispatch(saveUser(res.data.userData));
                            navigate(res.data.userData.isAdmin ? "/dashboard" : "/");
                            
                        
                    })
                    .catch((err)=>{
                        if(err.response && (err.response.status === 408 || err.response.status === 409)){
                            toast.error(err.response.data);
                        }else{
                            toast.error("Something went wrong. Please try again.");
                        }
                        
                        
                    })
        }

    }

    return(
        <section className="auth-section login-section">
            <div className="container">
                <div className="row">
                    <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3">
                        <div className="auth-form-holder login-form-holder">
                            <h2>Your Venice fashion account</h2>
                            <p>
                                Don't have Venice Fashion account? <Link to="/register">Register now.</Link>
                            </p>
                            <form onSubmit={submitInputForm} noValidate>
                                <div className="input-auth-holder input-login-holder">
                                    <label htmlFor="email-login" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email-login" 
                                        name="email"
                                        onChange={handleInputOnChange}></input>
                                    {emailEmptyMsg ? <span className="input-msg-span">Email is a required field</span> : null}
                                </div>

                                <div className="input-auth-holder input-login-holder">
                                    <label htmlFor="password-login" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input 
                                            type={ showPass ? "text" : "password"}
                                            className="form-control" 
                                            id="password-login" 
                                            name="password" 
                                            aria-label="User's password" 
                                            aria-describedby="basic-addon2"
                                            onChange={handleInputOnChange}></input>
                                        <span className="input-group-text" id="basic-addon2" onClick={()=>changePassVisibility()}>
                                            {showPass ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                        </span>
                                    </div>
                                    {passwordEmptyMsg ? <span className="input-msg-span">Password is a required field</span> : null}

                                </div>
                                <button type="submit">Login</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;