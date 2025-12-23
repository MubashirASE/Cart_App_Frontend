import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="flex flex-row justify-between m-6">
      <div className="text-2xl font-bold text-blue-600 ms-9">
        <Link to="/">Cart_App</Link>
      </div>
      <button>Product</button>
      <button>Cart</button>
    </div>
  );
};
export default Navbar;
