import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInputComponent from "../../../UIkit/FormInput.Component";
import FormTextareaComponent from "../../../UIkit/FormTextarea.Component";
import { addBlogPost, getBlogPost, updatePost } from "../../../services/blog.service";
import {toast} from "react-toastify";

const AddEditPostSchema = Yup.object({
    title: Yup.string().required("Title is a required field"),
    author: Yup.string().required("Author is a required field"),
    readingTime: Yup.string().required("Reading time is a required field"),
    textShort: Yup.string().required("Short text is a required field"),
    text: Yup.string().required("Text is a required field"),
    thumbnail: Yup.string().required("Image is a required field")
})

const AddEditBlogPostComponent = ()=>{

    const [addedEditedPost,setAddedEditedPost] = useState({
        title: "",
        author: "",
        readingTime: "",
        textShort: "",
        text: "",
        thumbnail: ""
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(params.id){
            getBlogPost(params.id)
                .then((res)=>{
                    let postObj = res.data[0];
                    setAddedEditedPost({
                        title: postObj.title,
                        author: postObj.author,
                        readingTime: postObj.readingTime,
                        textShort: postObj.textShort,
                        text: postObj.text,
                        thumbnail: postObj.thumbnail
                    })
                })
                .catch((err)=>{
                    toast.error("Something went wrong with showing data. Please reload the page.")
                })
        }
    },[params])

    const formik = useFormik({
        initialValues: addedEditedPost,
        enableReinitialize: true,
        validationSchema: AddEditPostSchema,
        onSubmit: (values)=>{

            if(params.id){
                updatePost(values,params.id)
                .then((res)=>{
                    navigate("/dashboard/blog/update?page=1");
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
                addBlogPost(values)
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
    })

    return(
        <div className="dashboard-form-holder dashboard-blog-form-holder">
            <form onSubmit={formik.handleSubmit}>
                <FormInputComponent
                    formik={formik}
                    labelText="Title"
                    inputName="title"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostTitle" : "addPostTitle"} />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Author"
                    inputName="author"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostAuthor" : "addPostAuthor"} />

                <FormInputComponent
                    formik={formik}
                    labelText="Reading time"
                    inputName="readingTime"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostReadTime" : "addPostReadTime"} />

                <FormTextareaComponent
                    formik={formik}
                    labelText="Short text"
                    inputName="textShort"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostShortText" : "addPostShortText"}
                    rows={3} />

                <FormTextareaComponent
                    formik={formik}
                    labelText="Text"
                    inputName="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostText" : "addPostText"}
                    rows={8} />

                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="thumbnail"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-post-input-holder"
                    inputId={params.id ? "editPostThumbnail" : "addPostThumbnail"} />
            
                <button type="submit" className="submit-btn btn">{params.id ? "Save changes" : "Save post"}</button>
            
            </form>
        </div>
    );
}

export default AddEditBlogPostComponent;