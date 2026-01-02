import React from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import IconButton from "../common/IconButton.jsx";

const ProductRow = ({ product, onEdit, onDelete, showActions = true, userData }) => {
    const isSuperAdmin = userData?.user?.role === "superAdmin";
    const canAct = showActions || isSuperAdmin;

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <img
                    src={product.image.startsWith("http") ? product.image : `http://localhost:3001${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 truncate w-40">
                    {product.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.serial_number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {product.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-blue-600">
                Rs {product.price}
            </td>
            {canAct && (
                <td className="px-6 py-4 text-center space-x-2">
                    {onEdit && (
                        <IconButton
                            onClick={() => onEdit(product)}
                            icon={BiPencil}
                            variant="primary"
                        />
                    )}
                    {onDelete && (
                        <IconButton
                            onClick={() => onDelete(product)}
                            icon={BsTrash2}
                            variant="danger"
                        />
                    )}
                </td>
            )}
        </tr>
    );
};

export default ProductRow;
