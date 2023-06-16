import { useSelector } from "react-redux";
import ProductComparsionCardComponent from "./components/ProductComparisonCard.Component";

const ProductComparisonComponent = ()=>{

    const comparisonStore = useSelector((state)=>state.comparisonStore);

    const showComparisonProducts = ()=>{
        return comparisonStore.productsCompared.map((product,index)=>{
            return <ProductComparsionCardComponent product={product} key={index} />
        })
    }

    return(
        <section className="comparison-section">
            <div className="container">
                <div className={`row ${comparisonStore.productsCompared.length === 1 ? "justify-content-center" : "justify-content-xl-center gx-xxl-5"}`}>
                    {
                        comparisonStore.productsCompared.length
                        ?
                        showComparisonProducts()
                        :
                        <div className="col">
                            <p className="no-products-par">There are no products selected for comparison.</p>
                        </div>                       
                    }
                    
                </div>
            </div>
        </section>
    );
}

export default ProductComparisonComponent;