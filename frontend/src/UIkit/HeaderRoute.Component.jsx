import { useParams,Link } from "react-router-dom";
import introImg from "../assets/imgs/intro.jpg";

const HeaderRouteComponent = ()=>{

    let {gender,category,brand} = useParams();

    const formatParam = (param)=>{
        let transformedParam = (param.charAt(0).toUpperCase() + param.slice(1)).replaceAll("-"," ");
        return transformedParam;

    }

    return(
        <section className="header-route-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="img-route-holder">
                            <div className="img-holder">
                                <img src={introImg} alt="Woman wearing a hat, a dress and sunglasses in front of yellow background." />
                            </div>
                            <div className="route-holder">
                                <p>
                                    <Link to="/shop?page=1&limit=30&sort=rating-desc">Shop</Link>
                                    /
                                    <Link to={`/shop?page=1&limit=30&sort=rating-desc&gender=${gender}`}>
                                        {formatParam(gender)}
                                    </Link>
                                    /
                                    <br/>

                                    <Link to={`/shop?page=1&limit=30&sort=rating-desc&gender=${gender}&category=${category}`}>
                                        {formatParam(category)}
                                    </Link>
                                    
                                    /

                                    <Link to={`/shop?page=1&limit=30&sort=rating-desc&gender=${gender}&category=${category}&brand=${brand}`}>
                                        {brand.replaceAll("-"," ")}
                                    </Link>
                                    
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeaderRouteComponent;