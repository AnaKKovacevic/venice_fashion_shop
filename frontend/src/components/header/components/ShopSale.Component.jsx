import Sale from "../../../assets/imgs/sale.jpg";

const ShopSaleComponent = ()=>{
    return(
        <>
            <img src={Sale} alt="Clothes on yellow background with table in the center showing 'Sale'" className="sale-img" />
            <span>Sale</span>
            <span></span>
        </>
    );
}

export default ShopSaleComponent;