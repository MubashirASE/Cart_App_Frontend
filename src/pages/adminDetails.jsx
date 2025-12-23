import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { FaShoppingBag, FaTimesCircle } from "react-icons/fa";
import Modal from "../components/popup";
import AdminAddData from "./adminAddData";

export const AdminDetails = () => {
  const [product, setProduct] = useState();
  const [member, setMember] = useState();
  const [loading, setloading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const allfetchData = async () => {
    const adminData = await API_URL.get(`/user/alladminData`);
    const data = adminData.data.data;
    console.log(adminData);
    setMember(data);
    const productData = await API_URL.get(`/products/`);
    const result = productData.data;
    console.log("result", result);
    setProduct(result);
  };
  const handleBlock = async (userId, currentStatus) => {
    try {
      console.log(currentStatus);
      if (currentStatus === false) {
        const res = await API_URL.patch(`/user/userBlocked/${userId}`);

        toast.success(res.data.message);

        setMember((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isBlocked: !currentStatus } : u
          )
        );
      } else {
        const res = await API_URL.patch(`/user/userUnBlocked/${userId}`);

        toast.success(res.data.message);

        setMember((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isBlocked: !currentStatus } : u
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    allfetchData();
  }, []);
  useEffect(() => {
    setloading(true);
    if (product?.length > 0) {
      setloading(false);
    }
  }, [product]);
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Admins Details</h1>
        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg"
        >
          Add Admin
        </button>
        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <AdminAddData
            closeModal={() => setOpenCreateModal(false)}
            fetchData={() => allfetchData()}
          />
        </Modal>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner "></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Products
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product Names
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {member?.map((a) => {
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
                        <button
                          onClick={() => handleBlock(a._id, a.isBlocked)}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                                       ${
                                         a.isBlocked
                                           ? "bg-green-200 hover:bg-green-300 focus:ring-green-500 text-green-700"
                                           : "bg-red-200 hover:bg-red-300 focus:ring-red-500 text-red-700"
                                       }`}
                        >
                          {a.isBlocked ? "Unblock Admin" : "Block Admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
