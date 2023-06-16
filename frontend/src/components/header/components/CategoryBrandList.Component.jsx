import { Link } from "react-router-dom";

const CategoryBrandListComponent = ({catBrands})=>{

    const categoriesBrands = ()=>{
        if(catBrands.length){
            return(
                catBrands.map((catBrand,index)=>{
                    return(
                        <li key={index} className="nav-categories-brands-item">
                            <Link 
                                to={(catBrand.gender 
                                    ? `/shop?page=1&limit=30&sort=rating-desc&gender=${catBrand.gender}&category=${catBrand.name}` 
                                    : 
                                    `/shop?page=1&limit=30&sort=rating-desc&brand=${catBrand.name}`)}>
                                    {catBrand.name}
                            </Link>
                        </li>
                    );
                })
            );
        }
    }
    return(
        <ul className="nav-categories-brands-list">
            {categoriesBrands()}
        </ul>
    );
}

export default CategoryBrandListComponent;