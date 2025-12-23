import { useEffect, useState } from "react";
import { getActiveCategories } from "../api/categoryApi.js";
import { FaFolderOpen, FaChevronRight } from "react-icons/fa";

const CategoryFilter = ({ selectedCategory, onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getActiveCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    // Build hierarchical structure
    const buildHierarchy = (cats, parentId = null) => {
        return cats
            .filter(cat => {
                const catParentId = cat.parent?._id || null;
                return catParentId === parentId;
            })
            .map(cat => ({
                ...cat,
                children: buildHierarchy(cats, cat._id)
            }));
    };

    const hierarchy = buildHierarchy(categories);

    const renderCategory = (category, level = 0) => {
        const isSelected = selectedCategory === category._id;
        const hasChildren = category.children && category.children.length > 0;

        return (
            <div key={category._id}>
                <button
                    onClick={() => onCategorySelect(category._id)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${isSelected
                            ? "bg-blue-600 text-white font-medium"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    style={{ paddingLeft: `${16 + level * 16}px` }}
                >
                    {level > 0 && <FaChevronRight className="text-xs" />}
                    <FaFolderOpen className="text-sm" />
                    <span className="flex-1">{category.name}</span>
                </button>
                {hasChildren && (
                    <div>
                        {category.children.map(child => renderCategory(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <FaFolderOpen />
                    Categories
                </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="spinner"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                        No categories available
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => onCategorySelect(null)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 border-b border-gray-200 ${selectedCategory === null
                                    ? "bg-blue-600 text-white font-medium"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            <FaFolderOpen className="text-sm" />
                            <span className="flex-1">All Categories</span>
                        </button>
                        {hierarchy.map(category => renderCategory(category))}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;
