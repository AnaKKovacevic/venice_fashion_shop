import BlogPostComponent from "../components/blogPost/BlogPost.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const BlogFullPostPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Blog post" />
            <BlogPostComponent />
        </>
    );
}

export default BlogFullPostPageComponent;