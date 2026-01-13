import { BsTrashFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

const OrderItem = ({ item }) => {
  console.log("item", item);
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center border-b md:border-none">
      <div className="col-span-2 md:col-span-5 font-medium text-gray-900 flex items-center gap-3">
        <div className="truncate flex flex-col">
          <span className="md:hidden text-gray-400 text-xs font-normal">
            Order
          </span>
          <span className="truncate flex items-center gap-5">
            {" "}
            <img
              src={
                item?.product?.image?.startsWith("http")
                  ? item?.product?.image
                  : `http://localhost:3001${item?.product?.image}`
              }
              alt={item?.product?.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            {item?.product?.name || "Unknown Product"}
          </span>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col md:items-center  space-y-2">
        <span className="md:hidden text-gray-400 text-xs font-normal">
          Price
        </span>
        <span className="text-gray-900 font-medium">Rs {item.price || 0}</span>
      </div>

      <div className="col-span-1 md:col-span-3 flex flex-col md:items-center space-y-2">
        <span className="md:hidden text-gray-400 text-xs font-normal text-right md:text-left">
          Quantity
        </span>
        <div className="flex items-center justify-end space-x-2 md:justify-center">
          <span className="w-8 text-center font-medium">{item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
