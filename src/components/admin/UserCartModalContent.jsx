import React from "react";

const UserCartModalContent = ({ cartItems }) => {
    return (
        <div className="bg-white overflow-y-auto max-h-[80vh]">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Serial No.
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                            Qty
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img
                                    src={item.productId?.image}
                                    alt={item.productId?.name}
                                    className="w-12 h-12 object-cover rounded-lg"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 truncate w-40">
                                    {item.productId?.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.productId?.serial_number}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-blue-600">
                                ${item.productId?.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCartModalContent;
