import React from "react";

const CartSummary = ({ cartItems, checkOut }) => {
    if (cartItems.length === 0) return null;

    return (
        <div className="mt-12 flex justify-center md:justify-end">
            <button
                onClick={checkOut}
                className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-200 text-lg hover:-translate-y-1"
            >
                Proceed to Checkout
            </button>
        </div>

    );
};

export default CartSummary;
