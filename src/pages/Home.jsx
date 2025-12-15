import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";
import AutoCarousel from "../components/ AutoCarousel.jsx";

const Home = () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setCartItems, fetchCartItems } = useCart();
  const [loading, setloading] = useState(false);
  const images = ["/home4.jpg", "/home5.jpg", "/home6.jpeg", "/home1.png"];
  const categoryData = [
    "/CellPhone.png",
    "/Computer.png",
    "/Gamepad.png",
    "/Headphone.png",
    "/CellPhone.png",
    "/Computer.png",
    "/Gamepad.png",
    "/Headphone.png",
  ];

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

      console.log(res.data);
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

  const displayedBestSellingProducts = showAllBestSelling ? data : data.slice(0, 4);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProduct = data.slice(startIndex, endIndex);

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

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 px-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <div className="col-span-1 space-y-5 list-none p-8">
              <li>Woman's Fashion</li>
              <li>Woman's Fashion</li>
              <li>Electronics</li>
              <li>Home & lifestyle</li>
              <li>Medicine</li>
              <li>Sport & Outdoor</li>
              <li>Babay & Toys</li>
              <li>Groceries & Pets</li>
              <li>Health & Beauty</li>
            </div>

            <div className="col-span-3 p-10 border-l-0 md:border-l md:border-gray-300 ">
              <AutoCarousel images={images} interval={5000} />
            </div>
          </div>
          <div className="space-y-5 px-5">
            <div className="flex space-x-5">
              <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
              <div className="text-blue-600 flex items-center font-bold">
                Today's
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-14 space-y-5">
                <div className="text-3xl font-semibold flex items-end h-20">
                  Flash Sales
                </div>
                <div className="flex space-x-2">
                  <div>
                    <div className="text-sm">Days</div>
                    <div className="text-2xl font-semibold">03</div>
                  </div>
                  <div className="text-blue-600 text-2xl">:</div>
                  <div>
                    <div className="text-sm">Hours</div>
                    <div className="text-2xl font-semibold">03</div>
                  </div>
                  <div className="text-blue-600 text-2xl">:</div>
                  <div>
                    <div className="text-sm">Minutes</div>
                    <div className="text-2xl font-semibold">30</div>
                  </div>
                  <div className="text-blue-600 text-2xl">:</div>
                  <div>
                    <div className="text-sm">Seconds</div>
                    <div className="text-2xl font-semibold">56</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2 sm:mt-0">
                <button
                  onClick={() => scrollFlashSales("left")}
                  className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center rotate-180 hover:bg-gray-300"
                >
                  <img src="/arrowRight.png" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollFlashSales("right")}
                  className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300"
                >
                  <img src="/arrowRight.png" className="w-5 h-5" />
                </button>
              </div>
            </div>
            {showAllFlashSales ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
                  >
                    <div className="relative group">
                      <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                        <img
                          src={`http://localhost:3001${ele.image}`}
                          sizes={20}
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
                            console.error("Failed to add to cart:", err);
                          }
                        }}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                        title="Add to Cart"
                      >
                        <FaShoppingCart size={20} />
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <h3
                        className="font-semibold text-lg text-gray-800 truncate mb-1"
                        title={ele.name}
                      >
                        {ele.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">
                        <span className="font-medium">Serial:</span>{" "}
                        {ele.serial_number}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Qty:</span>{" "}
                          {ele.quantity}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${ele.price}
                        </div>
                      </div>

                      {userData?.user?.role !== "user" && (
                        <button
                          className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                          onClick={() => updateProd(ele)}
                        >
                          Update Product
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={flashSalesScrollRef}
                className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide scrollbar-hide"
              >
                {data?.map((ele) => (
                  <div
                    key={ele._id}
                    className="w-[270px] min-w-[220px] bg-white rounded-xl shadow-sm 
             hover:shadow-md transition-shadow duration-300 
             overflow-hidden flex-shrink-0 flex flex-col"
                  >
                    <div className="relative group">
                      <div className="relative group w-full h-[250px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                        <img
                          src={`http://localhost:3001${ele.image}`}
                          alt={ele.name}
                          className="w-full h-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          const updatedCartItems = await Cart(ele._id);
                          setCartItems(updatedCartItems);
                          toast.success("Added to cart");
                        }}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                        title="Add to Cart"
                      >
                        <FaShoppingCart size={20} />
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <h3
                        className="font-semibold text-lg text-gray-800 truncate mb-1"
                        title={ele.name}
                      >
                        {ele.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">
                        <span className="font-medium">Serial:</span>{" "}
                        {ele.serial_number}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Qty:</span>{" "}
                          {ele.quantity}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${ele.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-full flex justify-center border-b border-gray-200 pb-11">
              {showAllFlashSales ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg text-white px-12"
                  onClick={() => setShowAllFlashSales(false)}
                >
                  Not Show All Products
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg text-white px-12"
                  onClick={() => setShowAllFlashSales(true)}
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 px-5">
            <div className="flex space-x-5">
              <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
              <div className="text-blue-600 flex items-center font-bold">
                Categories
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-14 space-y-5">
                <div className="text-3xl font-semibold flex items-end h-20">
                  Browse By Category
                </div>
              </div>

              <div className="flex gap-3 mt-2 sm:mt-0">
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
              </div>
            </div>

            <div
              ref={categoriesScrollRef}
              className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide border-b border-gray-200 pb-13"
            >
              {categoryData?.map((ele, i) => (
                <div
                  key={i}
                  className="min-w-[220px] bg-white rounded-xl shadow-sm transition-shadow duration-100 overflow-hidden flex-shrink-0 flex flex-col items-center justify-center group hover:bg-blue-500 cursor-pointer"
                >
                  <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5 flex items-center justify-center flex-col">
                    <img
                      src={ele}
                      alt={ele}
                      className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:filter group-hover:brightness-0 group-hover:invert"
                    />
                    <div className="text-center text-gray-800 font-medium mt-2 transition-colors duration-100 group-hover:text-white">
                      {ele.split("/")[1].replace(".png", "")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5 px-5">
            <div className="flex space-x-5">
              <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
              <div className="text-blue-600 flex items-center font-bold">
                This Month
              </div>
            </div>

            <div className="flex justify-between items-center w-full p-5">
              <div>
                <div className="text-3xl font-semibold">
                  Best Selling By Products
                </div>
              </div>

              <div>
                {showAllBestSelling ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg text-white"
                    onClick={() => setShowAllBestSelling(false)}
                  >
                    Not Show All Products
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg text-white"
                    onClick={() => setShowAllBestSelling(true)}
                  >
                    View All Products
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-15">
              {displayedBestSellingProducts?.map((ele) => (
                <div
                  key={ele._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
                >
                  <div className="relative group">
                    <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                      <img
                        src={`http://localhost:3001${ele.image}`}
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
                          console.error("Failed to add to cart:", err);
                        }
                      }}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                      title="Add to Cart"
                    >
                      <FaShoppingCart size={20} />
                    </button>
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3
                      className="font-semibold text-lg text-gray-800 truncate mb-1"
                      title={ele.name}
                    >
                      {ele.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 truncate">
                      <span className="font-medium">Serial:</span>{" "}
                      {ele.serial_number}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Qty:</span> {ele.quantity}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ${ele.price}
                      </div>
                    </div>

                    {userData?.user?.role !== "user" && (
                      <button
                        className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => updateProd(ele)}
                      >
                        Update Product
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <img src="/home2.png" className="rounded-lg" />
            </div>
          </div>
          <div className="space-y-3 px-5">
            <div className="flex space-x-5">
              <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
              <div className="text-blue-600 flex items-center font-bold">
                Our Product's
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-5">
                <div className="text-3xl font-semibold flex items-end h-20">
                  Explore Our Products
                </div>
              </div>

              <div className="flex gap-3 mt-2 sm:mt-0">
                <button
                  onClick={handlePrev}
                  className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center rotate-180 hover:bg-gray-300"
                  disabled={currentPage === 0}
                >
                  <img src="/arrowRight.png" className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300"
                  disabled={currentPage === totalPages - 1}
                >
                  <img src="/arrowRight.png" className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProduct?.map((ele) => (
                <div
                  key={ele._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
                >
                  <div className="relative group">
                    <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                      <img
                        src={`http://localhost:3001${ele.image}`}
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
                          console.error("Failed to add to cart:", err);
                        }
                      }}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                      title="Add to Cart"
                    >
                      <FaShoppingCart size={20} />
                    </button>
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3
                      className="font-semibold text-lg text-gray-800 truncate mb-1"
                      title={ele.name}
                    >
                      {ele.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 truncate">
                      <span className="font-medium">Serial:</span>{" "}
                      {ele.serial_number}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Qty:</span> {ele.quantity}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ${ele.price}
                      </div>
                    </div>

                    {userData?.user?.role !== "user" && (
                      <button
                        className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => updateProd(ele)}
                      >
                        Update Product
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
            {showAllExploreProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
                  >
                    <div className="relative group">
                      <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                        <img
                          src={`http://localhost:3001${ele.image}`}
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
                            console.error("Failed to add to cart:", err);
                          }
                        }}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                        title="Add to Cart"
                      >
                        <FaShoppingCart size={20} />
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <h3
                        className="font-semibold text-lg text-gray-800 truncate mb-1"
                        title={ele.name}
                      >
                        {ele.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">
                        <span className="font-medium">Serial:</span>{" "}
                        {ele.serial_number}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Qty:</span>{" "}
                          {ele.quantity}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${ele.price}
                        </div>
                      </div>

                      {userData?.user?.role !== "user" && (
                        <button
                          className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                          onClick={() => updateProd(ele)}
                        >
                          Update Product
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProduct?.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
                  >
                    <div className="relative group">
                      <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                        <img
                          src={`http://localhost:3001${ele.image}`}
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
                            console.error("Failed to add to cart:", err);
                          }
                        }}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                        title="Add to Cart"
                      >
                        <FaShoppingCart size={20} />
                      </button>
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <h3
                        className="font-semibold text-lg text-gray-800 truncate mb-1"
                        title={ele.name}
                      >
                        {ele.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">
                        <span className="font-medium">Serial:</span>{" "}
                        {ele.serial_number}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Qty:</span>{" "}
                          {ele.quantity}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${ele.price}
                        </div>
                      </div>

                      {userData?.user?.role !== "user" && (
                        <button
                          className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                          onClick={() => updateProd(ele)}
                        >
                          Update Product
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="w-full flex justify-center border-b border-gray-200 pb-11">
              {showAllExploreProducts ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg text-white px-12"
                  onClick={() => setShowAllExploreProducts(false)}
                >
                  Not Show All Products
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 py-4 rounded-lg text-white px-12"
                  onClick={() => setShowAllExploreProducts(true)}
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((ele) => (
              <div
                key={ele._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col m-15 lg:m-0 md:m-0 sm:m-0"
              >
                <div className="relative group">
                  <div className="relative group w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5">
                    <img
                      src={`http://localhost:3001${ele.image}`}
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
                        console.error("Failed to add to cart:", err);
                      }
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
                    title="Add to Cart"
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h3
                    className="font-semibold text-lg text-gray-800 truncate mb-1"
                    title={ele.name}
                  >
                    {ele.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 truncate">
                    <span className="font-medium">Serial:</span>{" "}
                    {ele.serial_number}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Qty:</span> {ele.quantity}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      ${ele.price}
                    </div>
                  </div>

                  {userData?.user?.role !== "user" && (
                    <button
                      className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                      onClick={() => updateProd(ele)}
                    >
                      Update Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div> */}
          <div className="space-y-5 px-5">
            <div className="flex space-x-5">
              <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
              <div className="text-blue-600 flex items-center font-bold">
                Featured
              </div>
            </div>

            <div className="flex justify-between items-center w-full p-5">
              <div>
                <div className="text-3xl font-semibold">New Arival</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 flex flex-row ">
              <div className="bg-black flex items-end justify-center"><img src="bg3.png"/></div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 flex flex-col gap-6">
                <div  className="bg-black flex items-end justify-center" ><img src="home1.png"/></div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 flex">
                  <div  className="bg-black flex items-end justify-center"><img src="bg.png"/></div>
                  <div  className="bg-black flex items-end justify-center"><img src="bg1.png"/></div>
              </div>
                </div>
                  </div>
                  </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 space-y-2 flex justify-center align-center h-full w-full ">
            <div className="flex justify-center items-center flex-col p-20 ">
              <img src="/Services.png" className="w-20" />
              <h5 className="font-bold pt-5">Fest Delivery</h5>
              <h5>we deliver within 5 days</h5>
            </div>
            <div className="flex justify-center items-center flex-col p-20 ">
              <img src="/Services1.png" className="w-20" />
              <h2 className="font-bold pt-5">24/7 CUSTOMER SERVICE</h2>
              <h5>we provide 24/7 customer service</h5>
            </div>
            <div className=" flex justify-center items-center flex-col p-20">
              <img src="/Services2.png" className="w-20" />
              <h2 className="font-bold pt-5">MENOY BACK GUARANTEE</h2>
              <h5>we return money with in 30 days</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
