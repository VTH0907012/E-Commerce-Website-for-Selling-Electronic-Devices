import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
  toggleBlockUser
} from "../../service/userApi";
import { toast } from "react-toastify";
import UserModal from "../../components/UserModal";

const ITEMS_PER_PAGE = 8;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lấy danh sách người dùng");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này?")) {
      try {
        await deleteUser(id);
        toast.success("Xoá người dùng thành công");
        fetchUsers();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Xoá thất bại");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateUser(data._id, data);
        toast.success("Cập nhật người dùng thành công");
      } else {
        await createUser(data);
        toast.success("Thêm người dùng thành công");
      }
      fetchUsers();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Lưu người dùng thất bại");
    }
  };

  const handleToggleBlock = async (user) => {
    const action = user.isBlocked ? "mở khoá" : "khoá";
    if (window.confirm(`Bạn có chắc muốn ${action} tài khoản này?`)) {
      try {
        await toggleBlockUser(user._id);
        toast.success(`Đã ${action} tài khoản`);
        fetchUsers();
      } catch (error) {
        console.error(error);
        toast.error(`Không thể ${action} tài khoản`);
      }
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý tài khoản</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={handleAdd}
        >
          + Thêm người dùng
        </button>
      </div>
      <hr className="mb-3" />

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.isAdmin ? "Admin" : "Khách hàng"}</td>
                <td className="px-4 py-2">
                  {u.isBlocked ? (
                    <span className="text-red-500 font-semibold">Đã bị khoá</span>
                  ) : (
                    <span className="text-green-600">Hoạt động</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Xoá
                  </button>
                  <button
                    onClick={() => handleToggleBlock(u)}
                    className={`${
                      u.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    } text-white px-3 py-1 rounded shadow`}
                  >
                    {u.isBlocked ? "Mở khoá" : "Khoá"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {openModal && (
        <UserModal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserListPage;
