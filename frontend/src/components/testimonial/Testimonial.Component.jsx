import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTestimonials } from "../../services/testimonial.service";
import OneTestimonialComponent from "./components/OneTestimonial.Component";
import { toggleStarterLoader } from "../../redux/loader.slicer";
const TestimonialComponent = ()=>{

    const [testimonials, setTestimonials] = useState([]);
    const [testimonialsErr, setTestimonialsErr] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        getTestimonials()
        .then((res)=>{
            setTestimonials(res.data);
        })
        .catch((err)=>{
            setTestimonialsErr("Something went wrong with loading CUSTOMERS' TESTIMONIALS. Please reload the page.");
        })
        .finally(()=>{
            dispatch(toggleStarterLoader({sectionName:"testimonial"}));
        })
    },[dispatch]);


    const testimonialsList = ()=>{
        if(testimonials.length){
            return(
                testimonials.map((testimonial,index)=>{
                    return(
                        <OneTestimonialComponent key={index} testimonial={testimonial} index={index} />
                    );
                })
            );
        }
    }

    return(
        <div className="testimonial-section">
            <div className="container">
                {
                    testimonialsErr
                    ?
                    <div className="row">
                        <div className="col-12 my-3"><p className="error-get-data-par">{testimonialsErr}</p></div>
                    </div>                       
                    :
                    <>
                        <div className="row">
                            <div className="col-12">
                                <h3>What they say about us</h3>
                            </div>
                        </div>
                        <div className="row align-items-sm-stretch gy-3">
                            {testimonialsList()}
                        </div>
                    </>                       
                }
            </div>
        </div>
    );
}

export default TestimonialComponent;