import { useDispatch, useSelector } from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import FormInputComponent from "../../UIkit/FormInput.Component";
import { getCartTotalPrice,subtractProductQuantity } from "../../services/product.service";
import { saveOrder } from "../../redux/order.slicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createOrder } from "../../services/order.service";
import {toast} from "react-toastify";
import { resetCart } from "../../redux/cart.slicer";
import { toggleLoader } from "../../redux/loader.slicer";

const CheckoutSchema = Yup.object({
    firstname: Yup.string().required("First name is a required field"),
    lastname: Yup.string().required("Last name is a required field"),
    email: Yup.string().email("Email must be a valid email").required("Your email is a required field"),
    phone: Yup.string().required("Phone is a required field"),
    address: Yup.string().required("Address is a required field"),
    city: Yup.string().required("City is a required field"),
    postCode: Yup.string().required("Post code is a required field")
})

const CheckoutComponent = ()=>{

    const cartStore = useSelector((state)=>state.cartStore);
    const userStore = useSelector((state)=>state.userStore);
    const currencyStore = useSelector((state)=>state.currencyStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        document.body.style.overflow = "auto";
    },[])

    const formik = useFormik({
        initialValues: {
            firstname: userStore.user?.firstname || "",
            lastname: userStore.user?.lastname || "",
            email: userStore.user?.email || "",
            phone: "",
            address: "",
            city: "",
            postCode: ""
        },
        validationSchema: CheckoutSchema,
        onSubmit: (values)=>{

            //navigate("/payment");

            /*Route "/payment" and Payment component would be used when implementing Stripe for payment; 
            Because stripe test mode doesn't work when a project is live, the code
            for stripe is commented. The code below the comment, but inside onSubnmit function
            is used instead of navigate("/payment");
            */

            dispatch(toggleLoader({showFirstCriterium:true,showSecondCriterium:true}));
        
            let newCartArr = cartStore.products.map((el)=>{
                return(
                    {
                        productID: el.product._id,
                        price: el.product.price,
                        discountPercentage: el.product.discountPercentage,
                        productQuantity: el.productQuantity
                    }
                );
            });
            
            createOrder({customer:values,currencyData:currencyStore,cart:newCartArr})
            .then((res)=>{
                dispatch(saveOrder(res.data[0]));
                dispatch(resetCart());

                subtractProductQuantity(newCartArr)
                    .then((res)=>{
                        console.log(res.data);
                    })
                    .catch((err)=>{
                        toast.warn("Something went wrong. It may happen that some information about stock aren't updated.");
                    })
                    .finally(()=>{
                        dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                        navigate("/customer-order");
                })
            })
            .catch((err)=>{
                dispatch(toggleLoader({showFirstCriterium:false,showSecondCriterium:false}));
                if(err.response.status === 408 || err.response.status === 409){
                    toast.error(err.response.data);
                }else{
                    toast.error("Something went wrong. Please contact our customer support.");
                }
                
            })
        
        
        }
    })

    const showForm = ()=>{
        return(
            <form onSubmit={formik.handleSubmit}>
                <FormInputComponent
                    formik={formik}
                    labelText="First Name"
                    inputName="firstname"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerFirstname" />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Last Name"
                    inputName="lastname"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerLastname" />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Email"
                    inputName="email"
                    inputType="email"
                    specificClass="input-checkout-holder"
                    inputId="customerEmail" />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Phone"
                    inputName="phone"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerPhone" />
                
                <FormInputComponent
                    formik={formik}
                    labelText="Address"
                    inputName="address"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerAddress" />

                <FormInputComponent
                    formik={formik}
                    labelText="City"
                    inputName="city"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerCity" />

                <FormInputComponent
                    formik={formik}
                    labelText="Post Code"
                    inputName="postCode"
                    inputType="text"
                    specificClass="input-checkout-holder"
                    inputId="customerPostCode" />


                <button type="submit">Send order</button>               
            </form>
        );
    }


    return(
        <section className="checkout-section">
            <div className="container">
                <div className="row justify-content-lg-between">                

                {
                cartStore.totalQuantity
                ?
                <>
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <div className="checkout-form-holder">
                            <h2>Checkout details</h2>
                            {showForm()}
                        </div>                           
                    </div>
                    <div className="col-lg-4">
                        <div className="row justify-content-center">
                            <div className="col order-details-col">
                                <div className="order-summary-holder">
                                    <h3>Order summary</h3>
                                    <div className="order-summary-items-holder d-flex justify-content-between align-items-end">
                                        <span>Total items:</span>
                                        <span>{cartStore.totalQuantity}</span>
                                    </div>
                                    <div className="order-summery-price-holder d-flex justify-content-between align-items-end">
                                        <span>Total price:</span>
                                        <span>{getCartTotalPrice(cartStore.totalPrice,currencyStore).finalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-4">
                            <div className="col order-info-col">
                                <div className="order-info-holder">
                                    <h3>How to order?</h3>
                                    <p>Order in three steps:</p>
                                    <ol>
                                        <li>Fill out the form</li>
                                        <li>Send order</li>
                                        <li>Pay for your order in currency you have chosen. 
                                            Venice Fashion bank account is XXXX-XXXX-XXXX-XXXX
                                        </li>
                                    </ol>
                                    <p>After sending your order, you will be sent an email with order information. 
                                        When you pay and the money is transffered to our bank account, you will get a
                                        confirmation email with your order delivery info. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="col">
                    <p className="no-products-par">There are no products in cart.</p>
                </div>
                }
                </div>
            </div>
        </section>
    );
}

export default CheckoutComponent;