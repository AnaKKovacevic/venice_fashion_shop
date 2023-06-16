import {IoIosFunnel} from "react-icons/io";
import {BsChevronDown} from "react-icons/bs";
import FilterComponent from "./components/Filter.Component";
import ModalComponent from "../../UIkit/Modal.Component";
import { useState,useRef,useEffect } from "react";
import SortRadioComponent from "./components/SortRadio.Component";
import SortSelectComponent from "./components/SortSelect.Component";
import { useSearchParams } from "react-router-dom";
import { getFilteredProducts, getProductsCount } from "../../services/product.service";
import ProductComponent from "../../UIkit/Product.Component";
import LimitSelectComponent from "./components/LimitSelect.Component";
import PaginationComponent from "../../UIkit/Pagination.Component";
import FilterResetButtonComponent from "./components/FilterResetButton.Component";
import { useDispatch } from "react-redux";
import { toggleLoader,toggleLoaderFilterProducts } from "../../redux/loader.slicer";

const ProductListComponent = ()=>{


    const [searchParams] = useSearchParams();
    const modalSortRef = useRef(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredProductsErr, setFilteredProductsErr] = useState("");
    const dispatch = useDispatch()


    const [paginationInfo,setPaginationInfo] = useState({
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
        totalProducts: 0
    })

    useEffect(()=>{
        dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
        let queryString = searchParams.toString();

        getProductsCount(queryString)
            .then((res)=>{
                setPaginationInfo({
                    page: searchParams.get("page"),
                    limit: searchParams.get("limit"),
                    totalProducts: res.data[0].totalProducts
                })
            })
            .catch((err)=>{
                setFilteredProductsErr("Something went wrong with getting products from database. Please reload the page.");
            });

        getFilteredProducts(queryString)
            .then((res)=>{
                setFilteredProducts(res.data);
                
            })
            .catch((err)=>{
                setFilteredProductsErr("Something went wrong with getting products from database. Please reload the page.");
            })
            .finally(()=>{
                dispatch(toggleLoaderFilterProducts());
            })

            


    },[searchParams,dispatch])



    const handleMouseModalSortClick = ()=>{
        modalSortRef.current.style.display = "none";
    }
    const handleMouseSortBtnClick = ()=>{
        modalSortRef.current.style.display = "block";
    }

    const showFilteredProducts = ()=>{

        return filteredProducts.map((product,index)=>{
            return (
                <div className="col-sm-6 col-lg-4 col-xxl-3 mb-3" key={index}>
                    <ProductComponent 
                        product={product} 
                        classes="filtered-product-article mx-auto mx-sm-0" 
                        
                         />
                </div>
            ); 
        })
    }

    return(
        <section className="product-list-section">
            <div className="container">
            <div className="row flex-column">
                <div className="col">
                    <section className="filters-sort-section d-lg-none">
                        <div className="row justify-content-between">
                            <div className="col-3 d-block">
                                <button 
                                    type="button" 
                                    className="funnel-btn"
                                    data-bs-toggle="offcanvas" 
                                    data-bs-target="#filterOffcanvas" 
                                    aria-controls="filterOffcanvas">
                                    <IoIosFunnel />
                                </button>

                                <div 
                                    className="offcanvas offcanvas-start" 
                                    tabIndex="-1" id="filterOffcanvas" 
                                    aria-labelledby="filterOffcanvasLabel">
                                    <div className="offcanvas-header justify-content-end">
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <div className="all-filters-holder">
                                            <FilterComponent searchParams={searchParams} collapse={false} />
                                            <div className="filter-btn-action-holder text-center mt-5">
                                                <button type="button" className="filter-action-btn filter-apply-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    Apply Filters
                                                </button>
                                                <FilterResetButtonComponent searchParams={searchParams} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-9 text-end">
                                <button type="button" className="modal-sort-btn" onClick={()=>handleMouseSortBtnClick()}>
                                    Sort by <BsChevronDown />
                                </button>
                                <ModalComponent ref={modalSortRef} specificClass="modal-sort" handleMouseModalClick={handleMouseModalSortClick}>
                                    <div className="sort-holder">
                                        <SortRadioComponent radioValue="title-asc" radioText="Product name A-Z" searchParams={searchParams} />
                                        <SortRadioComponent radioValue="title-desc" radioText="Product name Z-A" searchParams={searchParams} />
                                        <SortRadioComponent radioValue="rating-desc" radioText="Rank" searchParams={searchParams} />
                                        <SortRadioComponent radioValue="finalPrice-asc" radioText="Price low to high" searchParams={searchParams} />
                                        <SortRadioComponent radioValue="finalPrice-desc" radioText="Price high to low" searchParams={searchParams} />
                                    </div>
                                </ModalComponent>
                            </div>
                        </div>
                    </section>

                    <section className="sort-lg-section d-none d-lg-block">
                        <SortSelectComponent
                            searchParams={searchParams}
                             />
                    </section>
                </div>
                <div className="col filters-products-col">
                    <div className="row">
                        <div className="col-lg-3 col-xxl-2 d-none d-lg-block">
                            <section className="filters-lg-section">
                                <div className="all-filters-holder">
                                    <FilterComponent searchParams={searchParams} collapse={true} />
                                    <FilterResetButtonComponent searchParams={searchParams} />
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-9 col-xxl-10">
                            <section className="row products-section">

                                {
                                filteredProductsErr
                                ?
                                <p className="error-get-data-par">{filteredProductsErr}</p>
                                :
                                showFilteredProducts()
                                }
                            </section>
                        </div>
                        
                    </div>
                </div>

                <div className="col pagination-col">
                    <div className="row justify-content-between">
                        <div className="col-md-8 col-lg-6 offset-lg-3 offset-xxl-2 mb-3 mb-md-0">
                            <section className="pagination-section">
                                <PaginationComponent searchParams={searchParams} paginationInfo={paginationInfo} />

                            </section>
                        </div>
                        <div className="col-md-4 col-lg-3">
                             <div className="limit-products-num-section">
                                <LimitSelectComponent 
                                    searchParams={searchParams}
                                     />
                            </div>
                        </div>
                    </div>
                    

                </div>

                
                </div>
            </div>
            
        </section>
    );
}

export default ProductListComponent;