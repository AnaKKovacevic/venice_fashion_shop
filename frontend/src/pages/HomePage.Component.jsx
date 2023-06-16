import { useState,useEffect } from "react";
import SliderComponent from "../components/slider/Slider.Component";
import PromotedCategoriesComponent from "../components/promotedCategories/PromotedCategories.Component";
import GeneralCustomersInfoComponent from "../components/generalCustomersInfo/GeneralCustomersInfo.Component";
import TestimonialComponent from "../components/testimonial/Testimonial.Component";
import LatestBlogComponent from "../components/latestBlog/LatestBlog.Component";
import ProductsSliderComponent from "../UIkit/ProductsSlider.Component";
import { getTopProducts } from "../services/product.service";
import { useDispatch,useSelector } from "react-redux";
import { resetToggleStarterLoader,toggleLoader,toggleStarterLoader } from "../redux/loader.slicer";

const HomePageComponent = () =>{

    const [topProducts,setTopProducts] = useState([]);
    const [topProductsErr, setTopProductsErr] = useState("");
    const dispatch = useDispatch();

    const loaderStoreStarter = useSelector((state)=>state.loaderStore.starterLoader);
    const categoryStore = useSelector((state)=>state.categoryStore);
    const brandStore = useSelector((state)=>state.brandStore);

    useEffect(()=>{
        if((loaderStoreStarter.navLinksWomen || categoryStore.women.length) && 
        (loaderStoreStarter.navLinksMen || categoryStore.men.length) && 
        (loaderStoreStarter.navLinksAll || brandStore.brand.length) &&
            loaderStoreStarter.promotedCats && loaderStoreStarter.topProducts &&
            loaderStoreStarter.testimonial && loaderStoreStarter.blog){
                dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                dispatch(resetToggleStarterLoader());
        }
    },[loaderStoreStarter,dispatch,brandStore,categoryStore])

    useEffect(()=>{
        dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
    },[dispatch])

    useEffect(()=>{
        getTopProducts()
        .then((res)=>{
            setTopProducts(res.data);
        })
        .catch((err)=>{
            setTopProductsErr("Something went wrong with loading TOP PRODUCTS. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"topProducts"}));
        })
    },[dispatch]);

    return(
        <>
            <SliderComponent />
            <PromotedCategoriesComponent />
            {topProducts.length
            ?             
            <ProductsSliderComponent
                products={topProducts}
                sliderTitle="Top products"
                classPrefix="top-products"
                h2Title={false}  />
            :
            null
            }    
            {topProductsErr && 
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                    <p className="error-get-data-par">{topProductsErr}</p>
                    </div>
                </div>
            </div>
            }
            <GeneralCustomersInfoComponent />
            <TestimonialComponent />
            <LatestBlogComponent /> 
        </>
    )
}

export default HomePageComponent;