import api from "../utils/api";

export const getUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

export const deleteUser = async (id) => {
  return await api.delete(`/api/users/${id}`);
};

export const updateUser = async (id, data) => {
  return await api.put(`/api/users/${id}`, data);
};

export const createUser = async (data) => {
  return await api.post("/api/register", data);
};
// ✅ Thêm hàm gọi API block / unblock
export const toggleBlockUser = async (id) => {
    return await api.patch(`/api/users/${id}/block`);
  };
  // ✅ Lấy thông tin user từ token
export const getUser = async () => {
  const res = await api.get("/api/users/me");
  return res.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await api.post("/api/users/change-password", {
    currentPassword,
    newPassword,
  });
  return res.data;
};