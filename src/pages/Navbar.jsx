import { Link} from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contextData/CartContext";

const Navbar = () => {
  const {  cartItems} = useCart();


  return (
    <div className="navbar flex justify-between">
      <h2 className="">
        <Link className="navbar-heading text-2xl font-bold text-blue-500" to="/">
        GoCartify{" "}
        </Link>
      </h2>

      <div className="flex gap-7">
            <Link className="text-xl font-bold hover:text-blue-500" to="/">
              Home
            </Link>
            <Link className="text-xl font-bold hover:text-blue-500" to="/createProduct">
              New Product
            </Link>
            <Link className="text-xl font-bold hover:text-blue-500" to="/updateProduct">
              Update Product
            </Link>
            <Link className="" to="/cart">
              <FaShoppingCart className="cart-icon" />
              {cartItems.length}
            </Link>
      </div>
    </div>
  );
};

export default Navbar;