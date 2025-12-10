import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../contextData/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { cartItems, userData, setUser, setCartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const removeData = () => {
    localStorage.clear();
    setUser(null, null);
    setCartItems([]);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            GoCartify
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Home Visible Only for Users */}
            {userData?.user?.role === "user" && (
              <Link
                to="/"
                className="text-blue-700 font-medium hover:font-bold transition"
              >
                Home
              </Link>
            )}

            {/* Cart Icon for User */}
            {userData?.user?.role === "user" && (
              <Link to="/cart" className="relative">
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
                <FaShoppingCart size={24} className="text-blue-700" />
              </Link>
            )}
           
            {/* Auth Buttons */}
            {userData?.user ? (
              <div className="flex space-x-6">
                <div className="flex justify-end flex-col text-blue-600 font-bold">
                  <p className="flex justify-end text-xl">{userData?.user?.name}</p>
                  <p className="text-sm">{userData?.user?.email}</p>
                </div>
              <button
                onClick={removeData}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-sm"
              >
                Logout
              </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-sm">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {userData?.user?.role === "user" && (
              <Link to="/cart" className="relative mr-4">
                <FaShoppingCart size={24} className="text-blue-700" />
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">

            {userData?.user?.role === "user" && (
              <Link
                to="/"
                className="text-blue-700 font-medium hover:font-bold transition"
              >
                Home
              </Link>
            )}


            {!userData?.user ? (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                    Login
                  </button>
                </Link>

                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-2">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
               <div className="flex flex-col space-y-6">
                <div className="flex justify-end flex-col text-blue-600 font-bold">
                  <p className="flex justify-end text-xl">{userData?.user?.name}</p>
                  <p className="flex justify-end text-sm">{userData?.user?.email}</p>
                </div>
              <button
                onClick={removeData}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-sm"
              >
                Logout
              </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
