import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import Login from "../pages/user/Login.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import AllUserData from "../pages/admin/AllUserData.jsx";
import AdminDetails from "../pages/admin/AdminDetails.jsx";
import UsePaymentCart from "../pages/user/UsePaymentCart.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import VerifyPage from "../pages/user/VerfiyPage.jsx";
import AdminAddData from "../pages/admin/CreateAdmin.jsx";
import AdminAllProduct from "../pages/admin/products/AllProduct.jsx";
import AdminUpdateProduct from "../pages/admin/products/UpdateProduct.jsx";
import AdminCreateProduct from "../pages/admin/products/CreateProduct.jsx";
import AdminMyProduct from "../pages/admin/products/MyProduct.jsx";
import AdminCategory from "../pages/admin/AdminCategory.jsx";
import ProfilePage from "../components/common/Profile.jsx";
import AboutPage from "../pages/user/About.jsx";
import MainLayout from "../components/layout/MainLayout.jsx";
import CartList from "../pages/user/CartList.jsx";
import ContactPage from "../pages/user/Contact.jsx";
import Products from "../pages/user/Products.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute userOnly={true}>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "verify",
                element: <VerifyPage />,
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute userOnly={true}>
                        {" "}
                        <CartList />
                    </ProtectedRoute>
                ),
            },
            {
                path: "usePaymentCart",
                element: (
                    <ProtectedRoute userOnly={true}>
                        {" "}
                        <UsePaymentCart />
                    </ProtectedRoute>
                ),
            },
            
            {
                path: "products",
                element: (
                    <ProtectedRoute userOnly={true}>
                        {" "}
                        <Products />
                    </ProtectedRoute>
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
                element: <ContactPage />,
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
                        path: "adminUser",
                        element: <AllUserData />,
                    },
                    {
                        path: "adminDetails",
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
                        path: "adminMyProduct",
                        element: <AdminMyProduct />,
                    },
                    {
                        path: "adminCategory",
                        element: <AdminCategory />,
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                ],
            }
        ],
    },
]);

export default router;
