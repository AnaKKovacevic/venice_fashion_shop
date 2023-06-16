import AddEditProductComponent from "../../components/admin/productAddEdit/AddEditProductComponent";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const EditProductPageComponent = ()=>{
    return(
        <section className="edit-product-section">
            <HeadingTwoComponent h2Text="Edit product" />
            <AddEditProductComponent />
        </section>
    );
}

export default EditProductPageComponent;