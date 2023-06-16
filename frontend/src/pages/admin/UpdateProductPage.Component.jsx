import { deleteProduct, getDashboardProducts, getDashboardProductsCount } from "../../services/product.service";
import HeadingSearchGroupComponent from "../../UIkit/admin/HeadingSearchGroup.Component";
import ItemListComponent from "../../UIkit/admin/ItemList.Component";


const UpdateProductPageComponent = ()=>{
    return(
        <section className="dashboard-content update-product-section">
            <HeadingSearchGroupComponent heading="Products" path="product/update" />
            <ItemListComponent 
                getCount={getDashboardProductsCount} 
                getItems={getDashboardProducts} 
                path="product/update"
                deleteItem={deleteProduct} /> 
        </section>
    );
}

export default UpdateProductPageComponent;