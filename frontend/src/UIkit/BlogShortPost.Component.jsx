import {Link} from "react-router-dom";
import { getShortNumDate } from "../services/date.service";

const BlogShortPostComponent = ({post,index,blogPage})=>{


    return(
        <div className="col-12 col-blog-post">
            <article className="post-article">
                <div className={`post-holder d-flex flex-column ${index === 0 || index % 2 === 0 ? "flex-md-row" : "flex-md-row-reverse"}`}>
                    <div className="post-img-holder">
                        <img src={post.thumbnail} alt={post.title} referrerPolicy="no-referrer" />
                    </div>

                    <div className="post-info-text-holder">
                        {
                            blogPage
                            ?
                            <h2>{post.title}</h2>
                            :
                            <h4>{post.title}</h4>
                        }

                        <div className="post-info-holder">
                            <p>{post.author}</p>
                            <p>{getShortNumDate(post.postedAt)}</p>
                            <p>{post.readingTime} read</p>
                        </div>
                        <div className="post-text" dangerouslySetInnerHTML={{__html:post.textShort}}></div>

                        <Link to={`/blog/post/${post._id}`}>
                            Read more
                        </Link>

                    </div>
                </div>
            </article>
        </div>
    );
}

export default BlogShortPostComponent;