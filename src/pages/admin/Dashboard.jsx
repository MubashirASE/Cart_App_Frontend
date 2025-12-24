import { Link, Outlet, useLocation } from "react-router-dom";
import { useCart } from "../../contextData/CartContext";
import {
  FaChartLine,
  FaUsers,
  FaUserShield,
  FaPlus,
  FaList,
  FaBoxes,
  FaShoppingBag,
  FaUserCog,
  FaFolderOpen,
} from "react-icons/fa";

const Dashboard = () => {
  const { userData } = useCart();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-50 text-blue-600"
      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600";
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Admin Menu
          </h2>
        </div>
        <nav className="space-y-1 px-3">
          <Link
            to={userData?.role === "admin" ? "/admin" : "/admin"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(
              "/admin"
            )}`}
          >
            <FaChartLine className="mr-3 text-lg" />
            Dashboard
          </Link>

          {userData?.user?.role === "superAdmin" && (
            <>
              {/* <Link
                to="/admin/adminCreated"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(
                  "/admin/adminCreated"
                )}`}
              >
                Add Admin
              </Link> */}
              <Link
                to="/admin/adminDetails"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors gap-3 ${isActive(
                  "/admin/adminDetails"
                )}`}
              >
                <FaUserCog /> Admin Details
              </Link>
            </>
          )}

          <Link
            to={userData?.role !== "user" ? "/admin/adminUser" : "#"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors gap-3 ${isActive(
              "/admin/adminUser"
            )}`}
          >
            <FaUsers />
            User Details
          </Link>
          {/* <Link
            to={userData?.role !== "user" ? "/admin/adminAllProduct" : "#"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors gap-3 ${isActive(
              "/admin/adminAllProduct"
            )}`}
          >
           <FaShoppingBag />  Products
          </Link> */}
          <Link
            to={userData?.role !== "user" ? "/admin/adminMyProduct" : "#"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors gap-3 ${isActive(
              "/admin/adminMyProduct"
            )}`}
          >
            <FaShoppingBag /> Product
          </Link>
          {/* <Link
            to={userData?.role !== "user" ? "/admin/adminUpdateProduct" : "#"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(
              "/admin/adminUpdateProduct"
            )}`}
          >
            Update Product
          </Link> */}
          <Link
            to={userData?.role !== "user" ? "/admin/adminCategory" : "#"}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors gap-3 ${isActive(
              "/admin/adminCategory"
            )}`}
          >
            <FaFolderOpen /> Category Management
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
