import React from "react";
import { FaEye } from "react-icons/fa";
import IconButton from "../common/IconButton.jsx";

const OrderRow = ({ order, onViewDetails, onUpdateStatus }) => {

  const handleStatusChange = (e) => {
    onUpdateStatus(order._id, e.target.value);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {order.shippingAddress?.fullName || ""} {order.shippingAddress?.lastName || ""}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">
            {order.shippingAddress?.phone}{" "}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        Rs {order.totalAmount}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 font-bold ${order.paymentMethod === "COD" ? "text-orange-400" : "text-green-400"}`}>
        {order.paymentMethod}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={order.orderStatus}
          onChange={handleStatusChange}
          className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset  outline-none cursor-pointer bg-gray-100 ring-gray-300/20 ring-opacity-20 ${
            order.orderStatus === "Pending"
              ? "bg-gray-100 text-red-500"
              : order.orderStatus === "In progress"
              ? "bg-gray-100 text-orange-500"
              : order.orderStatus === "In transited"
              ? "bg-gray-100 text-blue-600"
              
              : "bg-gray-100 text-green-600"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="In progress">In progress</option>
          <option value="In transited">In transited</option>
          <option value="Delivered">Delivered</option>
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleDateString()}
        <div className="text-xs text-gray-400">
          {new Date(order.createdAt).toLocaleTimeString()}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
        <div className="flex justify-center">
          <IconButton
            onClick={() => onViewDetails(order)}
            icon={FaEye}
            variant="primary"
            className="rounded-full"
            title="View Details"
          />
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
