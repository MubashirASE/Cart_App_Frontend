import React, { useEffect } from "react";
import { useCart } from "../../contextData/useCart";
import OrderItem from "../../components/order/OrderItems";

const OrdersTracking = () => {
  const { orders,getOrders } = useCart();
  useEffect(() => {
      getOrders()
  })
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Tracking</h2>
      <h4 className="text-md mb-6 text-gray-500">
        Easily view your order status
      </h4>

      <div className="space-y-8 mt-10">
        {orders && orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-xl font-medium text-gray-600">No orders found</p>
            <p className="mt-2 text-gray-400">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          orders?.map((order) => (
            <div
              key={order?._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        Order #{order?._id?.slice(-8).toUpperCase()}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${
                          order.orderStatus === "Pending"
                            ? "bg-gray-100 text-red-500"
                            : order.orderStatus === "In progress"
                            ? "bg-gray-100 text-orange-500"
                            : order.orderStatus === "In transited"
                            ? "bg-gray-100 text-blue-600"
                            : "bg-gray-100 text-green-600"
                        }`}
                      >
                        {order?.orderStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      {new Date(order?.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-gray-400 uppercase font-bold tracking-tight">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black text-blue-600">
                      Rs {order?.totalAmount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-orange-500 font-bold mt-1">
                      Payment Method: {order?.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50/30 border-b border-gray-100 font-bold text-gray-400 text-xs uppercase tracking-widest">
                  <div className="col-span-5">Product Details</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  {/* <div className="col-span-2 text-center">In Stock</div> */}
                </div>
                {order?.items?.map((item) => (
                  <OrderItem
                    key={item?._id || Math.random()}
                    item={item}
                  />
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-bold">Shipping Address: </span>
                    {order?.shippingAddress?.address},{" "}
                    {order?.shippingAddress?.city}
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      order?.paymentStatus === "Completed"
                        ? "text-green-600"
                        : "text-red-400"
                    }`}
                  >
                    Payment: {order?.paymentStatus}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersTracking;
