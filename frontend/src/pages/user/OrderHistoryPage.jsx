import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUser, deleteOrder } from "../../service/cartApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart, AiOutlineClockCircle } from "react-icons/ai";

const OrderHistoryPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const statusMap = {
    pending: "Đang chờ xử lý",
    processing: "Đang xử lý",
    shipped: "Đã gửi hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  };

  const statusColorMap = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userInfo?.id) {
          const res = await getOrdersByUser(userInfo.id);
          setOrders(res.orders || []);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  const handleToggle = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không?")) {
      try {
        await deleteOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
        toast.success("Đã huỷ đơn hàng thành công.");
      } catch (error) {
        console.log(error);
        toast.error("Không thể huỷ đơn hàng. Vui lòng thử lại.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Đang tải dữ liệu...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <AiOutlineShoppingCart className="text-blue-600" />
        <AiOutlineClockCircle className="text-yellow-600" />
        Lịch sử đơn hàng của bạn
      </h1>
      <hr className="mb-5" />
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-6 mb-6 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <p>
                <span className="font-semibold">Mã đơn:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Ngày đặt:</span>{" "}
                {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Trạng thái:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    statusColorMap[order.status]
                  }`}
                >
                  {statusMap[order.status]}
                </span>
              </p>
              <p>
                <span className="font-semibold">Tổng tiền:</span>{" "}
                {order.total.toLocaleString("vi-VN")}₫
              </p>
            </div>

            <div className="text-right">
              <button
                onClick={() => handleToggle(order._id)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                {expandedOrderId === order._id ? "Ẩn chi tiết" : "Xem chi tiết"}
              </button>

              {order.status === "pending" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Huỷ đơn
                </button>
              )}
            </div>
          </div>

          {expandedOrderId === order._id && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
              {order.shippingInfo ? (
                <>
                  <p>
                    <span className="font-semibold">Tên:</span>{" "}
                    {order.shippingInfo.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">SĐT:</span>{" "}
                    {order.shippingInfo.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Địa chỉ:</span>{" "}
                    {order.shippingInfo.address}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Phương thức thanh toán:
                    </span>{" "}
                    {(
                      order.shippingInfo.paymentMethod || "Không có thông tin"
                    ).toUpperCase()}
                  </p>
                </>
              ) : (
                <p className="text-red-500">Không có thông tin giao hàng.</p>
              )}

              <h3 className="font-semibold mt-4 mb-2">Danh sách sản phẩm</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item._id}>
                    Sản phẩm ID:{" "}
                    <span className="text-blue-600">{item._id}</span> – SL:{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
