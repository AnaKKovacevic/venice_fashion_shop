import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllBlogPosts, getAllBlogPostsCount } from "../../services/blog.service";
import BlogShortComponent from "../../UIkit/BlogShortPost.Component";
import PaginationComponent from "../../UIkit/Pagination.Component";

const BlogListComponent = ()=>{

    const [searchParams] = useSearchParams();
    const [blogPosts,setBlogPosts] = useState([]);
    const [blogPostsErr,setBlogPostsErr] = useState("");
    const [paginationInfo,setPaginationInfo] = useState({
        page: searchParams.get("page"),
        totalPosts: 0
    });


    useEffect(()=>{
        let queryString = searchParams.toString();


        getAllBlogPostsCount()
            .then((res)=>{
                setPaginationInfo({
                    page: searchParams.get("page"),
                    totalPosts: res.data[0].totalPosts
                })
            })
            .catch((err)=>{
                setBlogPostsErr("Something went wrong with loading posts. Please reload the page.");
            });

        getAllBlogPosts(queryString)
            .then((res)=>{
                setBlogPosts(res.data);
                
            })
            .catch((err)=>{
                setBlogPostsErr("Something went wrong with loading posts. Please reload the page.");
            });
    },[searchParams])

    const showBlogPosts = ()=>{
        return blogPosts.map((post,index)=>{
            return <BlogShortComponent key={index} post={post} index={index} blogPage={true} />
        })
    }

    return(
        <section className="blog-list-section">
            <div className="container">
                {
                    blogPostsErr
                    ?
                    <p className="error-get-data-par">{blogPostsErr}</p>
                    :
                    <>
                        <div className="row gy-3 gy-md-5 mb-5">
                            {showBlogPosts()}
                        </div>
                        <div className="row">
                            <div className="col">
                                <PaginationComponent searchParams={searchParams} paginationInfo={paginationInfo} blogPage={true} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

export default BlogListComponent;