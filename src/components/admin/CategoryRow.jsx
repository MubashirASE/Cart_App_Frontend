import React from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2, BsToggleOff, BsToggleOn } from "react-icons/bs";
import IconButton from "../common/IconButton.jsx";

const CategoryRow = ({ category, onEdit, onToggleStatus, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                    {category.level > 0 && (
                        <span
                            className="flex items-center text-sm font-medium text-gray-900"
                            style={{ marginLeft: `${category.level * 24}px` }}
                        >
                            └─
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-5 h-5 object-cover rounded-lg ml-1"
                            />
                            <span className="ml-1">{category.name}</span>
                        </span>
                    )}
                    {category.level === 0 && (
                        <span className="flex items-center text-sm font-medium text-gray-900">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-5 h-5 object-cover rounded-lg mr-1"
                            />
                            {category.name}
                        </span>
                    )}
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500 font-mono">
                    {category.slug}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${category.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {category.isActive ? "Active" : "Inactive"}
                </span>
            </td>
            <td className="px-6 py-4 text-center space-x-2">
                <IconButton
                    onClick={() => onEdit(category)}
                    icon={BiPencil}
                    variant="primary"
                />
                <IconButton
                    onClick={() => onToggleStatus(category)}
                    icon={category.isActive ? BsToggleOn : BsToggleOff}
                    variant={category.isActive ? "success" : "danger"}
                />
                <IconButton
                    onClick={() => onDelete(category)}
                    icon={BsTrash2}
                    variant="danger"
                />
            </td>
        </tr>
    );
};

export default CategoryRow;
