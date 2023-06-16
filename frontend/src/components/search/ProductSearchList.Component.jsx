import { useState, useEffect } from "react";
import { useParams,useSearchParams } from "react-router-dom";
import { getSearchedProducts, getSearchedProductsCount } from "../../services/product.service";
import { toast } from "react-toastify";
import ProductComponent from "../../UIkit/Product.Component";
import PaginationComponent from "../../UIkit/Pagination.Component";

const ProductSearchListComponent = ()=>{

    const [searchResults,setSearchResults] = useState([]);
    const [searchResultsErr,setSearchResultsErr] = useState("");
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [paginationInfo,setPaginationInfo] = useState({
        page: searchParams.get("page"),
        totalProducts: 0
    });

    useEffect(()=>{
        let queryString = searchParams.toString();

        getSearchedProductsCount({
            searchValue: params.search.replaceAll("-"," "),
            query: queryString})
            .then((res)=>{
                if(res.data.length){
                    setPaginationInfo({
                        page: searchParams.get("page"),
                        totalProducts: res.data[0].totalProducts
                    })
                }else{
                    setPaginationInfo({
                        page: searchParams.get("page"),
                        totalProducts: 0
                    })
                }

            })
            .catch((err)=>{
                setSearchResultsErr("Something went wrong while getting searched products from the database. Please try again.");
            })

        getSearchedProducts({
                searchValue: params.search.replaceAll("-"," "),
                query: queryString})
            .then((res)=>{
                setSearchResults(res.data);
            })
            .catch((err)=>{
                setSearchResultsErr("Something went wrong while getting searched products from the database. Please try again.");
            })
    },[params,searchParams])

    useEffect(()=>{
        if(searchResultsErr){
            toast.error(searchResultsErr);
        }
    },[searchResultsErr])

    const showSearchedProducts = ()=>{
        if(searchResults.length){
            return searchResults.map((product,index)=>{
                return(
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                        <ProductComponent 
                            product={product}
                            classes="searched-product-article mx-auto mx-sm-0" />
                    </div>
                );
            })
        }
    }

    return(
        <section className="product-search-list-section">
            <div className="container">
                <div className="row row-title">
                    <div className="col-12">
                        <h2>Search Results For {`"${params.search}"`}</h2>
                    </div>
                </div>
                {
                    paginationInfo.totalProducts
                    ?
                    <>
                        <div className="row">
                            {showSearchedProducts()}
                        </div>
                        <div className="row pagination-row">
                            <div className="col-12">
                                <PaginationComponent searchParams={searchParams} paginationInfo={paginationInfo} searchValue={params.search} />
                            </div>
                        </div>
                    </>
                    :
                    <p className="no-products-par">No results found for {`"${params.search}"`}.</p>
                }

            </div>
        </section>
    );
}

export default ProductSearchListComponent;