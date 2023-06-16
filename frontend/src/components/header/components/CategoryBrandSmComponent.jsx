import { Link } from "react-router-dom";
import CategoryBrandListComponent from "./CategoryBrandList.Component";

const CategoryBrandSmComponent = ({path,name,catBrand}) =>{
    return(
        <li className="dropdown-li-item">
            <Link className="dropdown-item dropdown-a-item" to={path}>{name}</Link>
            <CategoryBrandListComponent catBrands={catBrand} />
        </li>
    );
}

export default CategoryBrandSmComponent;