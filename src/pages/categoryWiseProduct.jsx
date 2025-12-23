import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFilter, FaShoppingCart } from "react-icons/fa";
import API_URL from "../api/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contextData/CartContext";
import { MdFilterList, MdOutlineFilterAlt } from "react-icons/md";
import { BsFilter } from "react-icons/bs";
import { HiOutlineFilter } from "react-icons/hi";
import { RiFilter2Line } from "react-icons/ri";
import { BiSlider } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";

const CategoryWiseProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { Cart, setCartItems, userData } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "lowToHigh" | "highToLow"

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
    if (products.length <= 0) {
      fetchProducts();
    }
  }, [products]);

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
    data: filteredProducts,
    refetch,
    isLoading,
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
    console.log("categoryId", categoryId);
    console.log("selectedCategories", selectedCategories);
    setSelectedCategories((prev) =>
      prev.filter((id) => console.log("id>>>>>>>>>>>>", id), id !== categoryId)
    );

    setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod.category._id !== categoryId)
    );
    console.log("categories", categories);
    console.log("selectedCategories", selectedCategories);
    console.log("products", products);
  };
  const removeAllCategory = () => {
    setSelectedCategories([]);
    setProducts([]);
    fetchProducts();
  };
  return (
    <div className="space-y-15 p-10 px-15">
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-14 space-y-5">
        <div className="text-3xl font-semibold flex items-center  text-blue-600 bg-gray-100 w-full h-20 rounded-lg px-5">
          {data?.name}
        </div>
      </div> */}

      {loading ? (
        <div className="flex justify-center items-center h-64 px-5">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="space-y-4 px-5">
          <div className="flex justify-between items-center">
            <div
              className="text-2xl text-gray-500 flex gap-3"
              onClick={() => setIsSidebarOpen(true)}
            >
              <div className="pt-1">
                <BiSlider size={20} />
              </div>
              Filter
            </div>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/23 z-40"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <div
              className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 shadow-xl
                  transform transition-transform duration-300
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Category</h3>
                  {flatCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {category.level > 0 && (
                            <span
                              className="flex items-center text-sm font-medium text-gray-900"
                              style={{ marginLeft: `${category.level * 24}px` }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(
                                  category._id
                                )}
                                onChange={() =>
                                  handleCategorySelect(category._id)
                                }
                                className="mr-2"
                              />

                              <span className="ml-1">{category.name}</span>
                            </span>
                          )}
                          {category.level === 0 && (
                            <span className="flex items-center text-sm font-medium text-gray-900">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(
                                  category._id
                                )}
                                onChange={() =>
                                  handleCategorySelect(category._id)
                                }
                                className="mr-2"
                              />

                              {category.name}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                  onClick={async () => {
                    try {
                      const { data } = await refetch(); // fetch filtered products
                      setProducts(data); // update state to show in UI
                      setIsSidebarOpen(false); // close sidebar
                    } catch (err) {
                      toast.error("Failed to fetch filtered products");
                      console.error(err);
                    }
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>

            <div>
              <select
                value={sortOrder}
                onChange={(e) => sortByOrder(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
    border border-gray-300 text-gray-900 
    rounded-md focus:outline-none focus:ring-blue-500 
    focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select by price</option>
                <option value="LowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            {/* <div className="flex gap-3">
                  <button
                    onClick={() => scrollCategories("left")}
                    className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center rotate-180 hover:bg-gray-300"
                  >
                    <img src="/arrowRight.png" className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollCategories("right")}
                    className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300"
                  >
                    <img src="/arrowRight.png" className="w-5 h-5" />
                  </button>
                </div> */}
          </div>
          <div className="flex flex-wrap gap-3 ps-5 ">
            {products.map((cat, index) => {
              const alreadyShown =
                products.findIndex(
                  (p) => p.category._id === cat.category._id
                ) !== index;

              if (alreadyShown) return null;

              return (
                <div
                  className="border rounded-4xl p-2 border-gray-200 text-gray-500 space-x-2 flex"
                  key={cat.category._id}
                >
                  <div>Category: {cat.category.name}</div>
                  <button
                    className="px-2"
                    onClick={() => removeCategory(cat.category._id)}
                  >
                    x
                  </button>
                </div>
              );
            })}

            <button
              className="hover:underline"
              onClick={() => {
                removeAllCategory();
              }}
            >
              Remove All
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide border-b border-gray-200 pb-13 gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
            {sortedProducts.map((ele) => (
              <div
                key={ele._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
              >
                <div className="relative group w-[280px] h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg">
                  <div className="p-6">
                    <img
                      src={ele.image}
                      alt={ele.name}
                      className="w-full h-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const updatedCartItems = await Cart(ele._id);
                        setCartItems(updatedCartItems);
                        toast.success("Added to cart");
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    title="Add to Cart"
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {ele.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    <span className="font-medium">Serial:</span>{" "}
                    {ele.serial_number}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-2">
                    <span className="text-gray-600 text-sm">
                      Qty: {ele.quantity}
                    </span>
                    <span className="text-blue-600 font-bold">
                      ${ele.price}
                    </span>
                  </div>
                  {userData?.user?.role !== "user" && (
                    <button
                      className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
                      onClick={() => updateProd(ele)}
                    >
                      Update Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryWiseProduct;

// import React, { useEffect, useRef, useState } from "react";
// import { FaFilter, FaShoppingCart } from "react-icons/fa";
// import API_URL from "../api/api";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useCart } from "../contextData/CartContext";
// import { MdFilterList, MdOutlineFilterAlt } from "react-icons/md";
// import { BsFilter } from "react-icons/bs";
// import { HiOutlineFilter } from "react-icons/hi";
// import { RiFilter2Line } from "react-icons/ri";
// import { BiSlider } from "react-icons/bi";

// const CategoryWiseProduct = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const data = location.state;
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const { Cart, setCartItems, userData } = useCart();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [scrollRefs, setScrollRefs] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       let currentCategory = data;
//       if (!currentCategory) {
//         try {
//           const resCat = await API_URL.get(`/category/${id}`);
//           currentCategory = resCat.data.category;
//           console.log(currentCategory)
//         } catch (catErr) {
//           console.error("Error fetching category details:", catErr);
//         }
//       }

//       const resChildren = await API_URL.get(`/category/children/${id}`);
//       const children = resChildren.data.children || [];

//       if (children.length === 0) {
//         if (currentCategory) {
//           setCategories([currentCategory]);
//         } else {
//           setCategories([]);
//         }

//         const resProducts = await API_URL.get(`/products/category/${id}`);
//         const categoryProducts = resProducts.data.products || [];
//         categoryProducts.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setProducts(categoryProducts);
//       } else {
//         setCategories(children);
//         const allProducts = [];
//         for (let cat of children) {
//           try {
//             const resProducts = await API_URL.get(
//               `/products/category/${cat._id}`
//             );
//             allProducts.push(...(resProducts.data.products || []));
//           } catch (prodErr) {
//             console.error(
//               `Error fetching products for category ${cat._id}:`,
//               prodErr
//             );
//           }
//         }

//         allProducts.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setProducts(allProducts);
//       }
//     } catch (err) {
//       console.error("Error fetching category products:", err);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     console.log("nucbe", data);
//   }, [id]);

//   const updateProd = (ele) => {
//     navigate("/updateProduct", { state: ele });
//   };
//   useEffect(() => {
//     setScrollRefs(categories.map(() => React.createRef()));
//   }, [categories]);

//   return (
//     <div className="space-y-15 p-10 ">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-14 space-y-5 px-5">
//         <div className="text-3xl font-semibold flex items-center  text-blue-600 bg-gray-100 w-full h-20 px-4 rounded-lg ">
//           {data?.name}
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="spinner"></div>
//         </div>
//       ) : products.length <= 0 ? (
//         <div className="flex justify-center items-center text-red-500">
//           No categories found
//         </div>
//       ) : (
//         categories.map((category, i) => {
//           const scrollRef = scrollRefs[i];

//           const scrollCategories = (direction) => {
//             if (scrollRef.current) {
//               scrollRef.current.scrollBy({
//                 left: direction === "right" ? 300 : -300,
//                 behavior: "smooth",
//               });
//             }
//           };
//           const categoryProducts = products.filter(
//             (prod) => prod?.category?.name === category.name
//           );

//           if (categoryProducts.length === 0) return null;

//           return (
//             <div key={category._id} className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <div className="text-2xl text-gray-400 px-7 flex gap-3">
//                   <div className="pt-1">
//                     <BiSlider size={20} />
//                   </div>
//                   Filter
//                 </div>
//                 <div>
//                   <select
//                     value={parent}
//                     // onChange={(e) => setParent(e.target.value)}
//                     className="appearance-none relative block w-full px-3 py-2
//               border border-gray-300 text-gray-900
//               rounded-md focus:outline-none focus:ring-blue-500
//               focus:border-blue-500 sm:text-sm"
//                   >
//                     <option value="flex ">
//                       <div> select by price</div>
//                     </option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.parent ? `${cat.parent.name} → ` : ""}
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* <div className="flex gap-3">
//                   <button
//                     onClick={() => scrollCategories("left")}
//                     className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center rotate-180 hover:bg-gray-300"
//                   >
//                     <img src="/arrowRight.png" className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => scrollCategories("right")}
//                     className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300"
//                   >
//                     <img src="/arrowRight.png" className="w-5 h-5" />
//                   </button>
//                 </div> */}
//               </div>
//               <div className="flex gap-3 ps-5">
//                 {categories.map((cat, index) => (
//                   <div
//                     className="border rounded-4xl p-2 border-gray-200 text-gray-500 space-x-2 flex"
//                     key={index}
//                   >
//                     <div>categories : {cat.name}</div>
//                     <button className="px-2">x</button>
//                   </div>
//                 ))}
//                 <button className="hover:underline">Remove All</button>
//               </div>
//               <div
//                 ref={scrollRef}
//                 className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide border-b border-gray-200 pb-13 gap-5"
//               >
//                 {categoryProducts.map((ele) => (
//                   <div
//                     key={ele._id}
//                     className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
//                   >
//                     <div className="relative group w-[280px] h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg">
//                       <div className="p-6">
//                         <img
//                           src={ele.image}
//                           alt={ele.name}
//                           className="w-full h-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
//                         />
//                       </div>
//                       <button
//                         onClick={async (e) => {
//                           e.stopPropagation();
//                           try {
//                             const updatedCartItems = await Cart(ele._id);
//                             setCartItems(updatedCartItems);
//                             toast.success("Added to cart");
//                           } catch (err) {
//                             console.error(err);
//                           }
//                         }}
//                         className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
//                         title="Add to Cart"
//                       >
//                         <FaShoppingCart size={20} />
//                       </button>
//                     </div>

//                     <div className="p-4 flex flex-col flex-grow">
//                       <h3 className="font-semibold text-lg text-gray-800 truncate">
//                         {ele.name}
//                       </h3>
//                       <p className="text-sm text-gray-500 truncate">
//                         <span className="font-medium">Serial:</span>{" "}
//                         {ele.serial_number}
//                       </p>
//                       <div className="mt-auto flex justify-between items-center pt-2">
//                         <span className="text-gray-600 text-sm">
//                           Qty: {ele.quantity}
//                         </span>
//                         <span className="text-blue-600 font-bold">
//                           ${ele.price}
//                         </span>
//                       </div>
//                       {userData?.user?.role !== "user" && (
//                         <button
//                           className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
//                           onClick={() => updateProd(ele)}
//                         >
//                           Update Product
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default CategoryWiseProduct;
