import React, { useState, useEffect } from "react";

const UserModal = ({ isOpen, closeModal, user, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setIsAdmin(user.isAdmin || false);
        setPassword(""); // không hiển thị password cũ
      } else {
        resetForm();
      }
    }
  }, [isOpen, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, isAdmin };
    if (!user) {
      data.password = password;
    } else {
      data._id = user._id;
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
    setEmail("");
    setPassword("");
    setIsAdmin(false);
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
            {user ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </h2>
          <hr className="border-t border-gray-600 opacity-50" />

          {/* Tên người dùng */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Tên người dùng:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nhập tên người dùng"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nhập email người dùng"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Mật khẩu (chỉ khi thêm mới) */}
          {!user && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Mật khẩu:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu"
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Vai trò */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span className="text-sm font-medium">Là quản trị viên (Admin)</span>
            </label>
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
              {user ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
