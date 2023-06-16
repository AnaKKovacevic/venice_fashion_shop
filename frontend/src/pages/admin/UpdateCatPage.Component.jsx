import { deleteCategory, getDashboardCats, getDashboardCatsCount } from "../../services/category.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";


const UpdateCatPageComponent = ()=>{
    return(
        <section className="dashboard-content update-cat-section">
            <HeadingSearchGroupComponent heading="Categories" path="category/update" />
            <ItemListComponent 
                getCount={getDashboardCatsCount} 
                getItems={getDashboardCats} 
                path="category/update"
                deleteItem={deleteCategory} />
        </section>
    );
}

export default UpdateCatPageComponent;