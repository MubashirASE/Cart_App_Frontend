import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/mainlayout.jsx";
import Home from "./pages/Home.jsx";
import CartList from "./pages/CartList.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import AdminDetailPage from "./pages/adminDashboard.jsx";
import AdminHome from "./pages/adminHome.jsx";
import AdminUserData from "./pages/adminUser.jsx";
import AdminDetails from "./pages/adminDetails.jsx";
import UsePaymentCart from "./pages/UsePaymentCart.jsx";
import ProtectedRoute from "./pages/protectedRoutes.jsx";
import VerifySuccess from "./pages/VerfiyPage.jsx";
import VerifyPage from "./pages/VerfiyPage.jsx";
import AdminAddData from "./pages/adminAddData.jsx";
import AdminAllProduct from "./pages/adminAllProduct.jsx";
import AdminUpdateProduct from "./pages/adminUpdateProduct.jsx";
import AdminCreateProduct from "./pages/adminCreateProduct.jsx";
import AdminMyProduct from "./pages/adminMyProduct.jsx";
import ContantPage from "./pages/Contact.jsx";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,   
      children: [
        {
          path: "/",            
          element: <Home />
        }
        ,{
          path: "verify",
          element: <VerifyPage/>
        },
        {
          path: "cart",       
          element:(<ProtectedRoute> <CartList/></ProtectedRoute>)
        },{
          path: "usePaymentCart",      
          element:(<ProtectedRoute> <UsePaymentCart/></ProtectedRoute>)

        },{
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "contant",
          element: <ContantPage/>,
        }
        ,{
          path: "admin",
          element:(<ProtectedRoute> <AdminHome/></ProtectedRoute>),
            children: [
            {
              path: "",            
              element: <AdminDetailPage/>
            },{
              path: "adminUser",            
              element: <AdminUserData/>

            },{
              path: "adminDetails",            
              element: <AdminDetails/>

            },{
              path: "adminCreated",            
              element: <AdminAddData/>

            },{
              path: "adminAllProduct",            
              element: <AdminAllProduct/>

            },{
              path: "adminUpdateProduct",            
              element: <AdminUpdateProduct/>

            },{
              path: "adminCreateProduct",            
              element: <AdminCreateProduct/>

            },{
              path: "adminMyProduct",            
              element: <AdminMyProduct/>

            }       
          ]
        }
      ]
    },
    
        
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
