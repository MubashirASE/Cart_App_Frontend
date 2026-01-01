import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";
import { useNavigate } from "react-router-dom";

const useCategoryWiseProducts = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const {  fetchCartItems} = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let currentCategory = data;
      if (!currentCategory) {
        try {
          const resCat = await API_URL.get(`/category/${id}`);
          currentCategory = resCat.data.category;
          console.log(currentCategory);
        } catch (catErr) {
          console.error("Error fetching category details:", catErr);
        }
      }

      const resChildren = await API_URL.get(`/category/children/${id}`);
      const children = resChildren.data.children || [];

      if (children.length === 0) {
        if (currentCategory) {
          setCategories([currentCategory]);
        } else {
          setCategories([]);
        }

        const resProducts = await API_URL.get(`/products/category/${id}`);
        const categoryProducts = resProducts.data.products || [];
        categoryProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(categoryProducts);
      } else {
        setCategories(children);
        const allProducts = [];
        for (let cat of children) {
          try {
            const resProducts = await API_URL.get(
              `/products/category/${cat._id}`
            );
            allProducts.push(...(resProducts.data.products || []));
          } catch (prodErr) {
            console.error(
              `Error fetching products for category ${cat._id}:`,
              prodErr
            );
          }
        }

        setProducts(allProducts);
      }
    } catch (err) {
      console.error("Error fetching category products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);
  const fetchCategories = async () => {
    try {
      const data = await API_URL.get("/category/user/all");
      console.log(data.data.categories);
      setAllCategory(
        Array.isArray(data.data.categories) ? data.data.categories : []
      );
      console.log("categories", categories);
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
      const res = await API_URL.post(`/cart/add/${productId}`);
      console.log("res", res.data.cart.items);
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

  const updateProd = (ele) => {
    navigate("/updateProduct", { state: ele });
  };
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
      const res = await API_URL.get(`/products/category/${id}`);
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
    console.log("order", order);
    setSortOrder(order);
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


const removeAllCategory = () => {
  setSelectedCategories([]);
  setSortOrder("");
  navigate("/products");
};

  return {
    loading,
    products: sortedProducts,
    categories,
    allCategory,
    selectedCategories,
    sortOrder,
    sortedProducts,
    setSortOrder,
    sortByOrder,
    handleCategorySelect,
    flatCategories,
    Cart,
    refetch,
    setProducts,
    updateProd,
    removeCategory,
    removeAllCategory,
    
  };
};

export default useCategoryWiseProducts;
