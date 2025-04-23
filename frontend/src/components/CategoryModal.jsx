import React, { useEffect, useState } from "react";

const CategoryModal = ({ isOpen, closeModal, category, onSave }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);

  // useEffect(() => {
  //   if (category) {
  //     setName(category.name || "");
  //     setPreview(category.icon ? `data:image/png;base64,${category.icon}` : null);
  //   } else {
  //     resetForm(); // reset nếu không có category
  //   }
  // }, [category]);
  useEffect(() => {
    if (isOpen) {
      if (category) {
        setName(category.name || "");
        setPreview(
          category.icon ? `data:image/png;base64,${category.icon}` : null
        );
      } else {
        resetForm();
      }
    }
  }, [isOpen, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    if (category && category._id) {
      data._id = category._id;
    }
    if (icon) {
      data.icon = icon;
    }

    onSave(data);
    resetForm(); // reset sau khi lưu
    closeModal(); // đóng modal sau khi submit
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setName("");
    setIcon(null);
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setIcon(base64);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
          </h2>
          <hr className="border-t border-gray-600 opacity-50" />
          {/* Tên danh mục */}
          <div className="grid grid-cols-4 gap-4 items-center mb-4 mt-4">
            <label htmlFor="name" className="col-span-1 text-sm font-semibold">
              Danh mục:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nhập tên danh mục"
              className="col-span-3 p-2 border rounded"
            />
          </div>

          {/* Hình ảnh */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <label htmlFor="icon" className="col-span-1 text-sm font-semibold">
              Hình ảnh:
            </label>
            <div className="col-span-3 flex items-center space-x-4">
              <label
                htmlFor="icon"
                className="px-2 py-1 bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Chọn ảnh
              </label>
              <input
                type="file"
                id="icon"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {preview && (
              <div className="col-start-2 col-span-3 mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-contain rounded"
                />
              </div>
            )}
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
              {category ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
