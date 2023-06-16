import HeaderComponent from "./components/header/Header.Component";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BrandSliderComponent from "./components/brandSlider/BrandSlider.Component";
import NewsletterComponent from "./components/newsletter/Newsletter.Component";
import FooterComponent from "./components/footer/Footer.Component";
import { useDispatch, useSelector } from "react-redux";
import { saveUser,removeUser } from "./redux/user.slicer";
import ButtonToTopComponent from "./components/buttonToTop/ButtonToTop.Component";
import { checkTokenValidity} from "./services/auth.service";
import {setComparedProductsFromLocalStorage} from "./redux/comparison.slicer";
import LoaderComponent from "./components/loader/Loader.Component";
import { resetOrder, setOrderFromLocalStorage } from "./redux/order.slicer";


axios.defaults.baseURL = "https://venicefashionshop-api.onrender.com/api";
axios.interceptors.request.use((config)=>{
  if(localStorage.hasOwnProperty("vf_token")){
    config.headers.Authorization = localStorage.getItem("vf_token");
  }
  return config;
})

function App() {

  const loaderStore = useSelector((state)=>state.loaderStore);
  const pathname = useLocation();
  const dispatch = useDispatch();


  useEffect(()=>{

    let productsCompared = localStorage.getItem("vf_products_compared");
    let order = localStorage.getItem("vf_order");

    if(productsCompared){
      dispatch(setComparedProductsFromLocalStorage(JSON.parse(productsCompared)));
    }

   /* Commented code is used for stripe

   if(order){
      dispatch(setOrderFromLocalStorage(JSON.parse(order)));
    }*/

    if(order){
      dispatch(setOrderFromLocalStorage(JSON.parse(order).order));
    }

    checkTokenValidity()
      .then((res)=>{
        let userData = localStorage.getItem("vf_user");
        let token = localStorage.getItem("vf_token");
        if(userData && token){
          dispatch(saveUser(JSON.parse(userData)));
        }
      })
      .catch((err)=>{
        dispatch(removeUser());
      })

  },[dispatch])

  useEffect(()=>{
    window.scrollTo(0,0);

    /*Commented code is used for stripe
    
    if(!pathname.pathname.includes("customer-order")){
      localStorage.removeItem("vf_order_restore");
    }*/

    if(!pathname.pathname.includes("checkout") && !pathname.pathname.includes("customer-order")){
      dispatch(resetOrder());
  }
  },[pathname.pathname])

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <main>
        <Outlet/>
      </main>
      <ButtonToTopComponent />
      <BrandSliderComponent />
      <NewsletterComponent />
      <LoaderComponent showFirstCriterium={loaderStore.showFirstCriterium} showSecondCriterium={loaderStore.showSecondCriterium} />     
      <FooterComponent />
    </>
   
  );
}

export default App;
