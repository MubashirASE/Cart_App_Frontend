import Button from "../../common/Button";
import ProductCard from "../../common/ProductCard";
import SectionHeader from "../../common/SectionHeader";

const BestSellingSection = ({
  products,
  showAll,
  setShowAll,
  Cart,
  updateProd,
  userRole
}) => {
  return (
    <div className="space-y-5 px-5">
      <SectionHeader title="This Month" />

      <div className="flex justify-between items-center w-full p-5">
        <h2 className="text-3xl font-semibold">Best Selling Products</h2>

        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Less Show All Products" : "View All Products"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
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

      <img src="/home2.png" className="rounded-lg w-full" alt="Banner" />
    </div>
  );
};

export default BestSellingSection;
