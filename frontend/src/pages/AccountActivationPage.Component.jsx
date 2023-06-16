import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";
import { toast } from "react-toastify";
import { activateAccount } from "../services/user.service";

const AccountActivationPageComponent = ()=>{

    const [msg,setMsg] = useState("");
    const [errorExists,setErrorExists] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            activateAccount(id)
                .then((res)=>{
                    setMsg(res.data);
                    setTimeout(()=>{
                        navigate("/login");
                    },3000)
                })
                .catch((err)=>{
                    setErrorExists(true);
                    setMsg(err.response.data);
                })
        }else{
            navigate("/");
            toast.error("Not valid data for account activation.");
        }
    },[id,navigate])

    return(
        <>
            <HeaderMainHeadingComponent h1Text="Account activation" />
            <section className="activation-acc-msg-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xxl-6 offset-xxl-3">
                            <div className="msg-holder">
                                <h2>Your Venice fashion account status</h2>
                                <p>
                                    {msg}
                                </p>
                                {!errorExists 
                                ?
                                <>
                                    <div class="d-flex align-items-center">
                                        <div class="spinner-border text-warning me-3" role="status" aria-hidden="true"></div>
                                        <span>Redirecting to login page...</span>
                                    </div>
                                </> 

                                : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AccountActivationPageComponent;
