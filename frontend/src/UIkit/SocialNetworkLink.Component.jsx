import {Link} from "react-router-dom";

const SocialNetworkLinkComponent = ({socialNet})=>{
    return(
        <article className="social-network-link-article">
            <Link target="_blank" className={`social-network-link-holder ${socialNet}-link`} to={`https://www.${socialNet}.com`}>
                {socialNet}
            </Link>
        </article>
    );
}

export default SocialNetworkLinkComponent;