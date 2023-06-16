import CustomTitleComponent from "./CustomTitle.Component";
import {BsHeart,BsFillHeartFill} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { updateWishlist } from "../services/user.service";
import { toast } from "react-toastify";
import { saveUser } from "../redux/user.slicer";
import {BsXLg} from "react-icons/bs";

const WishlistActionComponent = ({product,titleSpecificClass})=>{

    const userStore = useSelector((state)=>state.userStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    const handleClick = (e)=>{
        e.preventDefault();
        if(userStore.user){

            updateWishlist(product._id)
                .then((res)=>{
                    localStorage.setItem("vf_user",JSON.stringify(res.data));
                    dispatch(saveUser(res.data));
                })
                .catch((err)=>{
                    if(err.response && (err.response.status === 401 || err.response.status === 408 || err.response.status === 409)){
                        toast.error(err.response.data);
                    }else{
                        toast.error(`${err.message}. Please try again.`);
                    }
                })
        }else{
            document.body.style.overflow = "auto";
            navigate("/login");
        }
    }

    if(location.pathname.includes("wishlist")){
        return(
            <div className="remove-btn-holder">
                <button type="button" onClick={(e)=>handleClick(e)}><BsXLg /></button>
            </div>
        );
    }else{
        return(
            <button type="button" className="wishlist product-action" onClick={(e)=>handleClick(e)}>
                <CustomTitleComponent name={`wishlist ${titleSpecificClass}`}>
                    {userStore.user?.wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                </CustomTitleComponent>
                {userStore.user?.wishlist.includes(product._id) ? <BsFillHeartFill /> : <BsHeart />}
            </button>
        );
    }
}

export default WishlistActionComponent;