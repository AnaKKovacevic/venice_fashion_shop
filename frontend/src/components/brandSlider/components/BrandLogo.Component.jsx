import { Link } from "react-router-dom"

const BrandLogoComponent = ({brand})=>{
    return(
        <article className="brand-logo-article text-center">
            <Link className="brand-logo" to={`/shop?page=1&limit=30&sort=rating-desc&brand=${brand.name.replaceAll(" ","-")}`}>
                <div className="brand-logo-img-holder text-center">
                    <img src={brand.thumbnail} alt={`${brand.name} logo`} referrerPolicy="no-referrer" />
                </div>
            </Link>
        </article>
    )
}

export default BrandLogoComponent;