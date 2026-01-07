import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  const handleBgClose = (e) => {
    if (e.target.id === "modalBg") onClose();
  };

  return (
    <div
      id="modalBg"
      onClick={handleBgClose}
      className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-lg p-5 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
