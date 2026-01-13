import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({
  product,
  onAddToCart,
  onUpdate,
  userRole,
  isFlashSale = false,
}) => {
  const cardClass = isFlashSale
    ? "w-full min-w-[200px] sm:max-w-[255px] lg:max-w-[250px] max-w-[210px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col border border-gray-100"
    : "w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full";

  return (
    <div className={cardClass}>
      <div className="relative group">
        <div className="relative group w-full rounded-lg overflow-hidden aspect-[4/3] sm:aspect-[16/9]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105 lg:px-13  sm:px-13 md:px-13 px-9 sm:px-16"
          />
        </div>

        <button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              await onAddToCart(product._id);
            } catch (err) {
              console.error("Failed to add to cart:", err);
            }
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none"
          title="Add to Cart"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3
          className="font-semibold text-lg text-gray-800 truncate mb-1"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 truncate">
          <span className="font-medium">Serial:</span> {product.serial_number}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Qty:</span> {product.quantity}
          </div>
          <div className="text-lg font-bold text-blue-600">
            Rs {product.price}
          </div>
        </div>

        {userRole !== "user" && onUpdate && (
          <button
            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
            onClick={() => onUpdate(product)}
          >
            Update Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
