import api from "../utils/api";

export const checkoutCart = async (payload) => {
  const res = await api.post("/api/orders", payload);
  return res.data;
};
// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  const res = await api.get("/api/orders/all");
  return res.data;
};

// Xoá đơn hàng theo ID
export const deleteOrder = async (id) => {
  const res = await api.put(`/api/orders/${id}/cancel`);
  return res.data;
};

// Cập nhật đơn hàng theo ID
export const updateOrder = async (id, updatedData) => {  
  const res = await api.put(`/api/orders/${id}/status`, updatedData);  
  return res.data;
};
// ✅ Lấy đơn hàng theo userId
export const getOrdersByUser = async (userId) => {
  
  const res = await api.get(`/api/orders/user/${userId}`);
  return res.data;
};