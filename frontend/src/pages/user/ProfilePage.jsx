import { useEffect, useState } from "react";
import { getUser, updateUser, changePassword } from "../../service/userApi"; // Thêm hàm changePassword nếu có
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { userLogin } from "../../redux/slices/userSlice"; // đường dẫn đúng của bạn
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
        setFormData({ name: data.name, email: data.email });
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.userInfo?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, formData);
      toast.success("Cập nhật thành công!");
  
      // Cập nhật Redux store
      dispatch(userLogin({ user: { ...user, ...formData }, token }));
  
      // Cập nhật local state để hiển thị ngay
      setUser((prev) => ({ ...prev, ...formData }));
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };
  
  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }); // Gọi API
      toast.success("Đổi mật khẩu thành công!");
      setShowModal(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-xl overflow-hidden p-6 md:flex gap-8">
        <div className="md:w-1/3 text-center border-r md:border-r-0 border-b md:border-b-0 pb-6 md:pb-0 md:pr-6">
          <FaUserCircle className="text-6xl mx-auto text-gray-400" />
          <h3 className="text-xl font-semibold mt-2">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
          >
            Đổi mật khẩu
          </button>
        </div>

        <div className="md:w-2/3">
          <h2 className="text-lg font-bold mb-4">Cập nhật thông tin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Họ tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>

      {/* Modal đổi mật khẩu */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
