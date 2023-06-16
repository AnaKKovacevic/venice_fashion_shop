import CustomTitleComponent from "./CustomTitle.Component";
import {BsShuffle} from "react-icons/bs";
import {HiOutlineMinusCircle} from "react-icons/hi";
import { useSelector,useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { addProductForComparison,deleteProductFromComparison } from "../redux/comparison.slicer";
import {toast} from "react-toastify";
import { setComparedProductsToLocalStorage } from "../services/product.service";

const CompareActionComponent = ({product})=>{

    const [productCompared,setProductCompared] = useState(false);
    const comparisonStore = useSelector((state)=>state.comparisonStore);

    const dispatch = useDispatch();

    useEffect(()=>{

        let currentProductCompared = comparisonStore.productsCompared.find((oneComparedProduct)=>{
            return oneComparedProduct?._id === product?._id;
        })
        if(currentProductCompared){
            setProductCompared(true);
        }else{
            setProductCompared(false);
        }

    },[product,comparisonStore])

    useEffect(()=>{
        if(comparisonStore.productsCompared.length){
            setComparedProductsToLocalStorage(comparisonStore.productsCompared);
        }else{
            localStorage.removeItem("vf_products_compared");
        }
        
    },[productCompared,comparisonStore])

    const handleComparisonClick = (e)=>{
        e.preventDefault();
        if(productCompared){
            dispatch(deleteProductFromComparison(product));
        }else{
            if(comparisonStore.productsCompared.length < 2){
                dispatch(addProductForComparison(product));
                
            }else{
                toast.info("You already have two products selected for comparison!");
            }
            
        }
    }

    return(
        <button type="button" className="compare product-action" onClick={(e)=>handleComparisonClick(e)}>
            <CustomTitleComponent name="compare">
            {productCompared ? "Remove from Comparison" : "Compare"}
            </CustomTitleComponent>
            {productCompared ? <HiOutlineMinusCircle /> : <BsShuffle />}
            
        </button>
    );
}

export default CompareActionComponent;