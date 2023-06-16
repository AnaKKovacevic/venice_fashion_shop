import {useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { getLatestBlogPosts } from "../../services/blog.service";
import BlogShortPostComponent from "../../UIkit/BlogShortPost.Component";
import { toggleStarterLoader } from "../../redux/loader.slicer";
const LatestBlogComponent = ()=>{

    const [latestBlogPosts, setLatestBlogPosts] = useState([]);
    const [latestBlogPostsErr,setLatestBlogPostsErr] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        getLatestBlogPosts()
        .then((res)=>{
            setLatestBlogPosts(res.data);
        })
        .catch((err)=>{
            setLatestBlogPostsErr("Something went wrong with loading BLOG SECTION. Please try again.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"blog"}));
        })
    },[dispatch]);



    const latestBlogPostsList = ()=>{
        if(latestBlogPosts.length){
            return(
                latestBlogPosts.map((post,index)=>{
                    return(
                        <BlogShortPostComponent key={index} post={post} index={index} />
                    );
                })
            );
        }
    }

    return(
        <section className="latest-blog-section">
            <div className="container">
                    {
                        latestBlogPostsErr
                        ?
                        <div className="row">
                            <div className="col-12">
                                <p className="error-get-data-par">{latestBlogPostsErr}</p>
                            </div>
                        </div>
                        :
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <h3>Our latest posts</h3>
                                </div>
                            </div>
                            <div className="row gy-3 gy-md-5">
                                {latestBlogPostsList()}
                            </div>
                        </>
                    }

            </div>
            
        </section>
    );
}

export default LatestBlogComponent;