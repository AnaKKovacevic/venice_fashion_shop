import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getCategoriesPromoted } from "../../services/category.service";
import PromotedCategoryComponent from "./components/PromotedCategory.Component";
import { toggleStarterLoader } from "../../redux/loader.slicer";

const PromotedCategoriesComponent = ()=>{

    const [promotedCategories, setPromotedCategories] = useState([]);
    const [promotedCategoriesErr, setPromotedCategoriesErr] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        getCategoriesPromoted()
        .then((res)=>{
            setPromotedCategories(res.data);
        })
        .catch((err)=>{
            setPromotedCategoriesErr("Something went wrong with loading CATEGORIES. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"promotedCats"}));
        });
    },[dispatch]);



    const promotedCategoriesList = ()=>{
        if(promotedCategories.length){
            return(
                promotedCategories.map((promotedCat,index)=>{
                    return(
                        <PromotedCategoryComponent key={index} promotedCat={promotedCat} index={index} />
                    );
                })
            );
        }       
    }
    
    return(

            <section className="promoted-categories-section">
                <div className="container">
                    <div className="row gy-4 mx-0">
                        {promotedCategoriesList()}
                        {promotedCategoriesErr && <p className="error-get-data-par my-3">{promotedCategoriesErr}</p>}
                    </div>
                </div>
            </section>

    );
}

export default PromotedCategoriesComponent;