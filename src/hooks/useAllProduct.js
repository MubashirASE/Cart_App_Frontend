import { useEffect, useState } from "react";
import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";

const useAllProduct = () => {
 const { userData } = useCart();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API_URL.get("/products/");
      console.log(userData?.user.id)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    loading,
    setloading,
    data
  };
};

export default useAllProduct;
