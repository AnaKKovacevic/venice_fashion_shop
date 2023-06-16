import {Link} from "react-router-dom";

const PromotedCategoryComponent = ({promotedCat,index})=>{

    return(
        <article className={`col-12 col-md-6 col-xl-4 mx-auto ${index === 3 ? "offset-md-3 offset-xl-0" : null}`}>
            <div className="row align-items-center justify-content-sm-around promoted-category-holder">
                <div className="col-6 col-sm-6">
                    <div className="promoted-cat-img-holder">
                        <img src={promotedCat.thumbnail} alt={`${promotedCat.gender}'s ${promotedCat.name}`} referrerPolicy="no-referrer" />
                    </div>
                </div>
                <div className="col-6 col-sm-5">
                    <Link className="promoted-cat-heading-holder" to={`/shop?page=1&limit=30&sort=rating-desc&gender=${promotedCat.gender}&category=${promotedCat.name}`}>
                        <h4>
                            {`${promotedCat.gender}'s`}<br/> {`${promotedCat.name}`}
                        </h4>
                        <div className="yellow-rectangle"></div>
                        <div className="black-rectangle"></div>
                    </Link>
                    
                </div>
            </div>
        </article>
    );
}

export default PromotedCategoryComponent;