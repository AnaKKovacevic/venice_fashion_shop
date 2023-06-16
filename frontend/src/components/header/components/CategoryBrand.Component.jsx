import { Link } from "react-router-dom";
import CategoryBrandListComponent from "./CategoryBrandList.Component";

const CategoryBrandComponent = ({path,name,catBrand})=>{
    return(
        <li className="dropdown-li-item" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasSm">
            <Link className="dropdown-item dropdown-a-item" to={path}>{name}</Link>
            <CategoryBrandListComponent catBrands={catBrand} />
        </li>
    );
}

export default CategoryBrandComponent;