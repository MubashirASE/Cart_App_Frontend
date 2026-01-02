import React from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

const CreateAdminForm = ({ signupData, errors, loading, onChange, onSubmit }) => {
    return (
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl ">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
                    Create Admin Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Add a new administrator to the system
                </p>
            </div>
            <div className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <Input
                            label="Name"
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter admin name"
                            value={signupData.name}
                            onChange={onChange}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <Input
                            label="Email address"
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Enter admin email"
                            value={signupData.email}
                            onChange={onChange}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                        <Input
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Enter password"
                            value={signupData.password}
                            onChange={onChange}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                </div>

                <div>
                    <Button
                        onClick={onSubmit}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                Creating Admin...
                            </div>
                        ) : (
                            "Create Admin"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateAdminForm;
