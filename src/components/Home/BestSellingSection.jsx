import { useState } from "react";
import Button from "../common/Button";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

const BestSellingSection = ({
  products,
  Cart,
  userRole
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products?.slice(0, 4);

  return (
    <div className="space-y-5 sm:p-5">
      <SectionHeader title="This Month" />

      <div className="flex justify-between items-center w-full p-2 sm:p-5">
        <h2 className="text-xl sm:text-3xl font-semibold">Best Selling Products</h2>

        <Button onClick={() => setShowAll(!showAll)} className="text-sm">
          {showAll ? "Less Show All Products" : "View All Products"}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 pb-10 p-2">
        {displayedProducts?.map(ele => (
          <ProductCard
            key={ele._id}
            product={ele}
            onAddToCart={Cart}
            userRole={userRole}
          />
        ))}
      </div>


      <img src="/home2.png" className="rounded-lg w-full" alt="Banner" />
    </div>
  );
};

export default BestSellingSection;
