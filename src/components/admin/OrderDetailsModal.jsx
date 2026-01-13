import React from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaUser,
  FaClock,
  FaTimes,
} from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-500 text-center">
            Order Details
          </h2>

          <button
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                <FaUser className="text-blue-600" /> Customer Info
              </h3>
              <p>
                <b>Name :</b> {order.shippingAddress?.fullName}{" "}
                {order.shippingAddress?.lastName}
              </p>
              <p>
                <b>Contact :</b> {order.shippingAddress?.phone}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                <FaClock className="text-amber-500" /> Order Info
              </h3>
              <p>
                <b>Order Status:</b> {order.orderStatus}
              </p>
              <p>
                <b>Payment Method:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Payment Status:</b>{" "}
                <span
                  className={
                    order.paymentStatus === "Pending"
                      ? "text-red-500 bg-red-50 p-1 rounded-full px-4"
                      : "text-green-500 bg-green-50 p-1 rounded-full px-4"
                  }
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p>
                <b>Order Date:</b> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-red-400" /> Shipping Address
              </h3>
              <p>
                <b>Name:</b>
                {order.shippingAddress.fullName}
              </p>
              <p>
                {" "}
                <b>Phone:</b>
                {order.shippingAddress.phone}
              </p>
              <p>
                <b>Address: </b> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}
              </p>
              <p>
                <b>Postal Code:</b>
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="border border-none rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 flex items-center gap-3">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <FaBox className="text-gray-400" />
                      )}
                      <span className="font-medium">{item.product?.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right">Rs {item.price}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      Rs {item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-bold">
                    Total Amount
                  </td>
                  <td className="px-6 py-4 text-right text-lg font-bold text-blue-600">
                    Rs {order.totalAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
