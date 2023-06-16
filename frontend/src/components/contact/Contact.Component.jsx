import { Link } from "react-router-dom";
import {HiOutlinePhone} from "react-icons/hi2";
import {BsEnvelope} from "react-icons/bs";
import ContactFormComponent from "./components/ContactForm.Component";

const ContactComponent = ()=>{
    return(
        <section className="contact-section">
            <div className="container">
                <div className="row row-title">
                    <div className="col-12">
                        <h2>Contact</h2>
                    </div>
                </div>
                <div className="row align-items-stretch justify-content-xl-around">
                <div className="col-md-4 col-xl-4 col-contact-info">
                        <div className="contact-info-holder">
                            <h3>Call center</h3>
                            <address>
                                <div className="phone-holder">
                                    <HiOutlinePhone />
                                    <p>(+39) 101 1010</p>
                                </div>
                                <div className="email-holder">
                                    <BsEnvelope />
                                    <Link to="mailto:shopvenicefashion@gmail.com">shop<wbr/>venice<wbr/>fashion<wbr/>@gmail.com</Link>
                                </div>
                            </address>
                            <div className="working-hours-holder">
                                <h4>Call center working hours</h4>
                                <p>Monday to Friday 8.00 - 20.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-xl-7">
                        <div className="contact-form-holder">
                            <h3>Send us a message</h3>
                            <ContactFormComponent />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactComponent;