const StockCircleIndicatorComponent = ({product})=>{
    return(
        <div className="stock-holder">
            <div className={`stock-indicator ${product.stock ? "in-stock-indicator" : "out-of-stock-indicator"}`}></div>
            <p>{product.stock ? "In Stock" : "Out Of Stock"}</p>
        </div>
    );
}

export default StockCircleIndicatorComponent;