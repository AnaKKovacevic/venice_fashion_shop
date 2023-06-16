import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsHandbag, BsHeart, BsShuffle} from "react-icons/bs";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../../redux/user.slicer";

const UserAccountActionsComponent = forwardRef(function UserAccountActionsComponent(props,ref){

    const {mouseEvents} = props;
    const comparisonStore = useSelector((state)=>state.comparisonStore);
    const userStore = useSelector((state)=>state.userStore);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const handleClick = ()=>{
        dispatch(removeUser());
        if(location.pathname.includes("wishlist") || location.pathname.includes("order")){
            navigate("/");
        }
    }

    return(
        <div className="user-account-actions" ref={ref} {...mouseEvents}>
            <div className="user-account-product-groups-holder">
                <Link to="/user/order" className="user-account-product-group"><BsHandbag/> My Orders</Link>
                <Link to="/user/wishlist" className="user-account-product-group"><BsHeart/> My Wishlist {`(${userStore.user ? userStore.user?.wishlist.length : 0})`}</Link>
                <Link to="/comparison" className="user-account-product-group"><BsShuffle/> Compare {`(${comparisonStore.productsCompared.length})`}</Link>
            </div>
            <div className="user-account-reg-log-holder">
                {
                    userStore.user
                    ?
                    <button type="button" className="log-out-btn" onClick={()=>handleClick()}>
                        Log out
                    </button>
                    :
                    <>
                        <Link to="/login" className="user-account-reg-log">Log In</Link>
                        <Link to="/register" className="user-account-reg-log">Register</Link>
                    </>
                }

            </div>
        </div>
    )
});

export default UserAccountActionsComponent;
