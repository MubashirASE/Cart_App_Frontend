const CartItem = ({ item, increaseValue, decreaseValue, removeFromCart }) => {
  return (
    <div className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col ">
      <div className="col-span-5 font-medium text-gray-900 flex items-center justify-between md:justify-start">
        <span className="md:hidden text-gray-500 text-sm">Product:</span>
        <span className="truncate">{item?.productId?.name || "Unknown Product"}</span>
      </div>

      <div className="col-span-2 text-center md:text-center flex items-center justify-between md:justify-center">
        <span className="md:hidden text-gray-500 text-sm">Price:</span>
        <span className="text-gray-900">${item.productId?.price || 0}</span>
      </div>

      <div className="col-span-3 flex items-center justify-between md:justify-center">
        <span className="md:hidden text-gray-500 text-sm">Quantity:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => decreaseValue(item.productId?._id)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => increaseValue(item.productId?._id)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between md:justify-center space-x-4">
        <div className="text-sm">
          {(item.productId?.quantity || 0) - item.quantity <= 0 ? (
            <span className="text-red-500 font-medium">Out of stock</span>
          ) : (
            <span className="text-green-600 font-medium">In stock</span>
          )}
        </div>
        <button
          onClick={() => removeFromCart(item?._id)}
          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Remove item"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default CartItem;
