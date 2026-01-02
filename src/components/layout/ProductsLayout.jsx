import React, { useState } from "react";
import { useCart } from "../../contextData/useCart";
import Loader from "../common/Loader";
import FilterButton from "../CategoryWise/FilterButton";
import SortDropdown from "../common/SortDropdown";
import SelectedCategories from "../CategoryWise/SelectedCategories";
import ProductsGrid from "../CategoryWise/ProductsGrid";
import FilterSidebar from "../CategoryWise/FilterSideBar";

const ProductsLayout = ({
  products,
  loading,
  loadingText,
  allCategory,
  selectedCategories,
  tempSelectedCategories,
  sortOrder,
  handleCategorySelect,
  flatCategories,
  refetch,
  sortByOrder,
  removeCategory,
  removeAllCategory,
  Cart,
}) => {
  const { userData } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const shouldShowSelectedCategories = selectedCategories.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" text={loadingText} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <FilterButton onClick={() => setIsSidebarOpen(true)} />
            <SortDropdown sortOrder={sortOrder} sortByOrder={sortByOrder} />
          </div>

          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            flatCategories={flatCategories}
            selectedCategories={tempSelectedCategories}
            handleCategorySelect={handleCategorySelect}
            refetch={refetch}
          />

          {selectedCategories && shouldShowSelectedCategories && (
            <SelectedCategories
              selectedCategories={selectedCategories}
              flatCategories={flatCategories}
              removeCategory={removeCategory}
              removeAllCategory={removeAllCategory}
            />
          )}

          <ProductsGrid
            products={products}
            Cart={Cart}
            userRole={userData?.user?.role}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsLayout;
