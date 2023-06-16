import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../services/product.service";
import { getCategoryProducts } from "../../services/product.service";
import MainHeadingComponent from "../../UIkit/MainHeading.Component";
import ZoomComponent from "./components/Zoom.Component";
import ProductInfoComponent from "../../UIkit/ProductInfo.Component";
import ProductImgsSliderComponent from "./components/ProductImgsSlider.Component";
import ProductsSliderComponent from "../../UIkit/ProductsSlider.Component";
import ProductMoreInfoComponent from "./components/ProductMoreInfo.Component";

const ProductDetailsComponent = ()=>{

    const [productWithDetails,setProductWithDetails] = useState(null);
    const [otherCategoryProducts,setOtherCategoryProdcuts] = useState([]);
    const [errorProductWithDetails,setErrorProductWithDetails] = useState("");
    const [errorOtherCategoryProdcuts,setErrorOtherCategoryProdcuts] = useState("");
    const [imgsSliderArray,setImgsSliderArray] = useState([]);
    const [activeImg,setActiveImg] = useState("");
    const [detailsProductQuantity,setDetailsProductQuantity] = useState(1);
    const params = useParams();

    useEffect(()=>{
        
        if(params.productId){
            getProductDetails(params.productId)
            .then((res)=>{
                setProductWithDetails(res.data);
                setDetailsProductQuantity(1);
                
            })
            .catch((err)=>{
                setErrorProductWithDetails("Something went wrong with loading PRODUCT. Please reload the page.");
            })
        }
    },[params])


    useEffect(()=>{

        if(productWithDetails){
            getCategoryProducts(productWithDetails[0].category,productWithDetails[0]._id)
                .then((res)=>{
                    setOtherCategoryProdcuts(res.data);
                    })
                .catch((err)=>{
                    setErrorOtherCategoryProdcuts("Something went wrong with loading OTHER PRODUCTS FROM THE SAME CATEGORY. Please reload the page.");
                    })
        }
        
    },[productWithDetails])


    useEffect(()=>{
        if(productWithDetails){
            let imgsArray = [...productWithDetails[0].images];
        let imgThumbnail = productWithDetails[0].thumbnail;

        let thumbnailIndex = imgsArray.findIndex((img)=>{
            return img === imgThumbnail;
        });

        if(thumbnailIndex === -1){
            imgsArray.unshift(imgThumbnail);
        }else if(thumbnailIndex > 0){
            imgsArray.splice(thumbnailIndex,1);
            imgsArray.unshift(imgThumbnail);
        }

        setImgsSliderArray(imgsArray);
        setActiveImg(imgThumbnail)

        }
        
    },[productWithDetails])

    const handleImgClick = (imgSrc)=>{
        setActiveImg(imgSrc);
    }

    return(
        <>
            {
                errorProductWithDetails
                ?
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="error-get-data-par my-3">{errorProductWithDetails}</p>
                        </div>
                    </div>
                </div>

                :
                (
                productWithDetails 
                ?
                
                <>
                    <MainHeadingComponent h1Text={productWithDetails[0].title} />
                    <section className="product-details-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <ZoomComponent 
                                            product={productWithDetails[0]} 
                                            activeImg={activeImg}
                                            imgsArray={imgsSliderArray} />
                                    <ProductImgsSliderComponent 
                                            product={productWithDetails[0]} 
                                            imgsArray={imgsSliderArray}
                                            handleImgClick={handleImgClick}
                                            activeImg={activeImg} />
                                </div>
                                <div className="col-md-5">
                                    <ProductInfoComponent 
                                        product={productWithDetails[0]} 
                                        specificClass={"products-details-info"}
                                        specifficOffcanvas="productDetails"
                                        showOffcanvas={true}
                                        productQuantity={detailsProductQuantity}
                                        setProductQuantity={setDetailsProductQuantity} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <ProductMoreInfoComponent product={productWithDetails[0]} />
                                </div>
                            </div>
                        </div>
                    </section>
                </> 

                :
                
                null
                )
            }
            
            {
                errorOtherCategoryProdcuts
                ?
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="error-get-data-par my-3">{errorProductWithDetails}</p>
                        </div>
                    </div>
                </div>
                :
                (
                    otherCategoryProducts.length
                    ?
                    <ProductsSliderComponent 
                    products={otherCategoryProducts} 
                    sliderTitle="Other products from the same category"
                    classPrefix="category-products"
                    h2Title={true} />
                    :
                    null
                )
            
            }


        </>
    );
}

export default ProductDetailsComponent;