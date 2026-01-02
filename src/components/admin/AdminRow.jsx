import React from "react";
import { FaTimesCircle, FaUserCheck, FaUserSlash } from "react-icons/fa";
import IconButton from "../common/IconButton.jsx";

const AdminRow = ({ admin, products, onBlock }) => {
    const userProducts = products?.filter((p) => p.user._id === admin._id);
    const totalProducts = userProducts?.length || 0;
    const productNames = userProducts?.map((p) => p.name).join(", ") || "No products";

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{admin.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="items-center text-xs font-medium flex justify-center">
                    {totalProducts > 0 ? (
                        <div className="w-6 h-6 rounded-2xl bg-green-200 flex justify-center items-center">
                            {totalProducts}
                        </div>
                    ) : (
                        <FaTimesCircle className="text-red-200 text-2xl" />
                    )}
                </span>
            </td>
            <td className="px-6 py-4">
                <div
                    className="text-sm text-gray-500 truncate max-w-xs"
                    title={productNames}
                >
                    {productNames}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <IconButton
                    onClick={() => onBlock(admin._id, admin.isBlocked)}
                    icon={admin.isBlocked ? FaUserSlash : FaUserCheck}
                    variant={admin.isBlocked ? "danger" : "success"}
                    className="rounded-full"
                    title={admin.isBlocked ? "Unblock User" : "Block User"}
                />
            </td>
        </tr>
    );
};

export default AdminRow;
