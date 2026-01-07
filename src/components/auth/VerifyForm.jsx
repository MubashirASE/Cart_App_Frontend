import React from "react";

const VerifyForm = ({ email, otp, setOtp, loading, handleVerify, handleResend }) => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-500">Verify Your Email</h2>
            <p className="text-gray-600">Enter the OTP sent to your email.</p>

            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none text-center tracking-widest text-lg"
                maxLength={6}
            />

            <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                <button
                    onClick={handleResend}
                    className="text-blue-500 hover:underline text-sm"
                >
                    Resend OTP
                </button>
            </div>

            <p className="text-xs text-gray-400 mt-2">{email}</p>
        </div>
    );
};

export default VerifyForm;
