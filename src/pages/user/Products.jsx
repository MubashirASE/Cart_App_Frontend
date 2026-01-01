
import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductsLayout from "../../layout/ProductsLayout";

const Products = () => {
  return <ProductsLayout hook={useProducts} loadingText="Loading Products..." />;
};

export default Products;

