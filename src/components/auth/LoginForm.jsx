import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ loginData, handleChange, errors, loading, handleLogin }) => {
    return (
        <div className="mt-8 space-y-6">
            <div className="rounded-md space-y-4">
                <div>
                    <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>
            </div>

            <div>
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="spinner mr-2"></div>
                            Login in...
                        </div>
                    ) : (
                        "Log in"
                    )}
                </button>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        create a new account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
