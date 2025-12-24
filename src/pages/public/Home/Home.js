import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../../../api/api";

export const useHomeData = () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setCartItems, fetchCartItems } = useCart();
  const [loading, setloading] = useState(false);
  const images = ["/home4.jpg", "/home5.jpg", "/home6.jpeg", "/home1.png"];
  const [categories, setCategories] = useState([]);

  const flashSalesScrollRef = useRef(null);
  const categoriesScrollRef = useRef(null);

  const [showAllFlashSales, setShowAllFlashSales] = useState(false);
  const [showAllBestSelling, setShowAllBestSelling] = useState(false);
  const [showAllExploreProducts, setShowAllExploreProducts] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API_URL.get("/products/");
      let data = res.data;
      data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);

  const Cart = async (productId) => {
    try {
      const res = await API_URL.post(`/cart/add/${productId}`);
      toast.success(res.data.message, {
        style: {
          color: "#306dfd",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
      return res.data.cart.items;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateProd = (ele) => {
    navigate("/updateProduct", { state: ele });
  };

  useEffect(() => {
    setloading(true);
    if (data?.length > 0) {
      setloading(false);
    }
  }, [data]);

  const scrollFlashSales = (direction) => {
    if (flashSalesScrollRef.current) {
      flashSalesScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      categoriesScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchCategories = async () => {
    setloading(true);
    try {
      const data = await API_URL.get("/category/user/all");
      setCategories(
        Array.isArray(data.data.categories) ? data.data.categories : []
      );
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (ele) => {
    navigate(`/categoryProducts/${ele._id}`, { state: ele });
  };

  return {
    userData,
    data,
    loading,
    images,
    categories,
    flashSalesScrollRef,
    categoriesScrollRef,
    showAllFlashSales,
    setShowAllFlashSales,
    showAllBestSelling,
    setShowAllBestSelling,
    showAllExploreProducts,
    setShowAllExploreProducts,
    Cart,
    setCartItems,
    updateProd,
    scrollFlashSales,
    scrollCategories,
    currentPage,
    itemsPerPage,
    totalPages,
    handleNext,
    handlePrev,
    handleCategoryClick,
  };
};
