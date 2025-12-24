import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/public/Home/home.jsx";
import CartList from "./pages/user/CartList.jsx";
import SignUp from "./pages/public/SignUp.jsx";
import Login from "./pages/public/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminHome from "./pages/admin/adminHome.jsx";
import AllUserData from "./pages/admin/users/AllUserData.jsx";
import AdminDetails from "./pages/admin/AdminDetails.jsx";
import UsePaymentCart from "./pages/user/UsePaymentCart.jsx";
import ProtectedRoute from "./components/common/ProtectedRoutes.jsx";
import VerifyPage from "./pages/user/VerfiyPage.jsx";
import VerifySuccess from "./pages/user/verfiySuccess.jsx";
import AdminAddData from "./pages/admin/CreateAdmin.jsx";
import AdminAllProduct from "./pages/admin/products/AllProduct.jsx";
import AdminUpdateProduct from "./pages/admin/products/UpdateProduct.jsx";
import AdminCreateProduct from "./pages/admin/products/CreateProduct.jsx";
import AdminMyProduct from "./pages/admin/products/MyProduct.jsx";
import AdminCategory from "./pages/admin/categories/AdminCategory.jsx";
import ContactPage from "./pages/public/Contact.jsx";
import ProfilePage from "./components/common/Profile.jsx";
import AboutPage from "./pages/public/About.jsx";
import CategoryWiseProduct from "./pages/public/categoryWiseProduct.jsx";
import MainLayout from "./layout/mainlayout.jsx";
function App() {
  const appRouter = createBrowserRouter([
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
          path: "categoryProducts/:id",
          element: (
            <ProtectedRoute userOnly={true}>
              {" "}
              <CategoryWiseProduct />
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

  return <RouterProvider router={appRouter} />;
}

export default App;
