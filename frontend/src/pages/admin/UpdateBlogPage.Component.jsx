import { deletePost, getDashboardPosts, getDashboardPostsCount } from "../../services/blog.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";

const UpdateBlogPageComponent = ()=>{
    return(
        <section className="dashboard-content update-blog-section">
            <HeadingSearchGroupComponent heading="Blog posts" path="blog/update" />
            <ItemListComponent
                getCount={getDashboardPostsCount}
                getItems={getDashboardPosts}
                path="blog/update"
                deleteItem={deletePost} />
        </section>
    );
}

export default UpdateBlogPageComponent;