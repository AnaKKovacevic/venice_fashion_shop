import { Link,useLocation } from "react-router-dom";
import {BsEye} from "react-icons/bs";
import RankComponent from "./Rank.Component";
import CustomTitleComponent from "./CustomTitle.Component";
import WishlistActionComponent from "./WishlistAction.Component";
import CompareActionComponent from "./CompareAction.Component";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ModalComponent from "./Modal.Component";
import ProductInfoComponent from "./ProductInfo.Component";
import CartActionComponent from "./CartAction.Component";
import { getFinalPrice } from "../services/product.service";
import CartOffcanvasComponent from "./CartOffcanvasComponent";

const ProductComponent = ({product,classes,index,windowWidth})=>{

    const articleRef = useRef(null);
    const modalViewRef = useRef();
    const location = useLocation();
    const currencyStore = useSelector((state)=>state.currencyStore);
    const [quickViewProductQuantity,setQuickViewProductQuantity] = useState(1);

    useEffect(()=>{
        if(index > 0){
            if(windowWidth < 576){
                articleRef.current.style.left = (index*100 + 50) + "%";
            }else if(windowWidth >= 576 && windowWidth < 768){
                articleRef.current.style.left = (index*50) + "%";
            }else if(windowWidth >= 768 && windowWidth < 992){
                articleRef.current.style.left = (index*33.33) + "%";
            }else if(windowWidth >= 992){
                articleRef.current.style.left = (index*25) + "%";
            }
            
        }
    },[index,windowWidth])


    const checkProductTitleLength = ()=>{
        let productTitleString = product.title;
        let productTitleArray = productTitleString.split(" ");
        let shownTitle = "";

        if(productTitleArray.length <= 4){
            shownTitle = productTitleArray.join(" ");
        }else{
            let shortTitleArray = [];
            for (let i = 0; i < 4; i++) {
               shortTitleArray.push(productTitleArray[i]);
            }
            shortTitleArray.push("...");
            shownTitle = shortTitleArray.join(" ");
        }

        return shownTitle;
    }

    const removeSpaces = (param)=>{

        let newParam = param.replaceAll(" ","-");
        return newParam;
    }



    const handleViewClick = (e)=>{
        e.preventDefault();
        modalViewRef.current.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    const handleMouseModalViewClick = ()=>{
        modalViewRef.current.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const preventModalClose = (e)=>{
        e.stopPropagation();
    }

    const showProductTitle = ()=>{
        if(location.pathname.includes("shop") && location.search){
            return <h2>{checkProductTitleLength()}</h2>;
         }else if(location.pathname.includes("shop")){
            return <h3>{checkProductTitleLength()}</h3>;
         }else{
            return <h4>{checkProductTitleLength()}</h4>;
         }
    }

    return(
        <article className={classes} ref={articleRef}>
            <Link className="product" 
                to={`/shop/${removeSpaces(product.product_category[0].gender)}/${removeSpaces(product.product_category[0].name)}/${removeSpaces(product?.product_brand[0].name)}/${product._id}`}>
                <div className="product-img-holder">
                    <img src={product.thumbnail} alt={product.title} referrerPolicy="no-referrer" />
                </div>
                <div className="product-actions-holder">
                    <CartActionComponent 
                        showCustomTitle={true} 
                        specificClass="cart product-action" 
                        titleSpecificClass="custom-title-holder-product-card"
                        productQuantity={1}
                        product={product}
                        specificOffcanvas="product" />
                    <button type="button" className="quick-view product-action" onClick={handleViewClick}>
                        <CustomTitleComponent name="quick-view">
                            Quick view
                        </CustomTitleComponent>
                        <BsEye />
                    </button>
                    
                    <CompareActionComponent product={product} />
                    <WishlistActionComponent product={product} titleSpecificClass="custom-title-holder-product-card" />
                    
                </div>

                <div className="product-title-holder">
                    {showProductTitle()}                  
                </div>

                <div className="product-price-holder">
                    <p>

                        {
                            product.discountPercentage
                            ?
                            <>
                                {getFinalPrice(product,currencyStore).finalPrice}
                                <span>
                                    {getFinalPrice(product,currencyStore).priceNoDisc}
                                </span>
                            </>
                            :
                            <>{getFinalPrice(product,currencyStore).finalPrice}</>
                        }
                        
                    </p>
                </div>
                <div className="product-rank-holder">
                    <RankComponent rating={product.rating} />
                </div>


                
                
            </Link>

            <ModalComponent 
                ref={modalViewRef} 
                specificClass="modal-view"
                handleMouseModalClick={handleMouseModalViewClick}>

                <div className="modal-view-holder" onClick={(e)=>preventModalClose(e)}>
                    <section className="quick-view-section">
                        <h3>{product.title}</h3>
                        <section className="quick-view-img-section">
                            <div className="img-holder">
                                <img src={product.thumbnail} alt={product.title} referrerPolicy="no-referrer" />
                            </div>
                        </section>
                        <ProductInfoComponent 
                            product={product} 
                            specificClass="one-product-info" 
                            specificOffcanvas="quickView"
                            productQuantity={quickViewProductQuantity}
                            setProductQuantity={setQuickViewProductQuantity} />
                    </section>
                </div>
            </ModalComponent>
            <CartOffcanvasComponent product={product} productQuantity={1} specificOffcanvas="product" />           
            <CartOffcanvasComponent product={product} productQuantity={quickViewProductQuantity} specificOffcanvas="quickView" />
        </article>
    );
};

export default ProductComponent;