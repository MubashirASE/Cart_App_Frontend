import React from "react";

const PaymentSummary = ({ cartItems }) => {
    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div
                    key={item._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded shadow"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={item.productId?.image}
                            alt={item.productId?.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                            <p className="font-semibold">{item.productId.name}</p>
                            <p>Price: Rs {item.productId.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="mt-2 sm:mt-0 font-bold">
                        Total: Rs {item.quantity * item.productId.price}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PaymentSummary;
