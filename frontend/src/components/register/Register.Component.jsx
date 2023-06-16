import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormInputComponent from "../../UIkit/FormInput.Component";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import { userRegister } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import {toggleLoader} from "../../redux/loader.slicer";

const RegisterSchema = Yup.object({
    firstname: Yup.string().required("Your first name is a required field"),
    lastname: Yup.string().required("Your last name is a required field"),
    email: Yup.string().email("Email must be a valid email").required("Your email is a required field"),
    password: Yup.string().required("Password is a required field")
});

const RegisterComponent = ()=>{

    const [showForm,setShowForm] = useState(true);
    const [checkMailMsg,setCheckMailMsg] = useState("");
    const [showPass,setShowPass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({

        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: (values)=>{
            dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}))
            userRegister(values)
                .then((res)=>{
                    
                    if(res.status === 210){ 
                        navigate("/login");                    
                        toast.info(res.data);
                    }else{
                        
                        setShowForm(false);
                        setCheckMailMsg(res.data);
                    }

                })
                .catch((err)=>{
                    if(err.response && (err.response.status === 408 || err.response.status === 409)){
                        toast.error(err.response.data);
                    }else{
                        toast.error("Something went wrong. Please try again.");
                    }
                    
                })
                .finally(()=>{
                    dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                })
        }
    });

    const changePassVisibility = ()=>{
        if(showPass){
            setShowPass(false);
        }else{
            setShowPass(true);
        }
    }

    return(
        <section className="auth-section register-section">
            <div className="container">
                <div className="row">
                    <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3">
                        <div className="auth-form-holder register-form-holder">

                        {showForm
                            ?

                            <>
                            <h2>Create Venice fashion account</h2>
                            <p>
                               Already registered? <Link to="/login">Login here.</Link>
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                
                                

                                <FormInputComponent 
                                    formik={formik}
                                    inputName="firstname"
                                    inputType="text"
                                    labelText="First Name"
                                    specificClass="input-auth-holder input-register-holder"
                                    inputId="userFirstname" />

                                <FormInputComponent 
                                    formik={formik}
                                    inputName="lastname"
                                    inputType="text"
                                    labelText="Last Name"
                                    specificClass="input-auth-holder input-register-holder"
                                    inputId="userLastname" />

                                <FormInputComponent 
                                    formik={formik}
                                    inputName="email"
                                    inputType="text"
                                    labelText="Email"
                                    specificClass="input-auth-holder input-register-holder"
                                    inputId="userEmail" />

                                
                                <div className="input-auth-holder input-register-holder">
                                    <label htmlFor="password-register" className="form-label">Password</label>

                                    <div className="input-group">
                                        <input 
                                            type={ showPass ? "text" : "password"}
                                            className="form-control" 
                                            id="password-register" 
                                            name="password"
                                            value={formik.values.password} 
                                            aria-label="User's password" 
                                            aria-describedby="basic-addon2"
                                            onChange={formik.handleChange}></input>
                                        <span className="input-group-text" id="basic-addon2" onClick={()=>changePassVisibility()}>
                                            {showPass ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                        </span>
                                    </div>
                    

                                    {
                                        formik.touched.password && formik.errors.password ? <span className="input-msg-span">{formik.errors.password}</span> : null
                                    }
                                </div>

                                

                                
                                <button type="submit">Register</button>
                            </form>
                            </>

                            :
                            <>
                                <h2>Account activation</h2>
                                <p className="check-mail-par">{checkMailMsg}</p>
                            </>            
                            
                        }


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterComponent;