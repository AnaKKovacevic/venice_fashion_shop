import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogPost } from "../../services/blog.service";
import { getShortNumDate } from "../../services/date.service";

const BlogPostComponent = ()=>{

    const [blogPost,setBlogPost] = useState({});
    const [blogPostErr,setBlogPostErr] = useState("");
    const params = useParams();

    useEffect(()=>{
        getBlogPost(params.id)
        .then((res)=>{
            setBlogPost(res.data[0]);
        })
        .catch((err)=>{
            setBlogPostErr("Something went wrong with loading post. Please reload the page.");
        })

    },[params])


    return(
        <article className="full-blog-post-article">
            <div className="container">
                <div className="row">
                    <div className="col">
                        {
                            blogPostErr
                            ?
                            <p className="error-get-data-par">{blogPostErr}</p>
                            :
                            <>
                                <h2>{blogPost?.title}</h2>
                                <div className="full-blog-post-info-holder d-flex flex-wrap justify-content-center">
                                    <p>{blogPost?.author}</p>
                                    <p>{blogPost?.postedAt ? getShortNumDate(blogPost.postedAt) : null}</p>
                                    <p>{blogPost?.readingTime} read</p>
                                </div>
                                <div className="img-holder">
                                    <img src={blogPost.thumbnail} alt={blogPost.title} referrerPolicy="no-referrer" />
                                </div>
                                <div className="full-blog-post-text" dangerouslySetInnerHTML={{__html:blogPost.text}}></div>
                            </>
                        }

                    </div>
                </div>
            </div>
        </article>
    );
}

export default BlogPostComponent;