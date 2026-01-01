import { FaBoxes, FaChartLine, FaCoins, FaShoppingBag, FaThLarge, FaUsers } from "react-icons/fa";
import useAdminHome from "../../../hooks/useAdminHome";
import PageHeader from "../../../components/common/PageHeader.jsx";
import Card from "../../../components/common/Card.jsx";

export const AdminDetailPage = () => {
  const {
    Data,
    product,
    member,
  } = useAdminHome()
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 gap-3 flex">
            {" "}
            <FaUsers className="text-blue-500" size={20} />
            Total Members
          </p>
          <h3 className="text-xl font-bold mt-1">{member}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 gap-2 flex ">
            <FaBoxes className="text-blue-500" size={20} />
            Total Products
          </p>
          <h3 className="text-xl font-bold mt-1">{Data}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 flex gap-2"><FaShoppingBag className="text-blue-500" size={17} /> My Products</p>
          <h3 className="text-xl font-bold mt-1">{product}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 flex gap-2">
            <FaCoins className="text-blue-500" size={17} /> Total Revenue</p>
          <h3 className="text-xl font-bold mt-1">$0.00</h3>
        </Card>
      </div>
    </div>
  );
};

export default AdminDetailPage;
