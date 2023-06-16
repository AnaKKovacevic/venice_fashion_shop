import AddEditCatComponent from "../../components/admin/catAddEdit/AddEditCat.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const EditCatPageComponent = ()=>{
    return(
        <section className="edit-cat-section">
            <HeadingTwoComponent h2Text="Edit category" />
            <AddEditCatComponent />
        </section>
    );
}

export default EditCatPageComponent;