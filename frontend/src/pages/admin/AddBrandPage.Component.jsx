import AddEditBrandComponent from "../../components/admin/brandAddEdit/AddEditBrand.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const AddBrandPageComponent = ()=>{
    return(
        <section className="add-brand-section">
            <HeadingTwoComponent h2Text="New brand" />
            <AddEditBrandComponent />
        </section>
    );
}

export default AddBrandPageComponent;