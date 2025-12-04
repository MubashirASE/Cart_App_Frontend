import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";
const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setCartItems, fetchCartItems } = useCart();
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API_URL.get("/products/");
      const data = res.data;
      console.log(res.data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const Cart = async (productId,) => {
    console.log(productId);
    const res = await API_URL.post(`/cart/add/${productId}`);
    console.log("res", res.data.cart.items);

    toast.success(res.data.message, {
      style: {
        color: "#306dfd",
        fontWeight: "600",
        fontSize: "17px",
        background: "#F7F7F7",
      },
    });
    return res.data.cart.items;
  };



  const updateProd = (ele) => {
    navigate("/updateProduct", { state: ele });
  };
  useEffect(() => {
    setloading(true);
    if (data.length > 0) {
      setloading(false);
    }
  }, [data])
  return (

    <div className="products-container p-5">
      {loading ? <div className="spinner"></div>
        :

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((ele) => (
            <div
              key={ele._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
            >
              {/* Image & Cart */}
              <div className="relative">
                <img
                  src={`http://localhost:3001${ele.image}`}
                  alt={ele.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <FaShoppingCart
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 text-blue-500"
                  size={30}
                  onClick={async () => {
                    try {
                      const updatedCartItems = await Cart(ele._id);
                      setCartItems(updatedCartItems);
                      fetchCartItems();
                    } catch (err) {
                      console.error("Failed to add to cart:", err);
                    }
                  }}
                />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg truncate">{ele.name}</h3>

                <div className="flex justify-between mt-2 text-sm">
                  <p><b>Qty:</b> {ele.quantity}</p>
                  <p className="text-red-600 font-bold">$ {ele.price}</p>
                </div>

                {/* Update Button */}
                <button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                  onClick={() => updateProd(ele)}
                >
                  Update Product
                </button>
              </div>
            </div>
          ))}
        </div>}
    </div>

  );
};

export default Home;