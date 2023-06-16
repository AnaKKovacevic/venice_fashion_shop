import {useFormik} from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/loader.slicer";
import { sendMessage } from "../../../services/user.service";
import { toast } from "react-toastify";

const ContactSchema = Yup.object({
    email: Yup.string().email("Email must be a valid email").required("Your email is a required field"),
    msg: Yup.string().required("Your message is a required filed")
})

const ContactFormComponent = ()=>{

    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues:{
            email: "",
            msg: ""
        },
        validationSchema: ContactSchema,
        onSubmit: (values,{resetForm})=>{
            dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));

            sendMessage(values)
                .then((res)=>{
                    toast.success(res.data);
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
                    let resetValues = {
                        email: "",
                        msg : ""
                    };
                    resetForm({values: resetValues})
                })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit} noValidate>
            <div className="input-contact-holder">
                <label htmlFor="email-contact" className="form-label">Your email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email-contact" 
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
                {
                    formik.touched.email && formik.errors.email ? <span className="input-msg-span">{formik.errors.email}</span> : null
                }
            </div>

            <div className="input-contact-holder">
                <label htmlFor="msg" className="form-label">Your message</label>
                <textarea 
                    className="form-control" 
                    id="msg" 
                    name="msg" 
                    rows="5"
                    onChange={formik.handleChange}
                    value={formik.values.msg}></textarea>
                {
                    formik.touched.msg && formik.errors.msg ? <span className="input-msg-span">{formik.errors.msg}</span> : null
                }
            </div>

            <button type="submit">Send</button>
        </form>
    );
}

export default ContactFormComponent;