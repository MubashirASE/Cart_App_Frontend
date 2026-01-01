import Button from "../../common/Button";
import ProductCard from "../../common/ProductCard";
import ScrollButtons from "../../common/ScrollButtons";
import SectionHeader from "../../common/SectionHeader";

const ExploreProductsSection = ({
  products,
  showAll,
  setShowAll,
  Cart,
  updateProd,
  userRole,
  handlePrev,
  handleNext,
  currentPage,
  totalPages
}) => {
  return (
    <div className="space-y-3 px-5">
      <SectionHeader title="Our Product's" />

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Explore Our Products</h2>

        <ScrollButtons
          onLeftClick={handlePrev}
          onRightClick={handleNext}
          leftDisabled={currentPage === 0}
          rightDisabled={currentPage === totalPages - 1}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map(ele => (
          <ProductCard
            key={ele._id}
            product={ele}
            onAddToCart={Cart}
            onUpdate={updateProd}
            userRole={userRole}
          />
        ))}
      </div>

      <div className="w-full flex justify-center border-b border-gray-200 pb-11">
        <Button onClick={() => setShowAll(!showAll)} className="px-12 py-4">
          {showAll ? "Less Show All Products" : "View All Products"}
        </Button>
      </div>
    </div>
  );
};

export default ExploreProductsSection;
