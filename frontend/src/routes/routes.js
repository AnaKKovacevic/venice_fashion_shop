import App from "../App";
import BlogPageComponent from "../pages/BlogPage.Component";
import CartPageComponent from "../pages/CartPageComponent";
import ComparisonPageComponent from "../pages/ComparisonPage.Component";
import HomePageComponent from "../pages/HomePage.Component";
import LoginPageComponent from "../pages/LoginPage.Component";
import ProductDetailsPageComponent from "../pages/ProductDetailsPage.Component";
import RegisterPageComponent from "../pages/RegisterPage.Component";
import ShopPageComponent from "../pages/ShopPage.Component";
import BlogFullPostPageComponent from "../pages/BlogFullPostPage.Component";
import AccountActivationPageComponent from "../pages/AccountActivationPage.Component";
import AuthGuardRegLogComponent from "../utils/AuthGuardRegLog.Component";
import ContactPageComponent from "../pages/ContactPage.Component";
import WishlistPageComponent from "../pages/WishlistPage.Component";
import ProductSearchPageComopnent from "../pages/ProductSearchPageComponent";
import CheckoutPageComponent from "../pages/CheckoutPage.Component";
import PaymentPageComponent from "../pages/PaymentPage.Component";
import CustomerOrderPageComponent from "../pages/CustomerOrderPage.Component";
import UsersOrdersPageComponent from "../pages/UserOrdersPage.Component";
import AuthGuardComponent from "../utils/AuthGuard.Component";
import UserOrderPageComponent from "../pages/UserOrderPage.Component";
import AdminGuardComponent from "../utils/AdminGuard.Component";
import AdminPageComponent from "../pages/admin/AdminPage.Component";
import AdminHomePageComponent from "../pages/admin/AdminHomePage.Component";
import AddProductPageComponent from "../pages/admin/AddProductPage.Component";
import UpdateProductPageComponent from "../pages/admin/UpdateProductPage.Component";
import EditProductPageComponent from "../pages/admin/EditProductPage.Component";
import AddCatPageComponent from "../pages/admin/AddCatPage.Component";
import UpdateCatPageComponent from "../pages/admin/UpdateCatPage.Component";
import EditCatPageComponent from "../pages/admin/EditCatPage.Component";
import AddBrandPageComponent from "../pages/admin/AddBrandPage.Component";
import UpdateBrandPageComponent from "../pages/admin/UpdateBrandPage.Component";
import EditBrandPageComponent from "../pages/admin/EditBrandPage.Component";
import AddBlogPostPageComponent from "../pages/admin/AddBlogPostPage.Component";
import UpdateBlogPageComponent from "../pages/admin/UpdateBlogPage.Component";
import EditBlogPageComponent from "../pages/admin/EditBlogPage.Component";
import UserPageComponent from "../pages/admin/UserPage.Component";
import SendNewsletterPageComponent from "../pages/admin/SendNewsletterPage.Component";
import SubscriberPageComponent from "../pages/admin/SubscriberPage.Component";
import OrdersPageComponent from "../pages/admin/OrdersPage.Component";
import OrderPageComponent from "../pages/admin/OrderPage.Component";


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePageComponent />
            },
            {
                path: "shop",
                element : <ShopPageComponent />
            },
            {
                path: "shop/search/:search",
                element: <ProductSearchPageComopnent />
            },
            {
                path: "shop/:gender/:category/:brand/:productId",
                element: <ProductDetailsPageComponent />
            },
            {
                path: "comparison",
                element: <ComparisonPageComponent />
            },
            {
                path: "login",
                element: (<AuthGuardRegLogComponent>
                            <LoginPageComponent />
                        </AuthGuardRegLogComponent>) 

            },
            {
                path: "register",
                element: (<AuthGuardRegLogComponent>
                            <RegisterPageComponent />
                        </AuthGuardRegLogComponent>) 
            },
            {
                path: "account-activation/:id",
                element: <AccountActivationPageComponent />
            },
            {
                path: "cart",
                element: <CartPageComponent />
            },
            {
                path: "checkout",
                element: <CheckoutPageComponent />
            },
            /*{
                path: "payment",
                element: <PaymentPageComponent />
            },*/
            {
                path: "customer-order",
                element: <CustomerOrderPageComponent />
            },
            {
                path: "blog",
                element: <BlogPageComponent />
            },
            {
                path: "blog/post/:id",
                element: <BlogFullPostPageComponent />
            },
            {
                path: "contact",
                element: <ContactPageComponent />
            },
            {
                path: "user/order",
                element: (<AuthGuardComponent>
                            <UsersOrdersPageComponent />
                        </AuthGuardComponent>)
            },
            {
                path: "user/order/:id",
                element: (<AuthGuardComponent>
                            <UserOrderPageComponent />
                         </AuthGuardComponent>)
            },
            {
                path: "user/wishlist",
                element: (<AuthGuardComponent>
                            <WishlistPageComponent />
                        </AuthGuardComponent>)
            }
        ]
    },
    {
        path: "/dashboard",
        element: <AdminGuardComponent>
                    <AdminPageComponent />
                </AdminGuardComponent>,
        children:[
            {
                path: "/dashboard",
                element: <AdminHomePageComponent />

            },
            {
                path: "/dashboard/product/create",
                element: <AddProductPageComponent />
            },
            {
                path: "/dashboard/product/update",
                element: <UpdateProductPageComponent />
            },
            {
                path: "/dashboard/product/update/:id",
                element: <EditProductPageComponent />
            },
            {
                path: "/dashboard/category/create",
                element: <AddCatPageComponent />
            },
            {
                path: "/dashboard/category/update",
                element: <UpdateCatPageComponent />
            },
            {
                path: "/dashboard/category/update/:id",
                element: <EditCatPageComponent />
            },
            {
                path: "/dashboard/brand/create",
                element: <AddBrandPageComponent />
            },
            {
                path: "/dashboard/brand/update",
                element: <UpdateBrandPageComponent />
            },
            {
                path: "/dashboard/brand/update/:id",
                element: <EditBrandPageComponent />
            },
            {
                path: "/dashboard/blog/create",
                element: <AddBlogPostPageComponent />
            },
            {
                path: "/dashboard/blog/update",
                element: <UpdateBlogPageComponent />
            },
            {
                path: "/dashboard/blog/update/:id",
                element: <EditBlogPageComponent />
            },
            {
                path: "/dashboard/subscriber/newsletter",
                element: <SendNewsletterPageComponent />
            },
            {
                path: "/dashboard/subscriber/unsubscribe",
                element: <SubscriberPageComponent />
            },
            {
                path: "/dashboard/user",
                element: <UserPageComponent />
            },
            {
                path: "/dashboard/order",
                element: <OrdersPageComponent />
            },
            {
                path: "/dashboard/order/:id",
                element: <OrderPageComponent />
            }
        ]
    }
];

export default routes;