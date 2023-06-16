import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { addCategory, getCategoryDetails, getMaxCatNum, updateCategory } from "../../../services/category.service";
import FormInputComponent from "../../../UIkit/FormInput.Component";
import RadioFormComponent from "./components/RadioForm.Component";
import {toast} from "react-toastify";

const AddEditCatSchema = Yup.object({
    name: Yup.string().required("Name is a required field"),
    gender: Yup.string().required("Gender is a required field"),
    promoted: Yup.string().required("Show category is a required field"),
    thumbnail: Yup.string().required("Image is a required field")
})

const AddEditCatComponent = ()=>{

    const [addedEditedCat,setAddedEditedCat] = useState({
        name: "",
        gender: "",
        promoted: "",
        thumbnail: ""
    })
    const [catMaxNum,setCatMaxNum] = useState(null);
    const [catMaxNumErr,setCatMaxNumErr] = useState("");
    const navigate = useNavigate();
    const params = useParams();


    useEffect(()=>{
        
        if(params.id){
            getCategoryDetails(params.id)
                .then((res)=>{
                    let catObj = res.data[0];
                    setAddedEditedCat({
                        name: catObj.name,
                        gender: catObj.gender,
                        promoted: (Number(catObj.promoted)).toString(),
                        thumbnail: catObj.thumbnail
                    })
                })
                .catch((err)=>{
                    toast.error("Something went wrong with showing data. Please reload the page.")
                })
        }else{
            getMaxCatNum()
            .then((res)=>{
                setCatMaxNum(res.data.maxNum[0].categoryNum);
            })
            .catch((err)=>{
                setCatMaxNumErr("Something went wrong. Please reload the page and try again.");
            })
        }

    },[params])

    const formik = useFormik({
        initialValues: addedEditedCat,
        enableReinitialize:true,
        validationSchema: AddEditCatSchema,
        onSubmit: (values)=>{

            if(catMaxNumErr){
               toast.error(catMaxNumErr);
            }else{
                let finishedObj = {...values};               
                finishedObj.name = finishedObj.name.toLowerCase();
                
                if(params.id){
                    updateCategory(finishedObj,params.id)
                        .then((res)=>{
                            navigate("/dashboard/category/update?page=1");
                            toast.success(res.data);
                        })
                        .catch((err)=>{
                            if(err.response && (err.response.status === 401 || err.response.status === 408 || err.response.status === 409)){
                                toast.error(err.response.data);
                            }else{
                                toast.error("Something went wrong. Please try again.");
                            }
                        })
                }else{
                    finishedObj["categoryNum"] = catMaxNum+1;
                    addCategory(finishedObj)
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
                }
            }

        }
    })

    return(
        <div className="dashboard-form-holder dashboard-cat-form-holder">
            <form onSubmit={formik.handleSubmit}>
                <FormInputComponent
                    formik={formik}
                    labelText="Name"
                    inputName="name"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-cat-input-holder"
                    inputId={params.id ? "editCatName" : "addCatName"} />

                <div className="radio-holder radio-gender-holder d-sm-flex">
                    <p>Gender:</p>
                    <div className="d-flex flex-wrap">
                        <RadioFormComponent 
                            radioName="gender" 
                            radioValue="women" 
                            radioText="Women"
                            formik={formik} />
                        <RadioFormComponent 
                            radioName="gender" 
                            radioValue="men" 
                            radioText="Men"
                            formik={formik} />
                    </div>                    
                    {
                    formik.touched.gender && formik.errors.gender ? <span className="input-msg-span">{formik.errors.gender}</span> : null
                    }
                </div>

                <div className="radio-holder radio-promoted-holder d-sm-flex">
                    <p>Show category on home page:</p>
                    <div className="d-flex flex-wrap">
                        <RadioFormComponent 
                            radioName="promoted" 
                            radioValue="1"
                            radioText="Yes"                            
                            formik={formik} />
                        <RadioFormComponent 
                            radioName="promoted" 
                            radioValue="0"
                            radioText="No"
                            formik={formik} />
                    </div>
                    {
                    formik.touched.promoted && formik.errors.promoted ? <span className="input-msg-span">{formik.errors.promoted}</span> : null
                    }
                </div>

                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="thumbnail"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-cat-input-holder"
                    inputId={params.id ? "editCatThumbnail" : "addCatThumbnail"} />

                <button type="submit" className="submit-btn btn">{params.id ? "Save changes" : "Save category"}</button>

            </form>
        </div>
    );
}

export default AddEditCatComponent;