import OneOrderTableRowComponent from "./OneOrderTableRow.Component";


const OneOrderTableComponent = ({order})=>{

    const getProductDetails = (product)=>{
        let productDetails = {};
        if(order){
            order.productsDetails.forEach((oneProductDetails)=>{
                if(product.productID === oneProductDetails._id){
                    productDetails = {...oneProductDetails};
                }
            })
        }


        return productDetails;
    }

    const showOrderRows = ()=>{
        if(order){
            return order.cart.map((product,index)=>{
                    return (<OneOrderTableRowComponent 
                                product={product} 
                                key={index} 
                                productDetails={getProductDetails(product)}
                                currencyData={order.currencyData} />);
                })
        }
    }
    return(
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" colSpan={2}>Product</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Quantity</th>
                        <th scope="col" className="text-center">Subtotal</th>
                    </tr>                       
                </thead>
                <tbody>
                    {showOrderRows()}
                </tbody>
            </table>
        </div>
    );
}

export default OneOrderTableComponent;