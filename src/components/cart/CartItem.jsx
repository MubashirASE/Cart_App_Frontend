import { BsTrashFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

const CartItem = ({ item, increaseValue, decreaseValue, removeFromCart }) => {
  console.log("item", item);
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center border-b md:border-none">
      <div className="col-span-2 md:col-span-5 font-medium text-gray-900 flex items-center gap-3">
        <div className="truncate flex flex-col">
          <span className="md:hidden text-gray-400 text-xs font-normal">
            Product
          </span>
          <span className="truncate flex items-center gap-5">
            {" "}
            <img
              src={
                item?.productId?.image.startsWith("http")
                  ? item?.productId?.image
                  : `http://localhost:3001${item?.productId?.image}`
              }
              alt={item?.productId?.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            {item?.productId?.name || "Unknown Product"}
          </span>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col md:items-center  space-y-2">
        <span className="md:hidden text-gray-400 text-xs font-normal">
          Price
        </span>
        <span className="text-gray-900 font-medium">
          Rs {item.productId?.price || 0}
        </span>
      </div>

      <div className="col-span-1 md:col-span-3 flex flex-col md:items-center space-y-2">
        <span className="md:hidden text-gray-400 text-xs font-normal text-right md:text-left">
          Quantity
        </span>
        <div className="flex items-center justify-end space-x-2 md:justify-center">
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

      <div className="col-span-2 md:col-span-2 flex items-center justify-between md:justify-center p-2 rounded-lg bg-gray-50 md:bg-transparent gap-2">
        <div className="text-sm ">
          {(item.productId?.quantity || 0) - item.quantity <= 0 ? (
            <span className="text-red-500 font-medium">Out of stock</span>
          ) : (
            <span className="text-green-600 font-medium">In stock</span>
          )}
        </div>
        <button
          onClick={() => removeFromCart(item?._id)}
          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full bg-red-100/50"
          title="Remove item"
        >
          <BsTrashFill />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
