import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import CartList from "./pages/CartList.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import AdminDetailPage from "./pages/AdminDashboard.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminUserData from "./pages/AdminUser.jsx";
import AdminDetails from "./pages/AdminDetails.jsx";
import UsePaymentCart from "./pages/UsePaymentCart.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes.jsx";
import VerifySuccess from "./pages/VerfiyPage.jsx";
import VerifyPage from "./pages/VerfiyPage.jsx";
import AdminAddData from "./pages/AdminAddData.jsx";
import AdminAllProduct from "./pages/AdminAllProduct.jsx";
import AdminUpdateProduct from "./pages/AdminUpdateProduct.jsx";
import AdminCreateProduct from "./pages/AdminCreateProduct.jsx";
import AdminMyProduct from "./pages/AdminMyProduct.jsx";
import AdminCategory from "./pages/AdminCategory.jsx";
import ContantPage from "./pages/Contact.jsx";
import ProfilePage from "./pages/Profile.jsx";
import AboutPage from "./pages/About.jsx";
import CategoryWiseProduct from "./pages/CategoryWiseProduct.jsx";
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
              {" "}
              <Home />{" "}
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
          path: "contant",
          element: <ContantPage />,
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
              <AdminHome />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <AdminDetailPage />,
            },
            {
              path: "adminUser",
              element: <AdminUserData />,
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
