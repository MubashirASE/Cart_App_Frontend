import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../api/api";
import { useCart } from "../../contextData/CartContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useCart();
  const [loading, setloading] = useState(false);

  const navigate = useNavigate()
  let newErrors = {};

  const validateForm = () => {

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(loginData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    else if (loginData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    console.log(errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setloading(true);

      try {
        const user = await API_URL.post('/user/login', loginData)
        console.log(user.data)

        if (user.data.success) {
        //   if (user.data.requireOtp) {
        //     toast.info(user.data.message);
        //     navigate("/verify", { state: { email: loginData.email } });
        //   } else {
            setUser(user.data.token, user.data.userData)
            toast.success(user.data.message)
            if(user.data.userData.role === 'user'){
              navigate("/");
            }else{
              navigate("/admin");
            }
          // }
        } else {
          toast.error(user.data.message)
          setloading(false);

        }
      } catch (error) {
        console.error(error);
          toast.error(error.response.data.message)
          setloading(false);

      }
    }

  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md  space-y-4">
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={loginData.email}
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
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Login in...
                </div>
              ) : (
                "Login in"
              )}
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;