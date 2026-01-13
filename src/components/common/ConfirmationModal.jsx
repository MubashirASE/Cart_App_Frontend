import React, { useEffect } from "react";
import Modal from "./popup";
import Button from "./Button";
const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item?",
    itemName = "",
}) => {
    useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
    return (
        <Modal open={open} onClose={onClose} >
            <div className="p-4 text-center ">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">
                    {message}
                    {itemName && (
                        <span className="block font-medium text-gray-900 mt-1">
                            "{itemName}"
                        </span>
                    )}
                </p>
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
