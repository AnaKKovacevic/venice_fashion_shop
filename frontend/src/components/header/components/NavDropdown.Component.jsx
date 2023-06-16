import {useState,useEffect,forwardRef} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {HiChevronDown} from "react-icons/hi";
import { getCategoriesGender } from "../../../services/category.service";
import { getAllBrands } from "../../../services/brand.service";
import CategoryBrandComponent from "./CategoryBrand.Component";
import ShopSaleComponent from "./ShopSale.Component";
import CategoryBrandSmComponent from "./CategoryBrandSmComponent";
import { saveBrand } from "../../../redux/brand.slicer";
import { saveCategoryMen, saveCategoryWomen } from "../../../redux/category.slicer";
import { toggleStarterLoader } from "../../../redux/loader.slicer";

const NavDropdownComponent = forwardRef(function NavDropdownComponent({windowWidth,events,mouseEvents},ref){

    const [categoriesWomen,setCategoriesWomen] = useState([]);
    const [categoriesMen,setCategoriesMen] = useState([]);
    const [brands,setBrands] = useState([]);
    const [categoriesWomenErr,setCategoriesWomenErr] = useState("");
    const [categoriesMenErr,setCategoriesMenErr] = useState("");
    const [brandsErr,setBrandsErr] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        getCategoriesGender("women")
        .then((res)=>{
            setCategoriesWomen(res.data);
            dispatch(saveCategoryWomen(res.data));
        })
        .catch((err)=>{
            setCategoriesWomenErr("Something went wrong with loading menu subcategory WOMEN. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"navLinksWomen"}));
        });

        getCategoriesGender("men")
        .then((res)=>{
            setCategoriesMen(res.data);
            dispatch(saveCategoryMen(res.data));
        })
        .catch((err)=>{
            setCategoriesMenErr("Something went wrong with loading menu subcategory MEN. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"navLinksMen"}));
        });

        getAllBrands()
        .then((res)=>{
            setBrands(res.data);
            dispatch(saveBrand(res.data))
        })
        .catch((err)=>{
            setBrandsErr("Something went wrong with loading menu subcategory BRANDS. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"navLinksAll"}));
        });
    },[dispatch]);

    let attributes = {
        className:"nav-link nav-shop-link dropdown-toggle",
        to:"#",
        role:"button",
        "data-bs-toggle":"dropdown",
        "aria-expanded":"false"
    }

    if(windowWidth >= 576){
        attributes = {
            className : "nav-link nav-shop-link",
            to:"/shop?page=1&limit=30&sort=rating-desc"
        }
    }

    let offcanvasUlAttributes = {
        className:"dropdown-menu dropdown-menu-list",
        "data-bs-toggle": "offcanvas",
        "data-bs-target": "#navbarOffcanvasSm"
    };



        

        return(

            <>
            <Link {...attributes} {...events} >

                Shop <HiChevronDown className="nav-chevron-icon" />
            </Link>

            <ul {...offcanvasUlAttributes}>
                <CategoryBrandComponent path="/shop?page=1&limit=30&sort=rating-desc&gender=women" name="Women" catBrand={categoriesWomen} />
                <CategoryBrandComponent path="/shop?page=1&limit=30&sort=rating-desc&gender=men" name="Men" catBrand={categoriesMen} />
                <CategoryBrandComponent path="/shop?page=1&limit=30&sort=rating-desc" name="Brands" catBrand={brands} />
                <li className="dropdown-li-item">
                    <Link className="dropdown-item dropdown-a-item dropdown-item-img-holder" to="/shop?page=1&limit=30&sort=rating-desc&sale=yes">
                        <ShopSaleComponent />
                    </Link>
                    {categoriesWomenErr && <p className="error-get-data-par my-3">{categoriesWomenErr}</p>}
                    {categoriesMenErr && <p className="error-get-data-par my-3">{categoriesMenErr}</p>}
                    {brandsErr && <p className="error-get-data-par my-3">{brandsErr}</p>} 
                </li>
            </ul>

            <div className="dropdown-list-sm-holder" ref={ref} {...mouseEvents}>
                <ul className="nav-shop-list">
                    <CategoryBrandSmComponent path="/shop?page=1&limit=30&sort=rating-desc&gender=women" name="Women" catBrand={categoriesWomen} />
                    <CategoryBrandSmComponent path="/shop?page=1&limit=30&sort=rating-desc&gender=men" name="Men" catBrand={categoriesMen} />
                    <CategoryBrandSmComponent path="/shop?page=1&limit=30&sort=rating-desc" name="Brands" catBrand={brands} />
                    <li className="dropdown-li-item">
                        <Link className="dropdown-a-item dropdown-item-img-holder" to="/shop?page=1&limit=30&sort=rating-desc&sale=yes">
                            <ShopSaleComponent />
                        </Link>
                        {categoriesWomenErr && <p className="error-get-data-par my-3">{categoriesWomenErr}</p>}
                        {categoriesMenErr && <p className="error-get-data-par my-3">{categoriesMenErr}</p>}
                        {brandsErr && <p className="error-get-data-par my-3">{brandsErr}</p>}                        
                    </li>
                </ul>
            </div>
            </>
            
        );
});

export default NavDropdownComponent;