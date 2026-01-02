import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, filterProducts, addProductToCart } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import {
  buildHierarchy,
  flattenHierarchy,
  getAllChildCategoryIds,
} from "../../utils/categoryHelpers";
import { useCart } from "../../contextData/useCart";
import ProductsLayout from "../../components/layout/ProductsLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const { fetchCartItems } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = decodeURIComponent(searchParams.get("category") || "");

  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  useEffect(() => {
    if (categoryName && allCategory.length > 0) {
      const category = allCategory.find(
        (cat) => cat.slug?.toLowerCase() === categoryName.toLowerCase()
      );
      if (category) {
        const childIds = getAllChildCategoryIds(category._id, allCategory);
        const initialSelection = [category._id, ...childIds];
        setSelectedCategories(initialSelection);
        setTempSelectedCategories(initialSelection);
      } else {
        setSelectedCategories([]);
        setTempSelectedCategories([]);
      }
    } else if (!categoryName) {
      setSelectedCategories([]);
      setTempSelectedCategories([]);
    }
  }, [categoryName, allCategory]);

  const fetchProductsData = async (categoriesToFetch = selectedCategories) => {
    try {
      setLoading(true);
      let data = [];
      if (categoriesToFetch && categoriesToFetch.length > 0) {
        const res = await filterProducts(categoriesToFetch);
        data = res.products || [];
      } else {
        const res = await getProducts();
        data = res.products || res;
      }
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allCategory.length === 0) return;
    fetchProductsData();
  }, [selectedCategories]);

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setAllCategory(Array.isArray(categories) ? categories : []);
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
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

  const hierarchy = buildHierarchy(allCategory);
  const flatCategories = flattenHierarchy(hierarchy);

  const handleCategorySelect = (categoryId) => {
    const childIds = getAllChildCategoryIds(categoryId, allCategory);
    const isSelected = tempSelectedCategories.includes(categoryId);
    if (isSelected) {
      setTempSelectedCategories((prev) =>
        prev.filter((id) => id !== categoryId && !childIds.includes(id))
      );
    } else {
      setTempSelectedCategories((prev) => [...prev, categoryId, ...childIds]);
    }
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
  };

  const sortedProducts = useMemo(() => {
    const items = [...products];
    if (sortOrder === "LowToHigh") {
      return items.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "highToLow") {
      return items.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return items;
  }, [products, sortOrder]);

  const sortByOrder = (order) => {
    setSortOrder(order);
  };

  const removeAllCategory = () => {
    setSelectedCategories([]);
    setTempSelectedCategories([]);
    setSortOrder("");
    setSearchParams({});
  };

  const removeCategory = (categoryId) => {
    const childIds = getAllChildCategoryIds(categoryId, allCategory);
    const idsToRemove = [categoryId, ...childIds];

    let newSelected = selectedCategories.filter(
      (id) => !idsToRemove.includes(id)
    );

    const cleanupParent = (catId, currentSelected) => {
      const cat = allCategory.find((c) => c._id === catId);
      if (!cat || !cat.parent) return currentSelected;

      const parentId = cat.parent._id || cat.parent;
      if (!currentSelected.includes(parentId)) return currentSelected;

      const otherChildren = allCategory.filter(
        (c) => (c.parent?._id || c.parent) === parentId && c._id !== catId
      );
      const hasSelectedChildren = otherChildren.some((c) =>
        currentSelected.includes(c._id)
      );

      if (!hasSelectedChildren) {
        const updatedSelected = currentSelected.filter((id) => id !== parentId);
        return cleanupParent(parentId, updatedSelected);
      }
      return currentSelected;
    };

    newSelected = cleanupParent(categoryId, newSelected);

    setSelectedCategories(newSelected);
    setTempSelectedCategories(newSelected);

    if (newSelected.length === 0) {
      setSearchParams({});
    }
  };

  return (
    <ProductsLayout
      products={sortedProducts}
      loading={loading}
      loadingText="Loading Products..."
      allCategory={allCategory}
      selectedCategories={selectedCategories}
      tempSelectedCategories={tempSelectedCategories}
      sortOrder={sortOrder}
      handleCategorySelect={handleCategorySelect}
      flatCategories={flatCategories}
      refetch={applyFilters}
      sortByOrder={sortByOrder}
      removeCategory={removeCategory}
      removeAllCategory={removeAllCategory}
      Cart={Cart}
    />
  );
};

export default Products;

