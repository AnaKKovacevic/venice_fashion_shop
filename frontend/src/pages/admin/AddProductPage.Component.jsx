import AddEditProductComponent from "../../components/admin/productAddEdit/AddEditProductComponent";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const AddProductPageComponent = ()=>{
    return(
        <section className="add-product-section">
            <HeadingTwoComponent h2Text="New product" />
            <AddEditProductComponent />
        </section>
    );
}

export default AddProductPageComponent;