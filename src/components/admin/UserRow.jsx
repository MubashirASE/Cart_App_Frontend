import React from "react";
import { FaUserCheck, FaUserSlash, FaPaperPlane } from "react-icons/fa";
import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md";
import IconButton from "../common/IconButton.jsx";

const UserRow = ({ user, cartItems, onShowCart, onBlock, onSendMail, currentUser }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    {cartItems.length > 0 ? (
                        <div className="space-y-1">
                            <MdShoppingCart
                                className="w-5 h-5 text-amber-500 cursor-pointer"
                                title="Has items in cart"
                                onClick={() => onShowCart(cartItems)}
                            />
                        </div>
                    ) : (
                        <span className="text-gray-400 italic">
                            <MdRemoveShoppingCart
                                className="w-5 h-5 text-gray-400"
                                title="Empty cart"
                            />
                        </span>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {currentUser.isBlocked !== true ? (
                    <IconButton
                        onClick={() => onBlock(user._id, user.isBlocked)}
                        icon={user.isBlocked ? FaUserSlash : FaUserCheck}
                        variant={user.isBlocked ? "danger" : "success"}
                        className="rounded-full"
                        title={user.isBlocked ? "Unblock User" : "Block User"}
                    />
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Restricted
                    </span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <IconButton
                    onClick={() => onSendMail(user._id)}
                    icon={FaPaperPlane}
                    variant={user.isBlocked ? "primary" : "secondary"}
                    disabled={user.isBlocked !== true}
                    className={`rounded-full ${user.isBlocked !== true ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                    title="Send Mail"
                />
            </td>
        </tr>
    );
};

export default UserRow;
