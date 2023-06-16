import WishlistTableRowComponent from "./WishlistTableRow.Component";

const WishlistTableComponent = ({wishlistProducts})=>{

    const showWishlistProductRows = ()=>{
        return wishlistProducts.map((product)=>{
            return <WishlistTableRowComponent product={product} key={product._id} />
        })
    }

    return(
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" colSpan={3}>Product</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Stock status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showWishlistProductRows()}
                </tbody>
            </table>
        </div>
    );
}

export default WishlistTableComponent;