import React from "react";
import Table from "../common/Table.jsx";
import CategoryRow from "./CategoryRow.jsx";

const CategoryTable = ({ flatCategories, onEdit, onToggleStatus, onDelete }) => {
    const tableHeaders = [
        { label: "Category Name" },
        { label: "Slug" },
        { label: "Status", className: "text-center" },
        { label: "Actions", className: "text-center" },
    ];

    const renderRow = (category) => (
        <CategoryRow
            key={category._id}
            category={category}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
        />
    );

    return (
        <Table
            headers={tableHeaders}
            data={flatCategories}
            renderRow={renderRow}
        />
    );
};

export default CategoryTable;
