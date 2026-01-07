import React from "react";
import Table from "../common/Table.jsx";
import ProductRow from "./ProductRow.jsx";

const ProductTable = ({ products, onEdit, onDelete, showActions = true, userData }) => {
    const tableHeaders = [
        { label: "Image" },
        { label: "Name" },
        { label: "Serial No." },
        { label: "Quantity", className: "text-center" },
        { label: "Price", className: "text-center" },
        ...(showActions || userData?.user?.role === "superAdmin"
            ? [{ label: "Action", className: "text-center" }]
            : []),
    ];

    const renderRow = (product) => (
        <ProductRow
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
            userData={userData}
        />
    );

    return (
        <Table
            headers={tableHeaders}
            data={products}
            renderRow={renderRow}
        />
    );
};

export default ProductTable;
