import React from "react";

const CartSummary = ({ cartItems, checkOut }) => {
    if (cartItems.length === 0) return null;

    return (
        <div className="mt-12 flex justify-end">
            <button
                onClick={checkOut}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-lg"
            >
                Checkout
            </button>
        </div>
    );
};

export default CartSummary;
