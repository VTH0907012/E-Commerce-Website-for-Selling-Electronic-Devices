import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder, updateOrder } from "../../service/cartApi";
import { toast } from "react-toastify";
import UpdateOrderStatusModal from "../../components/UpdateOrderStatusModal"; // import modal mới
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal"; // Import ConfirmDeleteModal

const ITEMS_PER_PAGE = 8;

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.orders); // ✅ chỉ định đúng mảng đơn hàng
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      toast.error("Không thể tải đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (selectedOrderToDelete) {
      try {
        await deleteOrder(selectedOrderToDelete._id);
        toast.success("Đã xoá đơn hàng");
        fetchOrders();
        setShowDeleteModal(false); // Close the modal after deletion
      } catch (error) {
        console.log(error);
        toast.error("Xoá thất bại");
      }
    }
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [selectedOrderToDelete, setSelectedOrderToDelete] = useState(null); // Store order to delete

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveStatus = async (data) => {
    try {
      const body = {
        status: data.status
      };
      await updateOrder(data._id, body); // gọi API cập nhật trạng thái
      toast.success("Đã cập nhật trạng thái");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý Đơn hàng</h1>
      </div>
      <hr className="mb-3" />

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Mã đơn</th>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Tổng tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.shippingInfo.fullName}</td>
                <td className="px-4 py-2">{order.total.toLocaleString()}₫</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "completed"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(order)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrderToDelete(order); // Set the order to delete
                      setShowDeleteModal(true); // Show the delete confirmation modal
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Order Status Modal */}
        <UpdateOrderStatusModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          order={selectedOrder}
          onSave={handleSaveStatus}
        />

        {/* Confirm Delete Modal */}
        {showDeleteModal && (
          <ConfirmDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirmation}
            content="Bạn có chắc chắn muốn xoá hoá đơn này không?"

          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
