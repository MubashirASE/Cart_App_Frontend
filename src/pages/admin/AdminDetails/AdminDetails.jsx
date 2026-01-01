
import { FaShoppingBag, FaTimesCircle, FaUserCheck, FaUserSlash } from "react-icons/fa";
import Modal from "../../../components/common/popup.jsx";
import useAdminDetails from "../../../hooks/useAdminDetails.js";
import CreateAdmin from "../CreateAdmin/CreateAdmin.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import Table from "../../../components/common/Table.jsx";
import Button from "../../../components/common/Button.jsx";
import IconButton from "../../../components/common/IconButton.jsx";

const AdminDetails = () => {

  const {
    loading,
    openCreateModal,
    setOpenCreateModal,
    handleBlock,
    product,
    member,
    allfetchData
  } = useAdminDetails()

  const tableHeaders = [
    { label: "Name" },
    { label: "Email" },
    { label: "Total Products", className: "text-center" },
    { label: "Product Names" },
    { label: "Action", className: "text-center" },
  ];

  const renderRow = (a) => {
    const userProducts = product?.filter(
      (p) => p.user._id === a._id
    );
    const totalProducts = userProducts?.length || 0;
    const productNames =
      userProducts?.map((p) => p.name).join(", ") ||
      "No products";

    return (
      <tr key={a._id} className="hover:bg-gray-50 ">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {a.name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{a.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <span className="items-center text-xs font-medium flex justify-center">
            {totalProducts > 0 ? (
              <div className="w-6 h-6 rounded-2xl bg-green-200 flex justify-center items-center">
                {totalProducts}
              </div>
            ) : (
              <FaTimesCircle className="text-red-200 text-2xl" />
            )}
          </span>
        </td>
        <td className="px-6 py-4">
          <div
            className="text-sm text-gray-500 truncate max-w-xs"
            title={productNames}
          >
            {productNames}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
           <IconButton
            onClick={() => handleBlock(a._id, a.isBlocked)}
              icon={a.isBlocked ? FaUserSlash: FaUserCheck}
              variant={a.isBlocked ? "danger" : "success"}
              className="rounded-full"
              title={a.isBlocked ? "Unblock User" : "Block User"}
            />
        </td>
      </tr>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="All Admins Details"
        action={
          <Button onClick={() => setOpenCreateModal(true)}>
            Add Admin
          </Button>
        }
      />
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <CreateAdmin
          closeModal={() => setOpenCreateModal(false)}
          fetchData={() => allfetchData()}
        />
      </Modal>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner "></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table
            headers={tableHeaders}
            data={member || []}
            renderRow={renderRow}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
