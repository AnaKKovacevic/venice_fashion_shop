import AddEditBlogPostComponent from "../../components/admin/blogPostAddEdit/AddEditBlogPost.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const AddBlogPostPageComponent = ()=>{
    return(
        <section className="add-blog-post-section">
            <HeadingTwoComponent h2Text="New blog post" />
            <AddEditBlogPostComponent />
        </section>
    );
}

export default AddBlogPostPageComponent;