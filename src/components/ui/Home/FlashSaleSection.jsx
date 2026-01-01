import Button from "../../common/Button";
import ProductCard from "../../common/ProductCard";
import ScrollButtons from "../../common/ScrollButtons";
import SectionHeader from "../../common/SectionHeader";

const FlashSalesSection = ({
  data,
  showAllFlashSales,
  setShowAllFlashSales,
  flashSalesScrollRef,
  scrollFlashSales,
  Cart,
  updateProd,
  userRole
}) => {
  return (
    <div className="space-y-5 px-5">
      <SectionHeader title="Today's" />

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Flash Sales</h2>
        <ScrollButtons
          onLeftClick={() => scrollFlashSales("left")}
          onRightClick={() => scrollFlashSales("right")}
        />
      </div>

      {showAllFlashSales ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data.map(ele => (
            <ProductCard
              key={ele._id}
              product={ele}
              onAddToCart={Cart}
              onUpdate={updateProd}
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <div ref={flashSalesScrollRef} className="flex overflow-x-auto gap-6">
          {data.map(ele => (
            <ProductCard
              key={ele._id}
              product={ele}
              onAddToCart={Cart}
              onUpdate={updateProd}
              userRole={userRole}
              isFlashSale
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={() => setShowAllFlashSales(!showAllFlashSales)}>
          {showAllFlashSales ? "Less Show All Products" : "View All Products"}
        </Button>
      </div>
    </div>
  );
};

export default FlashSalesSection;
