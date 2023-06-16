import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { getWishlistProducts } from "../../services/product.service";
import WishlistTableComponent from "./components/WishlistTable.Component";

const WishlistComponent = ()=>{

    const userStore = useSelector((state)=>state.userStore);
    const [wishlistProducts,setWishlistProducts] = useState([]);
    const [wishlistError,setWishlistError] = useState("");


    useEffect(()=>{
        getWishlistProducts(userStore.user?.wishlist)
            .then((res)=>{
                setWishlistProducts(res.data);
            })
            .catch((err)=>{
                setWishlistError("Something went wrong while getting wishlist products from database. Please reload the page.")
            })
    },[userStore])

    const showWishlistContent = ()=>{
        if(wishlistError){
            return(
                <div className="col-12">
                    <p className="error-get-data-par">{wishlistError}</p>
                </div>
            );
        }

        if(userStore.user?.wishlist.length){
            return (
                <div className="col-12">
                    <WishlistTableComponent wishlistProducts={wishlistProducts}  />
                </div>
                );
        }else{
            return(
                <div className="col">
                    <p className="no-products-par">There are no products added to wishlist.</p>
                </div>  
            );
        }
    }

    return(
        <section className="table-section wishlist-section">
            <div className="container">
                <div className="row">
                    {showWishlistContent()}
                </div>
            </div>
        </section>
    );
}

export default WishlistComponent;