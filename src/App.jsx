import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/mainlayout.jsx";
import Home from "./pages/Home.jsx";
import CartList from "./pages/CartList.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,   
      children: [
        {
          path: "/",            
          element: <Home />
        },
        {
          path: "cart",       
          element: <CartList/>
        },{
          path: "createProduct",      
          element: <CreateProduct/>

        },{
          path: "updateProduct",      
          element: <UpdateProduct/>
        }
      ]
    }
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
