import React, { useEffect, useState } from "react";

const UpdateOrderStatusModal = ({ isOpen, closeModal, order, onSave }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (order) {
        setStatus(order.status || "");
      } else {
        setStatus("");
      }
    }
  }, [isOpen, order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status) return;
    const data = { _id: order._id, status };
    onSave(data);
    closeModal();
  };

  const handleClose = () => {
    closeModal();
    setStatus("");
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
            Cập nhật trạng thái đơn hàng
          </h2>
          <hr className="border-t border-gray-600 opacity-50" />

          <div className="grid grid-cols-4 gap-4 items-center mb-4 mt-4">
            <label
              htmlFor="status"
              className="col-span-1 text-sm font-semibold"
            >
              Trạng thái:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="col-span-3 p-2 border rounded"
              required
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="pending">Chờ xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đã gửi hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
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
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderStatusModal;
