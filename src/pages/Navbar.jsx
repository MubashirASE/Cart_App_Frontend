import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../contextData/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { cartItems, userData, setUser, setCartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-50 text-blue-600 font-bold"
      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium";
  };

  const removeData = () => {
    localStorage.clear();
    setUser(null, null);
    setCartItems([]);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 sticky top-0  shadow-sm p-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold  transition flex"
            >
              <img src="/logo2.png" className="w-10" /><span className="text-blue-600">GoCartify</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {userData?.user?.role === "user" && (
              <>
                <Link to="/" className={`px-3 py-2 rounded ${isActive("/")}`}>
                  Home
                </Link>
                <Link
                  to="/contant"
                  className={`px-3 py-2 rounded ${isActive("/contant")}`}
                >
                  Contant
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-2 rounded ${isActive("/about")}`}
                >
                  About
                </Link>

              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {userData?.user?.role === "user" && (
              <Link to="/cart" className="relative">
                <FaShoppingCart size={24} className="text-blue-600" />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {userData?.user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right font-bold text-gray-600">
                  <p className="text-lg">{userData.user.name}</p>
                  <p className="text-sm">{userData.user.email}</p>
                </div>
                <button
                  onClick={removeData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>

=          <div className="md:hidden flex items-center">
            {userData?.user?.role === "user" && (
              <Link to="/cart" className="relative mr-3">
                <FaShoppingCart size={24} className="text-blue-500" />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 ">
          <div className="px-4 py-4 flex flex-col space-y-3">
            {userData?.user?.role === "user" && (
              <>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded ${isActive("/")}`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded ${isActive("/about")}`}
                >
                  About
                </Link>
                <Link
                  to="/contant"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded ${isActive("/contant")}`}
                >
                  Contant Us
                </Link>
              </>
            )}

            {userData?.user ? (
              <div className="flex flex-col space-y-2">
                <div className="text-blue-600 font-bold text-right">
                  <p className="text-lg">{userData.user.name}</p>
                  <p className="text-sm">{userData.user.email}</p>
                </div>
                <button
                  onClick={removeData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
