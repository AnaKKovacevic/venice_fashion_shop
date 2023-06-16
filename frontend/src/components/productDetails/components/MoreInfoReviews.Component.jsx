import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import ModalComponent from "../../../UIkit/Modal.Component";
import RankHoverComponent from "../../../UIkit/RankHover.Component";
import ReviewComponent from "./Review.Component";
import {submitReview} from "../../../services/product.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleLoader } from "../../../redux/loader.slicer";

const ReviewSchema = Yup.object({
            title: Yup.string().required("Title for your review is a required field"),
            reviewText: Yup.string().required("Your review is a required field")
        });

const MoreInfoReviewsComponent = ({product})=>{

    const userStore = useSelector((state)=>state.userStore);
    const dispatch = useDispatch();
    const params = useParams(); 

    const [reviewData,setReviewData] = useState({
            userID: userStore.user?._id,
            userName: userStore.user?.firstname,
            title: "",
            reviewText : ""
    })
    const [rating,setRating] = useState(0);
    const [ratingError,setRatingError] = useState(false);
    const [userReviewExists,setUserReviewExists] = useState(false);


    const modalReviewsRef = useRef(null);
    const modalWriteReviewRef = useRef(null);



    const navigate = useNavigate();
    const location = useLocation();



    const formik = useFormik({

        initialValues: reviewData,
        enableReinitialize: true,
        validationSchema: ReviewSchema,
        onSubmit: (values,{resetForm})=>{

               if(rating){
                let newValue = {...values,rating};
                dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
                submitReview(newValue,product._id)
               .then((res)=>{
                    modalWriteReviewRef.current.style.display = "none";
                    document.body.style.overflow = "auto";

                    if(res.status === 210){
                        toast.info(res.data);
                    }else{
                        toast.success(res.data);
                        navigate(`${location.pathname}`);
                    }               
                    
                    setUserReviewExists(true);
                    
               })
               .catch((err)=>{
                    if(err.response && (err.response.status === 409 || err.response.status === 401)){
                        toast.error(err.response.data);
                    }else{
                        toast.error("Problem while saving the review occured. Please try again.");
                    }
                    
               })
               .finally(()=>{
                dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                let resetValues = {
                    userID: userStore.user?._id,
                    userName: userStore.user?.firstname,
                    title: "",
                    reviewText : ""
                };
                resetForm({values: resetValues})
               })

               } 
               
            
        }
    })


    useEffect(()=>{
        
        if(userStore && product.reviews.length > 0){
            let userReview = null;
            userReview = product.reviews.find((review)=>{
                return review.userID === userStore.user?._id;
            })

            if(userReview){
                setUserReviewExists(true);
            }else{
                setUserReviewExists(false);
            }
        }else{
            setUserReviewExists(false);
        }
    },[userStore,product]);

    useEffect(()=>{
        setReviewData((prevState)=>{
            return({
                ...prevState,
                title: "",
                reviewText : ""
            })}
        )
    },[params])

    const handleMouseModalReviewsClick = ()=>{
        modalReviewsRef.current.style.display = "none";
        document.body.style.overflow = "auto";
    }

    const handleMouseModalWriteReviewClick = ()=>{
        modalWriteReviewRef.current.style.display = "none";
        document.body.style.overflow = "auto";
        setReviewData(
            {userID: userStore.user?._id,
            userName: userStore.user?.firstname,
            title: "",
            reviewText : ""})
        formik.touched.title = false;
        formik.touched.reviewText = false;
        setRatingError(false);
        
    }

    const handleMouseReviewsBtnClick = ()=>{
        modalReviewsRef.current.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    const handleMouseWriteReviewBtnClick = ()=>{

        if(userStore.user){
            modalWriteReviewRef.current.style.display = "block";
            document.body.style.overflow = "hidden";
        }else{
            navigate("/login");
        }
    }

    const reviewsList = ()=>{
        if(product.reviews.length){
            return product.reviews.map((review,index)=>{
                return(
                    <div className="modal-review-holder" key={index}>
                        <ReviewComponent review={review} />
                    </div>
                );
            })
        }
    }

    const preventModalClose = (e)=>{
        e.stopPropagation();
    }

    const handleSubmitBtnClick = ()=>{
        if(rating === 0){
            setRatingError(true);
        }

    }



    const renderForm = () =>{
        return(
            <form onSubmit={formik.handleSubmit}>
                <input 
                    type="hidden" 
                    id="userID" 
                    name="userID"
                    value={formik.values.userID}
                    onChange={formik.handleChange} />
                
                <input 
                    type="hidden" 
                    id="userName" 
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange} />

                <div className="input-review-holder">
                    <label htmlFor="title" className="form-label">Title for your review</label>

                    <input 
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formik.values.title}
                        onChange={formik.handleChange} />
                    

                    {
                        formik.touched.title && formik.errors.title ? <span>{formik.errors.title}</span> : null
                    }
                </div>

                <div className="input-review-holder">
                    <label htmlFor="reviewText" className="form-label">Your review</label>
                    <textarea
                        id="reviewText" 
                        name="reviewText"
                        className="form-control"
                        rows={3}
                        value={formik.values.reviewText}
                        onChange={formik.handleChange}></textarea>

{
                        formik.touched.reviewText && formik.errors.reviewText ? <span>{formik.errors.reviewText}</span> : null
                    }

                </div>

                <button type="submit" onClick={()=>handleSubmitBtnClick()}>Send</button>
                <button type="button" onClick={()=>handleMouseModalWriteReviewClick()}>Close</button>
            </form>
        );
    }

    return(
        <>
        
            {
                product.reviews.length > 0
                ?
                <div className="review-holder">
                    <ReviewComponent review={product.reviews[0]} />
                </div>

                :

                <p>No reviews for this product yet.</p>

            
            }

            {
                product.reviews.length > 1
                ?
                <>
                    <button type="button" className="show-reviews-btn" onClick={()=>handleMouseReviewsBtnClick()}>All reviews</button>
                    <ModalComponent ref={modalReviewsRef} specificClass="modal-all-reviews" handleMouseModalClick={handleMouseModalReviewsClick}>
                        <div className="modal-all-reviews-holder">
                            {reviewsList()}
                        </div>
                        
                    </ModalComponent>
                </>    
                :

                null

            
            }

            {
                userReviewExists 
                ? 
                <span className="review-info-span">You reviewed this product</span>
                :
                <>
                <button type="button" className="write-review-btn" onClick={()=>handleMouseWriteReviewBtnClick()}>Write a review</button>
                <ModalComponent  ref={modalWriteReviewRef} specificClass="modal-write-review" handleMouseModalClick={handleMouseModalWriteReviewClick}>
                    <div className="modal-form-holder" onClick={(e)=>preventModalClose(e)}>
                        <h4>Write your review</h4>
                        <article className="product-review-desc-article">
                            <h5>{product.title}</h5>
                            <p className="modal-form-par">{product.description}</p>
                        </article>
                        <section className="write-review-section">
                            <h5>Your review</h5>
                            <p className="modal-form-par">Rank</p>
                            <RankHoverComponent setProductRating={setRating} />
                            {ratingError ? <span className="rank-info-span">Rank is required</span> : null}
                            {renderForm()}
                        </section>
                        
                    </div>
                </ModalComponent>
                </>
            }


        </>
        
        
    );
}

export default MoreInfoReviewsComponent;