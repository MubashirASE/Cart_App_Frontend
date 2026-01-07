import React from "react";

const CardPaymentForm = ({
    cardNumber,
    setCardNumber,
    accountHolder,
    setAccountHolder,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    calculateTotal,
    handlePlaceOrder,
}) => {
    return (
        <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Card Number</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Account Holder Name</label>
                <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Expiry Date</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">CVV</label>
                    <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
            </div>

            <div className="flex justify-between p-4 bg-gray-100 rounded font-bold">
                <p>Grand Total:</p>
                <p>${calculateTotal()}</p>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
                Pay & Place Order
            </button>
        </form>
    );
};

export default CardPaymentForm;
