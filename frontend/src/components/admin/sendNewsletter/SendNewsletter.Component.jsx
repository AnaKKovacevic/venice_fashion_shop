import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {toast} from "react-toastify";
import FormInputComponent from "../../../UIkit/FormInput.Component";
import FormTextareaComponent from "../../../UIkit/FormTextarea.Component";
import { getDashboardSubscribers, sendNewsletter } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/loader.slicer";

const NewsletterSchema = Yup.object({
    subject: Yup.string().required("Subject is a required field"),
    msg: Yup.string().required("Newsletter content is a required field"),
})

const SendNewsletterComponent = ()=>{

    const [subscribersEmails,setSubscribersEmails] = useState([]);
    const [subscribersEmailsErr,setSubscribersEmailsErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        getDashboardSubscribers(null)
            .then((res)=>{
                setSubscribersEmails(res.data);
            })
            .catch((err)=>{
                setSubscribersEmailsErr("Something went wrong. Please reload the page and try again.");
            })
    },[])

    const formik = useFormik({
        initialValues: {
            subject: ``,
            msg: ``
        },
        validationSchema: NewsletterSchema,
        onSubmit: (values)=>{
            
            if(subscribersEmailsErr){
                toast.error(subscribersEmailsErr);
            }else if(!subscribersEmails.length){
                toast.warn("No subscribers at the moment.");
            }else{
                dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
                let finishedObj = {...values};
                let finishedSubscribersEmails = subscribersEmails.map((subscriber)=>{
                    return subscriber.email;
                })
                finishedObj["recipientList"] = finishedSubscribersEmails;
                sendNewsletter(finishedObj)
                    .then((res)=>{
                        navigate("/dashboard");
                        toast.success(res.data);
                    })
                    .catch((err)=>{
                        if(err.response && (err.response.status === 401 || err.response.status === 408 || err.response.status === 409)){
                            toast.error(err.response.data);
                        }else{
                            toast.error("Something went wrong. Please try again.");
                        }
                    })
                    .finally(()=>{
                        dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                    })
            }
        }
    })

    return(
        <div className="dashboard-form-holder dashboard-newsletter-form-holder">
            <form onSubmit={formik.handleSubmit}>
                <FormInputComponent
                    formik={formik}
                    labelText="Email subject"
                    inputName="subject"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder send-newsletter-input-holder"
                    inputId="newsletterSubject" />
                
                <FormTextareaComponent
                    formik={formik}
                    labelText="Newsletter content"
                    inputName="msg"
                    specificClass="dashboard-add-edit-input-holder send-newsletter-input-holder"
                    inputId="newsletterContent"
                    rows={8} />

                <button type="submit" className="submit-btn btn">Send</button>
            </form>
        </div>
    );
} 

export default SendNewsletterComponent;