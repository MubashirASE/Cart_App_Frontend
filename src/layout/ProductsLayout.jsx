import React, { useState } from "react";
import { useCart } from "../contextData/CartContext";
import Loader from "../components/common/Loader";
import FilterButton from "../components/ui/CategoryWise/FilterButton";
import SortDropdown from "../components/common/SortDropdown";
import SelectedCategories from "../components/ui/CategoryWise/SelectedCategories";
import ProductsGrid from "../components/ui/CategoryWise/ProductsGrid";
import FilterSidebar from "../components/ui/CategoryWise/FilterSideBar";

const ProductsLayout = ({ hook, loadingText }) => {
  const { userData } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const category = hook();

  const shouldShowSelectedCategories =
    category.selectedCategories.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {category.loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" text={loadingText} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <FilterButton onClick={() => setIsSidebarOpen(true)} />
            <SortDropdown
              sortOrder={category.sortOrder}
              sortByOrder={category.sortByOrder}
            />
          </div>

          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            flatCategories={category.flatCategories}
            selectedCategories={category.selectedCategories}
            handleCategorySelect={category.handleCategorySelect}
            refetch={category.refetch}
            setProducts={category.setProducts}
            
          />

          {category.selectedCategories && shouldShowSelectedCategories  && (
            <SelectedCategories
              selectedCategories={category.selectedCategories}
              flatCategories={category.flatCategories}
              removeCategory={category.removeCategory}
              removeAllCategory={category.removeAllCategory}
            />
          )}

          <ProductsGrid
            products={category.products}
            Cart={category.Cart}
            updateProd={category.updateProd}
            userRole={userData?.user?.role}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsLayout;
