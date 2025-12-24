import React from "react";
import AutoCarousel from "../../../components/AutoCarousel.jsx";
import { useHomeData } from "./Home.js";
import SectionHeader from "../../../components/common/SectionHeader.jsx";
import ScrollButtons from "../../../components/common/ScrollButtons.jsx";
import ProductCard from "../../../components/common/ProductCard.jsx";
import ServiceItem from "../../../components/common/ServiceItem.jsx";
import Button from "../../../components/common/Button.jsx";
import Loader from "../../../components/common/Loader.jsx";

const HomeUI = () => {
  const {
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
  } = useHomeData();

  const displayedBestSellingProducts = showAllBestSelling
    ? data
    : data.slice(0, 4);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProduct = data.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 px-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" text="Loading products..." />
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <div className="col-span-1 space-y-5 list-none p-8">
              <div className="">
                {categories.map(
                  (ele) =>
                    ele.parent === null && (
                      <div
                        key={ele._id}
                        className="p-4 rounded-lg cursor-pointer hover:bg-blue-50 "
                        onClick={() => handleCategoryClick(ele)}
                      >
                        <span className="font-medium">{ele.name}</span>
                      </div>
                    )
                )}
              </div>
            </div>

            <div className="col-span-3 p-10 border-l-0 md:border-l md:border-gray-300 ">
              <AutoCarousel images={images} interval={5000} />
            </div>
          </div>

          {/* Flash Sales Section */}
          <div className="space-y-5 px-5">
            <SectionHeader title="Today's" />

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

              <ScrollButtons
                onLeftClick={() => scrollFlashSales("left")}
                onRightClick={() => scrollFlashSales("right")}
              />
            </div>

            {showAllFlashSales ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((ele) => (
                  <ProductCard
                    key={ele._id}
                    product={ele}
                    onAddToCart={Cart}
                    onUpdate={updateProd}
                    userRole={userData?.user?.role}
                  />
                ))}
              </div>
            ) : (
              <div
                ref={flashSalesScrollRef}
                className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide"
              >
                {data?.map((ele) => (
                  <ProductCard
                    key={ele._id}
                    product={ele}
                    onAddToCart={Cart}
                    onUpdate={updateProd}
                    userRole={userData?.user?.role}
                    isFlashSale={true}
                  />
                ))}
              </div>
            )}

            <div className="w-full flex justify-center border-b border-gray-200 pb-11">
              <Button onClick={() => setShowAllFlashSales(!showAllFlashSales)} className="px-12 py-4">
                {showAllFlashSales ? "Less Show All Products" : "View All Products"}
              </Button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-2 px-5">
            <SectionHeader title="Categories" />

            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-14 space-y-5">
                <div className="text-3xl font-semibold flex items-end h-20">
                  Browse By Category
                </div>
              </div>

              <ScrollButtons
                onLeftClick={() => scrollCategories("left")}
                onRightClick={() => scrollCategories("right")}
              />
            </div>

            <div
              ref={categoriesScrollRef}
              className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide border-b border-gray-200 pb-13"
            >
              {categories
                ?.filter((ele) => ele.parent === null)
                .map((ele, i) => (
                  <div
                    key={i}
                    className="min-w-[220px] bg-white rounded-xl shadow-sm transition-shadow duration-100 overflow-hidden flex-shrink-0 flex flex-col items-center justify-center group hover:bg-blue-500 cursor-pointer"
                    onClick={() => handleCategoryClick(ele)}
                  >
                    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-lg p-5 flex items-center justify-center flex-col">
                      <img
                        src={ele.image}
                        alt={ele.name}
                        className="w-30 h-30 object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="text-center text-gray-800 font-medium mt-2 transition-colors duration-100 group-hover:text-gray-800">
                        {ele.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-5 px-5">
            <SectionHeader title="This Month" />

            <div className="flex justify-between items-center w-full p-5">
              <div>
                <div className="text-3xl font-semibold">
                  Best Selling By Products
                </div>
              </div>

              <div>
                <Button onClick={() => setShowAllBestSelling(!showAllBestSelling)}>
                  {showAllBestSelling ? "Less Show All Products" : "View All Products"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-15">
              {displayedBestSellingProducts?.map((ele) => (
                <ProductCard
                  key={ele._id}
                  product={ele}
                  onAddToCart={Cart}
                  onUpdate={updateProd}
                  userRole={userData?.user?.role}
                />
              ))}
            </div>
            <div>
              <img src="/home2.png" className="rounded-lg w-full" alt="Banner" />
            </div>
          </div>

          <div className="space-y-3 px-5">
            <SectionHeader title="Our Product's" />

            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-5">
                <div className="text-3xl font-semibold flex items-end h-20">
                  Explore Our Products
                </div>
              </div>

              <ScrollButtons
                onLeftClick={handlePrev}
                onRightClick={handleNext}
                leftDisabled={currentPage === 0}
                rightDisabled={currentPage === totalPages - 1}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAllExploreProducts ? data : displayedProduct)?.map((ele) => (
                <ProductCard
                  key={ele._id}
                  product={ele}
                  onAddToCart={Cart}
                  onUpdate={updateProd}
                  userRole={userData?.user?.role}
                />
              ))}
            </div>

            <div className="w-full flex justify-center border-b border-gray-200 pb-11">
              <Button onClick={() => setShowAllExploreProducts(!showAllExploreProducts)} className="px-12 py-4">
                {showAllExploreProducts ? "Less Show All Products" : "View All Products"}
              </Button>
            </div>
          </div>

          <div className="space-y-5 px-5">
            <SectionHeader title="Featured" />

            <div className="flex justify-between items-center w-full p-5">
              <div>
                <div className="text-3xl font-semibold">New Arrival</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black flex items-end justify-center rounded-lg overflow-hidden">
                <img src="bg3.png" alt="Featured 1" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-black flex items-end justify-center rounded-lg overflow-hidden">
                  <img src="home1.png" alt="Featured 2" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-black flex items-end justify-center rounded-lg overflow-hidden">
                    <img src="bg.png" alt="Featured 3" />
                  </div>
                  <div className="bg-black flex items-end justify-center rounded-lg overflow-hidden">
                    <img src="bg1.png" alt="Featured 4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10">
            <ServiceItem
              icon="/Services.png"
              title="Fast Delivery"
              description="We deliver within 5 days"
            />
            <ServiceItem
              icon="/Services1.png"
              title="24/7 CUSTOMER SERVICE"
              description="We provide 24/7 customer service"
            />
            <ServiceItem
              icon="/Services2.png"
              title="MONEY BACK GUARANTEE"
              description="We return money within 30 days"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeUI;
