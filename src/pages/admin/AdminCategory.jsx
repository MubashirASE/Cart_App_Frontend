import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllAdminCategories,
  deleteCategory,
  toggleCategoryStatus,
} from "../../api/categories";
import Modal from "../../components/common/popup.jsx";
import AdminCategoryForm from "./AdminCategoryForm.jsx";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import PageHeader from "../../components/common/PageHeader.jsx";
import Button from "../../components/common/Button.jsx";
import CategoryTable from "../../components/admin/CategoryTable.jsx";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllAdminCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (category) => {
    try {
      await deleteCategory(category._id);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await toggleCategoryStatus(category._id);
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

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenEditModal(true);
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
    <div className="min-h-screen py-8 px-8 bg-gray-50">
      <PageHeader
        title="Category Management"
        subtitle="Manage product categories and hierarchies"
        action={
          <Button onClick={() => setOpenCreateModal(true)}>
            <div className="flex items-center gap-2">
              <FaPlus /> Add Category
            </div>
          </Button>
        }
      />

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
          <CategoryTable
            flatCategories={flatCategories}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCategory;
