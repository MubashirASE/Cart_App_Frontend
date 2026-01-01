
import React from "react";
import useCategoryWiseProducts from "../../hooks/useCategoryWiseProducts";
import ProductsLayout from "../../layout/ProductsLayout";

const CategoryWiseProduct = () => {
  return (
    <ProductsLayout
      hook={useCategoryWiseProducts}
      loadingText="Loading Categories..."
      showSelectedCategories={true}
    />
  );
};

export default CategoryWiseProduct;
