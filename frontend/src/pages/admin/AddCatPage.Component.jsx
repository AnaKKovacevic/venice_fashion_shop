import AddEditCatComponent from "../../components/admin/catAddEdit/AddEditCat.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const AddCatPageComponent = ()=>{
    return(
        <section className="add-cat-section">
            <HeadingTwoComponent h2Text="New category" />
            <AddEditCatComponent />
        </section>
    );
}

export default AddCatPageComponent;