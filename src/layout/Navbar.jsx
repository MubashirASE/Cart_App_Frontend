import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserEdit,
} from "react-icons/fa";
import { useCart } from "../contextData/CartContext";
import { useEffect, useRef, useState } from "react";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  const { cartItems, userData, setUser, setCartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-50 text-blue-600 font-bold"
      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium";

  const removeData = () => {
    localStorage.clear();
      setUser(null, null);        
  setCartItems([]);     

    navigate("/login");
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-100 sticky top-0 shadow-sm p-2 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex-shrink-0">
              <Link
                to={
                  userData?.user
                    ? userData.user.role === "user"
                      ? "/"
                      : "/admin"
                    : "/login"
                }
                onClick={(e) => {
                  if (!userData?.user) {
                    e.preventDefault();
                    navigate("/login");
                  }
                }}
                className="text-2xl font-bold transition flex items-center"
              >
                <img src="/logo2.png" className="w-10" />
                <span className="text-blue-600">GoCartify</span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {userData?.user?.role === "user" && (
              <>
                <Link to="/" className={`px-3 py-2 rounded ${isActive("/")}`}>
                  Home
                </Link>
                <Link
                  to="/contact"
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

          <div className="hidden md:flex items-center space-x-6 relative">
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
              <div className="relative" tabIndex={0} ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="bg-gray-200 px-5 py-3 rounded-full text-blue-600 text-xl font-bold"
                >
                  {userData.user.name.charAt(0).toUpperCase()}
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-90 bg-white shadow-lg rounded-lg border border-none">
                    <div className="px-4 py-3  flex gap-2">
                      <button
                        onClick={() =>
                          setIsProfileDropdownOpen(!isProfileDropdownOpen)
                        }
                        className="bg-gray-200 px-5 py-3 rounded-full text-blue-600 text-xl font-bold"
                      >
                        {userData.user.name.charAt(0).toUpperCase()}
                      </button>
                      <div className="flex flex-col">
                        <p className="font-semibold">{userData.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {userData.user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-blue-500  hover:text-white flex items-center gap-2"
                    >
                      <FaUserEdit /> Edit Profile
                    </Link>

                    <button
                      onClick={removeData}
                      className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-medium flex justify-center items-center gap-2">
                    <FaSignInAlt /> Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2">
                    <FiUserPlus /> Signup
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-white border-t border-gray-200">
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
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={removeData}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Logout
                </button>
              </>
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
