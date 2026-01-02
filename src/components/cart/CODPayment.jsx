import React from "react";

const CODPayment = ({ calculateTotal, handlePlaceOrder }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between p-4 bg-gray-100 rounded font-bold">
                <p>Grand Total:</p>
                <p>${calculateTotal()}</p>
            </div>
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold"
            >
                Place Order (Cash on Delivery)
            </button>
        </div>
    );
};

export default CODPayment;
