import { deleteBrand, getDashboardBrands, getDashboardBrandsCount, } from "../../services/brand.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";

const UpdateBrandPageComponent = ()=>{
    return(
        <section className="dashboard-content update-brand-section">
            <HeadingSearchGroupComponent heading="Brands" path="brand/update" />
            <ItemListComponent
                getCount={getDashboardBrandsCount}
                getItems={getDashboardBrands} 
                path="brand/update"
                deleteItem={deleteBrand} />
        </section>
    );
}

export default UpdateBrandPageComponent;