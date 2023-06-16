import { getFinalPrice } from "../services/product.service";

const OneOrderTableRowComponent = ({product,productDetails,currencyData})=>{
    return(
        <tr className="align-middle">
            <td>
                <div className="img-holder">
                    <img src={productDetails.thumbnail} alt={productDetails.title} referrerPolicy="no-referrer" />
                </div>
            </td>
            <td className="title-td">
                {productDetails.title}
            </td>
            <td className="text-center">
                {
                    product.discountPercentage
                    ?
                    <>
                        <span className="no-disc-span">{getFinalPrice(product,currencyData).priceNoDisc}</span><br/>
                    </>
                    :
                    null
                }
                
                <span className="final-price-span">{getFinalPrice(product,currencyData).finalPrice}</span>
            </td>
            <td className="text-center quantity-td">
                {product.productQuantity}
            </td>
            <td className="text-center subtotal-td">
                {getFinalPrice(product,currencyData,product.productQuantity).finalPrice}
            </td>
        </tr>
    );
}

export default OneOrderTableRowComponent;