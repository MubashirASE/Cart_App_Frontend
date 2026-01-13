import ProductCard from "../common/ProductCard";

const ProductsGrid = ({ products, Cart, updateProd, userRole }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 sm:p-4">
      {products.map(ele => (
        <ProductCard
          key={ele._id}
          product={ele}
          onAddToCart={Cart}
          onUpdate={updateProd}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
