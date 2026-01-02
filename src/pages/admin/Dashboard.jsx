import { Outlet } from "react-router-dom";
import { useCart } from "../../contextData/useCart";
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";

const Dashboard = () => {
  const { userData } = useCart();

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 ">
      <AdminSidebar userData={userData} />

      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
