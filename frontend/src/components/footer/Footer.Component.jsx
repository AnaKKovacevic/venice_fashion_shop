import FooterSectionComponent from "./components/FooterSection.Component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AiOutlineCopyright} from "react-icons/ai";
import {HiOutlineMapPin,HiOutlinePhone} from "react-icons/hi2";
import {BsEnvelope} from "react-icons/bs";
import CreditCardComponent from "./components/CreditCard.Component";
import american_express from "../../assets/imgs/american_express.svg";
import discover from "../../assets/imgs/discover.svg";
import jcb from "../../assets/imgs/jcb.svg";
import mastercard from "../../assets/imgs/mastercard.svg";
import paypal from "../../assets/imgs/paypal.svg";
import visa from "../../assets/imgs/visa.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/user.slicer";


const FooterComponent = ()=>{

    const userStore = useSelector((state)=>state.userStore);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const handleClick = ()=>{
        dispatch(removeUser());
        if(location.pathname.includes("wishlist") || location.pathname.includes("order")){
            navigate("/");
        }
    }

    const showRegBtns = ()=>{
        if(userStore.user.isAdmin){
            return(
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button type="button" className="log-out-btn" onClick={()=>handleClick()}>
                        Log out
                    </button>
                </>
            );
        }else{
            return(
                <button type="button" className="log-out-btn" onClick={()=>handleClick()}>
                    Log out
                </button>
            )
        }
    }

    return(
        <footer>
            <section className="footer-links-sections-holder">
                <div className="container">
                    <div className="row gy-3 justify-content-md-between justify-content-xl-evenly gx-md-5">
                        <FooterSectionComponent titleFooter="Registration" id="registration">
                            {
                                userStore.user
                                ?
                                showRegBtns()
                                :
                                <>
                                    <Link to="/login">Already registered? Log in now</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            }

                        </FooterSectionComponent>
                        <FooterSectionComponent titleFooter="User Account" id="user-account">
                            <Link to="/user/order">My orders</Link>
                            <Link to="/user/wishlist">My wishlist</Link>
                        </FooterSectionComponent>
                        <FooterSectionComponent titleFooter="Contact" id="contact">
                            <address>
                                <div className="adress-holder">
                                    <HiOutlineMapPin />
                                    <p>Venice, Italy</p>
                                </div>
                                <div className="phone-holder">
                                    <HiOutlinePhone />
                                    <p>(+39) 101 1010</p>
                                </div>
                                <div className="email-holder">
                                    <BsEnvelope />
                                    <Link to="mailto:shopvenicefashion@gmail.com">shop<wbr/>venice<wbr/>fashion<wbr/>@gmail.com</Link>
                                </div>
                                
                            </address>
                        </FooterSectionComponent>
                    </div>
                </div>
            </section>

            <section className="footer-cards-holder">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-cards d-flex justify-content-center flex-wrap">
                                <CreditCardComponent card={american_express} />
                                <CreditCardComponent card={discover} />
                                <CreditCardComponent card={jcb} />
                                <CreditCardComponent card={mastercard} />
                                <CreditCardComponent card={paypal} />
                                <CreditCardComponent card={visa} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <small>Copyright <AiOutlineCopyright /> 2023 Venice Fashion. All rights reserved. Developed by Venice Fashion </small>
                        </div>
                        
                    </div>
                </div>
            </section>
        </footer>
    )
} 

export default FooterComponent;