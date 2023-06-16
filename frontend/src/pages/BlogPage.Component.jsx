import BlogListComponent from "../components/blogList/BlogList.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const BlogPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Blog" />
            <BlogListComponent />
        </>
    );
}

export default BlogPageComponent;