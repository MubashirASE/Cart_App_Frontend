import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllAdminCategories,
  deleteCategory,
  toggleCategoryStatus,
} from "../../api/categories";
import Modal from "../../components/common/popup.jsx";
import AdminCategoryForm from "../../components/admin/AdminCategoryForm.jsx";
import UpdateCategoryForm from "../../components/admin/UpdateCategoryForm.jsx";
import ConfirmationModal from "../../components/common/ConfirmationModal.jsx";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete._id);
      toast.success("Category deleted successfully!");
      fetchCategories();
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await toggleCategoryStatus(category._id);
      const isNowActive = !category.isActive;
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === category._id ? { ...cat, isActive: isNowActive } : cat
        )
      );

      if (isNowActive) {
        toast.success(`Category enabled successfully!`);
      } else {
        toast.error(`Category disabled successfully!`);
      }
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
    <div className="min-h-screen py-4 px-4 md:py-8 md:px-8 bg-gray-50">

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
          <UpdateCategoryForm
            categoryData={selectedCategory}
            closeModal={() => setOpenEditModal(false)}
            onCategoryAdded={fetchCategories}
            allCategories={categories}
          />
        )}
      </Modal>

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        itemName={categoryToDelete?.name}
      />

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
