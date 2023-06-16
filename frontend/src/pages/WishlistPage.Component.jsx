import WishlistComponent from "../components/wishlist/Wishlist.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const WishlistPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="My wishlist" />
            <WishlistComponent />
        </>
    );
}

export default WishlistPageComponent;