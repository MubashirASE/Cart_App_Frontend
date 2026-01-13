import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import Login from "../pages/user/Login.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import AllUserData from "../pages/admin/AllUserData.jsx";
import AdminDetails from "../pages/admin/AdminDetails.jsx";
import PaymentCart from "../pages/user/PaymentCart.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import VerifyPage from "../pages/user/VerfiyPage.jsx";
import AdminAddData from "../components/admin/CreateAdmin.jsx";
import AdminAllProduct from "../components/admin/AllProduct.jsx";
import AdminUpdateProduct from "../components/admin/UpdateProduct.jsx";
import AdminCreateProduct from "../components/admin/CreateProduct.jsx";
// import AdminMyProduct from "../pages/admin/MyProduct.jsx";
import AdminCategory from "../pages/admin/AdminCategory.jsx";
import ProfilePage from "../components/common/Profile.jsx";
import AboutPage from "../pages/user/About.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";
import CartList from "../pages/user/CartList.jsx";
import ContactPage from "../pages/user/Contact.jsx";
import Products from "../pages/user/Products.jsx";
import AdminProduct from "../pages/admin/AdminProduct.jsx";
import AdminOrder from "../pages/admin/AdminOrder.jsx";
import OrdersTracking from "../pages/user/OrderTracking.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    // <ProtectedRoute userOnly={true}>
                        <Home />
                    // </ProtectedRoute>
                ),
            },
            {
                path: "verify",
                element: <VerifyPage />,
            },
            {
                path: "cart",
                element: (
                    // <ProtectedRoute userOnly={true}>

                        <CartList />
                    // </ProtectedRoute>
                ),
            },
             {
                path: "orders",
                element: (
                    // <ProtectedRoute userOnly={true}>

                        <OrdersTracking />
                    // </ProtectedRoute>
                ),
            },
            {
                path: "payment-cart",
                element: (
                    // <ProtectedRoute userOnly={true}>
                        // {" "}
                        <PaymentCart />
                    // </ProtectedRoute>
                ),
            },

            {
                path: "products",
                element: (
                    // <ProtectedRoute userOnly={true}>
                        // {" "}
                        <Products />
                    // </ProtectedRoute>
                ),
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "contact",
                element:
                    (
                        <ProtectedRoute userOnly={true}>
                            {" "}
                            <ContactPage />
                        </ProtectedRoute>
                    ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        {" "}
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "about",
                element: (
                    <ProtectedRoute userOnly={true}>
                        {" "}
                        <AboutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "admin",
                element: (
                    <ProtectedRoute adminOnly={true}>
                        {" "}
                        <Dashboard />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "",
                        element: <AdminHome />,
                    },
                    {
                        path: "users",
                        element: <AllUserData />,
                    },
                    {
                        path: "details",
                        element: <AdminDetails />,
                    },
                    {
                        path: "adminCreated",
                        element: <AdminAddData />,
                    },
                    {
                        path: "adminAllProduct",
                        element: <AdminAllProduct />,
                    },
                    {
                        path: "adminUpdateProduct",
                        element: <AdminUpdateProduct />,
                    },
                    {
                        path: "adminCreateProduct",
                        element: <AdminCreateProduct />,
                    },
                    {
                        path: "products",
                        element: <AdminProduct/>,
                    },
                    {
                        path: "categories",
                        element: <AdminCategory />,
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                    {
                        path: "orders",
                        element: <AdminOrder/>,
                    },
                ],
            }
        ],
    },
]);

export default router;
