// import { useState } from "react";
// import { toast } from "react-toastify";
// import { createCategory, updateCategory } from "../../api/categories";

// const AdminCategoryForm = ({
//   closeModal,
//   onCategoryAdded,
//   categoryData = null,
//   allCategories = [],
// }) => {
//   const [name, setName] = useState(categoryData?.name || "");
//   const [parent, setParent] = useState(categoryData?.parent?._id || "");
//   const [isActive, setIsActive] = useState(categoryData?.isActive ?? true);
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const isEditMode = !!categoryData;

//   const availableParents = allCategories.filter((cat) => {
//     if (!categoryData) return true;
//     if (cat._id === categoryData._id) return false;
//     let currentParent = cat.parent;
//     while (currentParent) {
//       if (currentParent._id === categoryData._id) return false;
//       currentParent = currentParent.parent;
//     }
//     return true;
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       toast.error("Category name is required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name.trim());
//     console.log(formData);

//     if (parent) {
//       formData.append("parent", parent);
//       console.log(formData);
//     }
//     formData.append("isActive", isActive);
//     if (image) {
//       formData.append("image", image);
//       console.log(formData);
//     }

//     setLoading(true);
//     try {
//       if (isEditMode) {
//         await updateCategory(categoryData._id, formData);
//         toast.success("Category updated successfully!");
//       } else {
//         console.log(formData);
//         const res= await createCategory(formData);
//         if(res){
//           onCategoryAdded && onCategoryAdded();
//       closeModal();
//         }
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error saving category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 sm:p-8 max-h-[90vh] overflow-y-auto">
//       <div className="mb-6 ">
//         <h1 className="text-center text-3xl font-extrabold text-blue-600">
//           {isEditMode ? "Edit Category" : "Create Category"}
//         </h1>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           {isEditMode
//             ? "Update category details below"
//             : "Add new category details below"}
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//           <div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category Name *
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 placeholder="e.g., Electronics, Fashion, etc."
//                 onChange={(e) => setName(e.target.value)}
//                 className="appearance-none relative block w-full px-3 py-2
//               border border-gray-300 placeholder-gray-400 text-gray-900
//               rounded-md focus:outline-none focus:ring-blue-500
//               focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parent Category
//               </label>
//               <select
//                 value={parent}
//                 onChange={(e) => setParent(e.target.value)}
//                 className="appearance-none relative block w-full px-3 py-2
//               border border-gray-300 text-gray-900
//               rounded-md focus:outline-none focus:ring-blue-500
//               focus:border-blue-500 sm:text-sm"
//               >
//                 <option value="">None (Root Category)</option>
//                 {availableParents.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.parent ? `${cat.parent.name} → ` : ""}
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//               <p className="mt-1 text-xs text-gray-500">
//                 Leave empty to create a root category
//               </p>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category Image
//             </label>
//             <input
//               type="file"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//             />
//             {preview && (
//               <div className="w-45 h-40 pt-5">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-full h-full object-cover justify-center transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Category Status
//             </label>
//             <p className="text-xs text-gray-500 mt-1">
//               {isActive
//                 ? "Category is visible to users"
//                 : "Category is hidden from users"}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() => setIsActive(!isActive)}
//             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//               isActive ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           >
//             <span
//               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                 isActive ? "translate-x-6" : "translate-x-1"
//               }`}
//             />
//           </button>
//         </div>

//         <div className="flex gap-3 pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 py-2 px-4 border border-transparent text-sm font-medium
//               rounded-md text-white bg-blue-600 hover:bg-blue-700
//               focus:outline-none focus:ring-2 focus:ring-offset-2
//               focus:ring-blue-500 transition-colors disabled:opacity-50"
//           >
//             {loading
//               ? "Saving..."
//               : isEditMode
//               ? "Update Category"
//               : "Create Category"}
//           </button>
//           <button
//             type="button"
//             onClick={closeModal}
//             disabled={loading}
//             className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium
//               rounded-md text-gray-700 bg-white hover:bg-gray-50
//               focus:outline-none focus:ring-2 focus:ring-offset-2
//               focus:ring-blue-500 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminCategoryForm;
// import React, { useEffect, useReducer } from "react";
// import {
//   createCategory,
//   updateCategory,
//   getAllCategories,
// } from "../../api/categories";
// import { toast } from "react-toastify";
// import Input from "../common/Input";
// import Button from "../common/Button";
// import PageHeader from "../common/PageHeader.jsx";

// const initialState = {
//   name: "",
//   image: null,
//   preview: "",
//   loading: false,
//   categories: [],
//   selectedParentCategory: "",
//   selectedChildCategory: "",
//   isActive: true,
//   errors: {},
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_FIELD":
//       return {
//         ...state,
//         [action.field]: action.value,
//         errors: { ...state.errors, [action.field]: "" },
//       };
//     case "SET_IMAGE":
//       return {
//         ...state,
//         image: action.payload,
//         preview: URL.createObjectURL(action.payload),
//         errors: { ...state.errors, image: "" },
//       };
//     case "SET_CATEGORIES":
//       return { ...state, categories: action.payload };
//     case "SET_PARENT_CATEGORY":
//       return {
//         ...state,
//         selectedParentCategory: action.payload,
//         selectedCategory: "",
//         errors: { ...state.errors, category: "" },
//       };
//     case "SET_CHILD_CATEGORY":
//       return {
//         ...state,
//         selectedCategory: action.payload,
//         errors: { ...state.errors, category: "" },
//       };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_ERRORS":
//       return { ...state, errors: action.payload };
//     case "RESET_FORM":
//       return { ...initialState, categories: state.categories };
//     default:
//       return state;
//   }
// };

// const AdminCategoryForm = ({
//   closeModal,
//   onCategoryAdded,
//   categoryData = null,
// }) => {
//   const [state, dispatch] = useReducer(formReducer, initialState);
//   const isEditMode = !!categoryData;

//   const {
//     name,
//     image,
//     preview,
//     loading,
//     categories,
//     selectedParentCategory,
//     selectedChildCategory,
//     isActive,
//     errors,
//   } = state;

//   const parentCategories = categories.filter((cat) => !cat.parent);
//   const childCategories = categories.filter(
//     (cat) => cat.parent && String(cat.parent._id) === selectedParentCategory
//   );

//   const fetchCategories = async () => {
//     try {
//       const data = await getAllCategories();
//       const categoryList = Array.isArray(data) ? data : [];
//       dispatch({ type: "SET_CATEGORIES", payload: categoryList });

//       if (isEditMode && categoryData) {
//         if (categoryData.parent) {
//           dispatch({
//             type: "SET_PARENT_CATEGORY",
//             payload: categoryData.parent._id,
//           });
//           if (childCategories.length > 0 && categoryData._id) {
//             dispatch({ type: "SET_CHILD_CATEGORY", payload: categoryData._id });
//           }
//         } else {
//           dispatch({
//             type: "SET_FIELD",
//             field: "name",
//             value: categoryData.name,
//           });
//         }

//         if (categoryData.image) {
//           dispatch({
//             type: "SET_FIELD",
//             field: "preview",
//             value: categoryData.image,
//           });
//         }

//         dispatch({
//           type: "SET_FIELD",
//           field: "isActive",
//           value: categoryData.isActive ?? true,
//         });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error fetching categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) dispatch({ type: "SET_IMAGE", payload: file });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = "Category name is required";
//     if (!image && !preview) newErrors.image = "Category image is required";
//     if (!selectedParentCategory)
//       newErrors.category = "Parent category is required";
//     else if (childCategories.length > 0 && !selectedChildCategory)
//       newErrors.category = "Child category is required";

//     dispatch({ type: "SET_ERRORS", payload: newErrors });
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const formData = new FormData();
//     formData.append("name", name.trim());
//     formData.append("isActive", isActive ? "true" : "false");

//     if (selectedChildCategory) formData.append("parent", selectedChildCategory);
//     else if (selectedParentCategory)
//       formData.append("parent", selectedParentCategory);

//     if (image) formData.append("image", image);

//     dispatch({ type: "SET_LOADING", payload: true });

//     try {
//       if (isEditMode) {
//         await updateCategory(categoryData._id, formData);
//         toast.success("Category updated successfully!");
//       } else {
//         await createCategory(formData);
//         toast.success("Category created successfully!");
//       }
//       onCategoryAdded && onCategoryAdded();
//       closeModal();
//       dispatch({ type: "RESET_FORM" });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error saving category");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   return (
//     <div className="p-8 sm:p-8 max-h-[90vh] overflow-y-auto">
//       <PageHeader
//         title={isEditMode ? "Edit Category" : "Create Category"}
//         subtitle={
//           isEditMode
//             ? "Update category details below"
//             : "Add new category details below"
//         }
//       />

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Input
//               label="Category Name *"
//               type="text"
//               value={name}
//               placeholder="e.g., Electronics, Fashion, etc."
//               onChange={(e) =>
//                 dispatch({
//                   type: "SET_FIELD",
//                   field: "name",
//                   value: e.target.value,
//                 })
//               }
//               error={errors.name}
//             />

//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 value={selectedParentCategory}
//                 onChange={(e) =>
//                   dispatch({
//                     type: "SET_PARENT_CATEGORY",
//                     payload: e.target.value,
//                   })
//                 }
//                 className={`w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.category ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">-- Select Parent Category --</option>
//                 {parentCategories.map((parent) => (
//                   <option key={parent._id} value={parent._id}>
//                     {parent.name}
//                   </option>
//                 ))}
//               </select>

//               {childCategories.length > 0 && (
//                 <select
//                   value={selectedChildCategory}
//                   onChange={(e) =>
//                     dispatch({
//                       type: "SET_CHILD_CATEGORY",
//                       payload: e.target.value,
//                     })
//                   }
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
//                     errors.category ? "border-red-500" : "border-gray-300"
//                   }`}
//                 >
//                   <option value="">-- Select Child Category --</option>
//                   {childCategories.map((child) => (
//                     <option key={child._id} value={child._id}>
//                       {child.name}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {errors.category && (
//                 <p className="text-xs text-red-500 mt-1">{errors.category}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category Image
//             </label>
//             <input
//               type="file"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//             {preview && (
//               <div className="w-45 h-40 pt-5">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-full h-full object-cover transition-transform duration-300"
//                 />
//               </div>
//             )}
//             {errors.image && (
//               <p className="text-xs text-red-500 mt-1">{errors.image}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Category Status
//             </label>
//             <p className="text-xs text-gray-500 mt-1">
//               {isActive
//                 ? "Category is visible to users"
//                 : "Category is hidden from users"}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               dispatch({
//                 type: "SET_FIELD",
//                 field: "isActive",
//                 value: !isActive,
//               })
//             }
//             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//               isActive ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           >
//             <span
//               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                 isActive ? "translate-x-6" : "translate-x-1"
//               }`}
//             />
//           </button>
//         </div>

//         <div className="flex gap-3 pt-4">
//           <Button type="submit" className="flex-1" disabled={loading}>
//             {loading
//               ? isEditMode
//                 ? "Updating..."
//                 : "Creating..."
//               : isEditMode
//               ? "Update Category"
//               : "Create Category"}
//           </Button>
//           <Button
//             type="button"
//             onClick={closeModal}
//             className="flex-1 bg-gray-200 text-gray-700"
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminCategoryForm;
import React, { useEffect, useReducer } from "react";
import { createCategory, getAllCategories } from "../../api/categories";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Button from "../common/Button";
import PageHeader from "../common/PageHeader.jsx";

const initialState = {
  name: "",
  image: null,
  preview: "",
  loading: false,
  categories: [],
  selectedParentCategory: "",
  selectedChildCategory: "",
  isActive: true,
  errors: {},
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "SET_IMAGE":
      return { ...state, image: action.payload, preview: URL.createObjectURL(action.payload), errors: { ...state.errors, image: "" } };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PARENT_CATEGORY":
      return { ...state, selectedParentCategory: action.payload, selectedChildCategory: "", errors: { ...state.errors, category: "" } };
    case "SET_CHILD_CATEGORY":
      return { ...state, selectedChildCategory: action.payload, errors: { ...state.errors, category: "" } };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "RESET_FORM":
      return { ...initialState, categories: state.categories };
    default:
      return state;
  }
};

const AdminCategoryForm = ({ closeModal, onCategoryAdded }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { name, image, preview, loading, categories, selectedParentCategory, selectedChildCategory, isActive, errors } = state;

  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter(
    (cat) => cat.parent && String(cat.parent._id) === selectedParentCategory
  );

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      dispatch({ type: "SET_CATEGORIES", payload: Array.isArray(data) ? data : [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch({ type: "SET_IMAGE", payload: file });
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Category name is required";
    if (!image && !preview) newErrors.image = "Category image is required";
    if (!selectedParentCategory) newErrors.category = "Parent category is required";
    else if (childCategories.length > 0 && !selectedChildCategory) newErrors.category = "Child category is required";

    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("isActive", isActive ? "true" : "false");

    if (selectedChildCategory) formData.append("parent", selectedChildCategory);
    else if (selectedParentCategory) formData.append("parent", selectedParentCategory);

    if (image) formData.append("image", image);

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await createCategory(formData);
      toast.success("Category created successfully!");
      onCategoryAdded && onCategoryAdded();
      closeModal();
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating category");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="p-8 sm:p-8 max-h-[90vh] overflow-y-auto">
      <PageHeader title="Create Category" subtitle="Add new category details below" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Category Name *"
              type="text"
              value={name}
              placeholder="e.g., Electronics, Fashion, etc."
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
              error={errors.name}
            />

            <div className="mt-4 flex flex-col space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedParentCategory}
                onChange={(e) => dispatch({ type: "SET_PARENT_CATEGORY", payload: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">-- Select Parent Category --</option>
                {parentCategories.map((parent) => (
                  <option key={parent._id} value={parent._id}>{parent.name}</option>
                ))}
              </select>

              {childCategories.length > 0 && (
                <select
                  value={selectedChildCategory}
                  onChange={(e) => dispatch({ type: "SET_CHILD_CATEGORY", payload: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">-- Select Child Category --</option>
                  {childCategories.map((child) => (
                    <option key={child._id} value={child._id}>{child.name}</option>
                  ))}
                </select>
              )}

              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <div className="w-45 h-40 pt-5">
                <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform duration-300" />
              </div>
            )}
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Status</label>
            <p className="text-xs text-gray-500 mt-1">{isActive ? "Category is visible to users" : "Category is hidden from users"}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_FIELD", field: "isActive", value: !isActive })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </Button>
          <Button type="button" onClick={closeModal} className="flex-1 bg-gray-200 text-gray-700" disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryForm;
