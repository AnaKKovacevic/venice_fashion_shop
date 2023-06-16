import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { addBrand, getBrandDetails, getMaxBrandNum, updateBrand } from "../../../services/brand.service";
import {toast} from "react-toastify";
import FormInputComponent from "../../../UIkit/FormInput.Component";

const AddEditBrandSchema = Yup.object({
    name: Yup.string().required("Name is a required field"),
    thumbnail: Yup.string().required("Image is a required field")
})

const AddEditBrandComponent = () =>{

    const [addedEditedBrand,setAddedEditedBrand] = useState({
        name: "",
        thumbnail: ""
    })
    const [brandMaxNum,setBrandMaxNum] = useState(null);
    const [brandMaxNumErr,setBrandMaxNumErr] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            getBrandDetails(params.id)
                .then((res)=>{
                    let brandObj = res.data[0];
                    setAddedEditedBrand({
                        name: brandObj.name,
                        thumbnail: brandObj.thumbnail
                    })
                })
                .catch((err)=>{
                    toast.error("Something went wrong with showing data. Please reload the page.")
                })
        }else{
            getMaxBrandNum()
            .then((res)=>{
                setBrandMaxNum(res.data.maxNum[0].brandNum);
            })
            .catch((err)=>{
                setBrandMaxNumErr("Something went wrong. Please reload the page and try again.");
            })
        }
    },[params])

    const formik = useFormik({
        initialValues: addedEditedBrand,
        enableReinitialize:true,
        validationSchema: AddEditBrandSchema,
        onSubmit: (values)=>{
            if(brandMaxNumErr){
                toast.error(brandMaxNumErr);
            }else{
                if(params.id){
                    updateBrand(values,params.id)
                    .then((res)=>{
                        navigate("/dashboard/brand/update?page=1");
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
                    let finishedObj = {...values};
                    finishedObj["brandNum"] = brandMaxNum+1;
                    addBrand(finishedObj)
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
        <div className="dashboard-form-holder dashboard-brand-form-holder">
            <form onSubmit={formik.handleSubmit}>
                <FormInputComponent
                    formik={formik}
                    labelText="Name"
                    inputName="name"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-brand-input-holder"
                    inputId={params.id ? "editBrandName" : "addBrandName"}/>

                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="thumbnail"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-brand-input-holder"
                    inputId={params.id ? "editBrandThumbnail" : "addBrandThumbnail"} />
            
            <button type="submit" className="submit-btn btn">{params.id ? "Save changes" : "Save brand"}</button>
            </form>
        </div>
    );
}

export default AddEditBrandComponent;