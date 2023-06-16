import AddEditBlogPostComponent from "../../components/admin/blogPostAddEdit/AddEditBlogPost.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const EditBlogPageComponent = ()=>{
    return(
        <section className="edit-blog-section">
            <HeadingTwoComponent h2Text="Edit blog post" />
            <AddEditBlogPostComponent />
        </section>
    );
}

export default EditBlogPageComponent;