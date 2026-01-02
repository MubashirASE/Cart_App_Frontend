import React from "react";

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={() => setPaymentMethod("CARD")}
                className={`px-4 py-2 rounded font-semibold ${paymentMethod === "CARD" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
            >
                Pay by Card
            </button>
            <button
                onClick={() => setPaymentMethod("COD")}
                className={`px-4 py-2 rounded font-semibold ${paymentMethod === "COD" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
            >
                Cash on Delivery
            </button>
        </div>
    );
};

export default PaymentMethodSelector;
