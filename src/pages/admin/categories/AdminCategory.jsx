import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/common/popup.jsx";
import AdminCategoryForm from "./AdminCategoryForm.jsx";
import { BiPencil } from "react-icons/bi";
import { BsTrash2, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import API_URL from "../../../api/api.js";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API_URL.get("/category/admin/all");
      setCategories(
        Array.isArray(res.data.categories) ? res.data.categories : []
      );
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (data) => {
    try {
      await API_URL.post("/category", data);
      toast.success("Category created successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating category");
      throw error;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await API_URL.put(`/category/${id}`, data);
      toast.success("Category updated successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating category");
      throw error;
    }
  };

  const handleDelete = async (category) => {
    try {
      await API_URL.delete(`/category/${category._id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await API_URL.patch(`/category/${category._id}/disable`);
      toast.success(
        `Category ${category.isActive ? "disabled" : "enabled"} successfully!`
      );
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error toggling category status"
      );
    }
  };

  const buildHierarchy = (cats, parentId = null, level = 0) => {
    return cats
      .filter((cat) => (cat.parent?._id || null) === parentId)
      .map((cat) => ({
        ...cat,
        level,
        children: buildHierarchy(cats, cat._id, level + 1),
      }));
  };

  const flattenHierarchy = (hierarchy) => {
    const result = [];
    hierarchy.forEach((item) => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        result.push(...flattenHierarchy(item.children));
      }
    });
    return result;
  };

  const hierarchy = buildHierarchy(categories);
  const flatCategories = flattenHierarchy(hierarchy);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 flex items-center gap-2">
            Category Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage product categories and hierarchies
          </p>
        </div>
        <button
          onClick={() => setOpenCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <AdminCategoryForm
          closeModal={() => setOpenCreateModal(false)}
          onCategoryAdded={fetchCategories}
          allCategories={categories}
        />
      </Modal>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        {selectedCategory && (
          <AdminCategoryForm
            categoryData={selectedCategory}
            closeModal={() => setOpenEditModal(false)}
            onCategoryAdded={fetchCategories}
            allCategories={categories}
          />
        )}
      </Modal>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64">
            <FaFolderOpen className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-gray-500 text-xl font-semibold">
              No Categories Found
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Create your first category to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flatCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {category.level > 0 && (
                          <span
                            className="flex items-center text-sm font-medium text-gray-900"
                            style={{ marginLeft: `${category.level * 24}px` }}
                          >
                            └─
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-5 h-5 object-cover rounded-lg ml-1"
                            />
                            <span className="ml-1">{category.name}</span>
                          </span>
                        )}
                        {category.level === 0 && (
                          <span className="flex items-center text-sm font-medium text-gray-900">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-5 h-5 object-cover rounded-lg mr-1"
                            />
                            {category.name}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 font-mono">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() =>
                          setSelectedCategory(category) ||
                          setOpenEditModal(true)
                        }
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg"
                      >
                        <BiPencil />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(category)}
                        className={`inline-flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                          category.isActive
                            ? "text-green-600 bg-green-100 hover:bg-green-200"
                            : "text-red-600 bg-red-100 hover:bg-red-200"
                        }`}
                      >
                        {category.isActive ? <BsToggleOn /> : <BsToggleOff />}
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-200 rounded-lg"
                      >
                        <BsTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategory;
