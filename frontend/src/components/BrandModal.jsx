import React, { useState, useEffect } from "react";

const BrandModal = ({ isOpen, closeModal, brand, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (brand) {
        setName(brand.name || "");
        setDescription(brand.description || "");
      } else {
        resetForm();
      }
    }
  }, [isOpen, brand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, description };
    if (brand && brand._id) {
      data._id = brand._id;
    }
    onSave(data);
    resetForm();
    closeModal();
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">
            {brand ? "Chỉnh sửa Thương hiệu" : "Thêm Thương hiệu"}
          </h2>
          <hr className="border-t border-gray-600 opacity-50" />
          {/* Tên thương hiệu */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Tên thương hiệu:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nhập tên thương hiệu"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Mô tả */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Mô tả:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả thương hiệu"
              className="w-full p-2 border rounded"
            />
          </div>

          <hr className="border-t border-gray-600 opacity-50 mb-4" />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {brand ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;
