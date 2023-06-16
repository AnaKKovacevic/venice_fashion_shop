const OneTestimonialComponent = ({testimonial, index})=>{
    return(
        <div className={`col-12 col-sm-6 col-md-4 ${index === 2 ? "offset-sm-3 offset-md-0" : null}`}>
            <article className="testimonial-article">
                <div className="testimonial-holder">
                    <div className="message">
                        <blockquote>
                            {testimonial.message}
                        </blockquote>
                        <div className="testimonial-img-holder">
                            <img src={testimonial.imgSrc} alt="Customer who said the words above about us" referrerPolicy="no-referrer" />
                        </div>
                    </div>
                    <p>{`${testimonial.name} ${testimonial.lastname}`}</p>
                    
                </div>
            </article>
        </div>
    );
}

export default OneTestimonialComponent;