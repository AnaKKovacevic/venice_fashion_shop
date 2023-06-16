import {useFormik} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FormInputComponent from "../../../UIkit/FormInput.Component";
import ProductFormSelectComponent from "./components/ProductFormSelect.Component";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/category.service";
import { getAllBrands } from "../../../services/brand.service";
import { addProduct, getProductDetails, updateProduct } from "../../../services/product.service";

const AddEditProductSchema = Yup.object({
    title: Yup.string().required("Title is a required field"),
    category: Yup.string().required("Category is a required field"),
    brand: Yup.string().required("Brand is a required field"),
    price: Yup.number().required("Price is a required field"),
    stock: Yup.number().required("Stock is a required field"),
    discountPercentage: Yup.number().required("Discount is a required field"),
    description: Yup.string().required("Description is a required field"),
    thumbnail: Yup.string().required("Main image is a required field"),
    images1: Yup.string(),
    images2: Yup.string(),
    images3: Yup.string(),
    images4: Yup.string()
})

const AddEditProductComponent = ()=>{

    const [addedEditedProduct,setAddedEditedProduct] = useState({
        title: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        discountPercentage: "",
        description: "",
        thumbnail: "",
        images1: "",
        images2: "",
        images3: "",
        images4: ""
    })
    const [categories,setCategories] = useState(null);
    const [brands,setBrands] = useState(null);
    const [categoriesErr,setCategoriesErr] = useState("");
    const [brandsErr,setBrandsErr] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            getProductDetails(params.id)
                .then((res)=>{
                    let productObj = res.data[0];
                    setAddedEditedProduct({
                        title: productObj.title,
                        category: productObj.category,
                        brand: productObj.brand,
                        price: productObj.price,
                        stock: productObj.stock,
                        discountPercentage: productObj.discountPercentage,
                        description: productObj.description,
                        thumbnail: productObj.thumbnail,
                        images1: productObj.images[1] || "", 
                        images2: productObj.images[2] || "", 
                        images3: productObj.images[3] || "", 
                        images4: productObj.images[4] || "" 
                    })
                })
                .catch((err)=>{
                    toast.error("Something went wrong with showing data. Please reload the page.")
                })
        }
    },[params])

    useEffect(()=>{
        getAllCategories()
            .then((res)=>{
                setCategories(res.data);
            })
            .catch((err)=>{
                setCategoriesErr("Something went wrong with showing categories. Please reload the page.");
            })

        getAllBrands()
            .then((res)=>{
                setBrands(res.data);
            })
            .catch((err)=>{
                setBrandsErr("Something went wrong with showing categories. Please reload the page.");
            })
    },[])

    useEffect(()=>{
        if(categoriesErr){
            toast.error(categoriesErr);
        }

    },[categoriesErr])

    useEffect(()=>{
        if(brandsErr){
            toast.error(brandsErr);
        }

    },[brandsErr])

    const formik = useFormik({
        initialValues:addedEditedProduct,
        enableReinitialize:true,
        validationSchema: AddEditProductSchema,
        onSubmit: (values)=>{
            let finishedObj = {...values};
            let allImagesArr = [values.thumbnail,
                values.images1,values.images2,
                values.images3,values.images4];
            let images = allImagesArr.filter((img)=>{
                return img !== "";
            })

            delete finishedObj.images1;
            delete finishedObj.images2;
            delete finishedObj.images3;
            delete finishedObj.images4;
            finishedObj["images"] = images;

            if(params.id){
                updateProduct(finishedObj,params.id)
                    .then((res)=>{
                        navigate("/dashboard/product/update?page=1");
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
                addProduct(finishedObj)
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

        <div className="dashboard-form-holder dashboard-product-form-holder">
            <form onSubmit={formik.handleSubmit}>

            <FormInputComponent
                formik={formik}
                labelText="Title"
                inputName="title"
                inputType="text"
                specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                inputId={params.id ? "editTitle" : "addTitle"} />

            <div className="input-group-holder d-sm-flex align-items-start justify-content-between flex-wrap">

                    <ProductFormSelectComponent
                        formik={formik}
                        labelText="Category"
                        inputName="category"
                        inputType="number"
                        specificClass="dashboard-add-edit-input-holder add-edit-product-select-holder"
                        ariaLabel="Select category"
                        collection={categories}
                        cat={true} />

                    <ProductFormSelectComponent
                        formik={formik}
                        labelText="Brand"
                        inputName="brand"
                        inputType="number"
                        specificClass="dashboard-add-edit-input-holder add-edit-product-select-holder"
                        ariaLabel="Select brand"
                        collection={brands}
                        cat={false} />

                    <FormInputComponent
                        formik={formik}
                        labelText="Price"
                        inputName="price"
                        inputType="number"
                        specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                        inputId={params.id ? "editPrice" : "addPrice"} />

                    <FormInputComponent
                        formik={formik}
                        labelText="Stock"
                        inputName="stock"
                        inputType="number"
                        specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                        inputId={params.id ? "editStock" : "addStock"} />
            </div>


            <FormInputComponent
                    formik={formik}
                    labelText="Discount percentage. Write as a decimal number (e.g. 25% would be written as 0.25)"
                    inputName="discountPercentage"
                    inputType="number"
                    specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                    inputId={params.id ? "editDiscountPercentage" : "addDiscountPercentage"} />


            <div className="dashboard-add-edit-input-holder add-edit-product-input-holder">
                    <label htmlFor={params.id ? "editDescription" : "addDescription"} className="form-label">Description</label>
                    <textarea
                        id={params.id ? "editDescription" : "addDescription"} 
                        name="description"
                        className="form-control"
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}></textarea>

                    {
                        formik.touched.description && formik.errors.description ? <span className="input-msg-span">{formik.errors.description}</span> : null
                    }

            </div>

            <FormInputComponent
                formik={formik}
                labelText="Main image url"
                inputName="thumbnail"
                inputType="text"
                specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                inputId={params.id ? "editThumbnail" : "addThumbnail"} />

            <button 
                className="btn add-edit-imgs-collapse-btn" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#adminAddEditProduct" 
                aria-expanded="false" 
                aria-controls="adminAddEditProduct">
                {params.id ? "Update additional images" : "+ Add more images"}
            </button>

            <div className="collapse" id="adminAddEditProduct">
                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="images1"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                    inputId={params.id ? "editImg1" : "addImg1"} />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="images2"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                    inputId={params.id ? "editImg2" : "addImg2"} />

                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="images3"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                    inputId={params.id ? "editImg3" : "addImg3"} />


                <FormInputComponent
                    formik={formik}
                    labelText="Image url"
                    inputName="images4"
                    inputType="text"
                    specificClass="dashboard-add-edit-input-holder add-edit-product-input-holder"
                    inputId={params.id ? "editImg4" : "addImg4"} />
            </div>
            
            <button type="submit" className="submit-btn btn">{params.id ? "Save changes" : "Save product"}</button>

            </form>
        </div>


    );
}

export default AddEditProductComponent;