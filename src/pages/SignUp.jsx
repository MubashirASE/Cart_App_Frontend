import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";
const SignUp = () => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const { setUser } = useCart();
  const [loading, setloading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!signupData.name) {
      newErrors.name = 'Email is required';
    }
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(signupData.password)) {
      newErrors.password = 'Password must be at least 1 uppercase';
    } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(signupData.password)) {
      newErrors.password = 'Password must be at least 1 special character';
    }

    setErrors(newErrors);
    console.log(errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setloading(true)

    try {
      const response = await API_URL.post("/user/signup", signupData);
      const data = response.data;

      if (data.success) {
        if (signupData.role === "user") {
          setUser(data.token, data.userData);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.success(data.message);
          navigate("/verify", { state: { email: signupData.email } });
        }
      } else {
        toast.error(data.message);
        console.log(data);
        setloading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed, please try again.");
      setloading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-900 font-bold">
            SignUp
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className=" space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                value={signupData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login in to your existing account
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;