import AddEditBrandComponent from "../../components/admin/brandAddEdit/AddEditBrand.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const EditBrandPageComponent = ()=>{
    return(
        <section className="edit-brand-section">
            <HeadingTwoComponent h2Text="Edit brand" />
            <AddEditBrandComponent />
        </section>
    );
}

export default EditBrandPageComponent;