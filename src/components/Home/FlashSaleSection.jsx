import { useRef, useState } from "react";
import Button from "../common/Button";
import ProductCard from "../common/ProductCard";
import ScrollButtons from "../common/ScrollButtons";
import SectionHeader from "../common/SectionHeader";
import { useNavigate } from "react-router-dom";

const FlashSalesSection = ({
  data,
  Cart,
  userRole
}) => {
  const [showAllFlashSales, setShowAllFlashSales] = useState(false);
  const flashSalesScrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollFlashSales = (direction) => {
    if (flashSalesScrollRef.current) {
      flashSalesScrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-5 sm:px-5">
      <SectionHeader title="Today's" />

      <div className="flex justify-between items-center p-2">
        <h2 className="text-xl sm:text-3xl font-semibold">Flash Sales</h2>
        <ScrollButtons
          onLeftClick={() => scrollFlashSales("left")}
          onRightClick={() => scrollFlashSales("right")}
        />
      </div>

      {showAllFlashSales ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {data.map(ele => (
            <ProductCard
              key={ele._id}
              product={ele}
              onAddToCart={Cart}
              userRole={userRole}
            />
          ))}
        </div>

      ) : (
        <div ref={flashSalesScrollRef} className="flex overflow-x-auto sm:gap-6 gap-2 scrollbar-hide p-2">
          {data.map(ele => (
            <ProductCard
              key={ele._id}
              product={ele}
              onAddToCart={Cart}
              userRole={userRole}
              isFlashSale
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={() => {
          setShowAllFlashSales(!showAllFlashSales)
          navigate("/products")
        }}>
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default FlashSalesSection;
