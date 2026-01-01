import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const { fetchCartItems } = useCart();

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await API_URL.get("/products/");
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error("Error fetching all products:", error);
      toast.error("Failed to load all products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await API_URL.get("/category/user/all");
      setAllCategory(
        Array.isArray(data.data.categories) ? data.data.categories : []
      );
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  const Cart = async (productId) => {
    try {
      const res = await API_URL.post(`/cart/add/${productId}`);
      toast.success(res.data.message, {
        style: {
          color: "green",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
      fetchCartItems();
      return res.data.cart.items;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const buildHierarchy = (cats, parentId = null, level = 0) => {
    return cats
      .filter((cat) => (cat.parent?._id || null) === parentId)
      .map((cat) => ({
        ...cat,
        level,
        children: buildHierarchy(cats, cat._id, level + 1),
      }));
  };

  const flattenHierarchy = (hierarchy) => {
    const result = [];
    hierarchy.forEach((item) => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        result.push(...flattenHierarchy(item.children));
      }
    });
    return result;
  };

  const hierarchy = buildHierarchy(allCategory);
  const flatCategories = flattenHierarchy(hierarchy);

  const getAllChildCategoryIds = (categoryId, categories) => {
    const childIds = [];
    const findChildren = (id) => {
      const children = categories.filter(
        (cat) => (cat.parent?._id || null) === id
      );
      children.forEach((child) => {
        childIds.push(child._id);
        findChildren(child._id);
      });
    };

    findChildren(categoryId);
    return childIds;
  };

  const handleCategorySelect = (categoryId) => {
    const childIds = getAllChildCategoryIds(categoryId, allCategory);
    const isSelected = selectedCategories.includes(categoryId);
    if (isSelected) {
      setSelectedCategories((prev) =>
        prev.filter((id) => id !== categoryId && !childIds.includes(id))
      );
    } else {
      setSelectedCategories((prev) => [...prev, categoryId, ...childIds]);
    }
  };

  const fetchFilteredProducts = async ({ queryKey }) => {
    const [_key, selectedIds] = queryKey;
    if (!selectedIds || selectedIds.length === 0) {
      const res = await API_URL.get(`/products/`);
      return res.data.products;
    } else {
      const res = await API_URL.post(`/products/filter`, {
        categoryIds: selectedIds,
      });
      return res.data.products;
    }
  };

  const {
    refetch,
  } = useQuery({
    queryKey: ["filteredProducts", selectedCategories],
    queryFn: fetchFilteredProducts,
    enabled: false,
  });

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
  setSortOrder("");
fetchAllProducts();
};
  const removeCategory = (categoryId) => {
  const childIds = getAllChildCategoryIds(categoryId, allCategory);

  setSelectedCategories(prev =>
    prev.filter(
      id => id !== categoryId && !childIds.includes(id)
    )
  );

  setProducts(prev =>
    prev.filter(
      prod =>
        prod.category._id !== categoryId &&
        !childIds.includes(prod.category._id)
    )
  );
};

  return {
    loading,
    products: sortedProducts,
    setProducts,
    Cart,
    fetchAllProducts,
    allCategory,
    selectedCategories,
    sortOrder,
    sortedProducts,
    handleCategorySelect,
    flatCategories,
    refetch,
    sortByOrder,
    removeCategory,
    removeAllCategory
  };
};

export default useProducts;
