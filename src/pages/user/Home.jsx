import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contextData/useCart";
import { toast } from "react-toastify";
import { getProducts, addProductToCart } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import Loader from "../../components/common/Loader.jsx";
import HeroSection from "../../components/Home/HeroSection.jsx";
import FlashSalesSection from "../../components/Home/FlashSaleSection.jsx";
import CategoriesSection from "../../components/Home/CategorySection.jsx";
import ServicesSection from "../../components/Home/ServicesSection.jsx";
import BestSellingSection from "../../components/Home/BestSellingSection.jsx";
import ExploreProductsSection from "../../components/Home/ExploreProductsSection.jsx";
import FeaturedSection from "../../components/Home/FeaturedSection.jsx";

const HomeUI = () => {
  const { userData, fetchCartItems } = useCart();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const images = ["/home4.jpg", "/home5.jpg", "/home6.jpeg", "/home1.png"];
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      let sortedData = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sortedData);
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
      const resData = await addProductToCart(productId);
      toast.success(resData.message, {
        style: {
          color: "green",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
      fetchCartItems();
      return resData.cart.items;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  useEffect(() => {
    setloading(true);
    if (data?.length > 0) {
      setloading(false);
    }
  }, [data]);

  const fetchCategories = async () => {
    setloading(true);
    try {
      const categoriesData = await getAllCategories();
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
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
    navigate(`/products?category=${encodeURIComponent(ele.slug)}`, {
      state: ele,
    });
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 px-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" text="Loading products..." />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          <HeroSection
            categories={categories}
            images={images}
            handleCategoryClick={handleCategoryClick}
          />

          <FlashSalesSection data={data} Cart={Cart} userRole={userData?.user?.role} />

          <CategoriesSection
            categories={categories}
            handleCategoryClick={handleCategoryClick}
          />

          <BestSellingSection
            products={data}
            Cart={Cart}
            userRole={userData?.user?.role}
          />

          <ExploreProductsSection
            products={data}
            Cart={Cart}
            userRole={userData?.user?.role}
          />

          <FeaturedSection />
          <ServicesSection />
        </div>
      )}
    </div>
  );
};

export default HomeUI;
