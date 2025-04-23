import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import { FaHome, FaList, FaTag, FaBox, FaShoppingCart, FaUser, FaNewspaper } from "react-icons/fa"; // Import icons

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  const navLinks = [
    { to: "/admin/dashboard", label: "Trang chủ", icon: <FaHome className="text-blue-500" /> },
    { to: "/admin/categories", label: "Danh mục", icon: <FaList className="text-green-500" /> },
    { to: "/admin/brand", label: "Nhãn hiệu", icon: <FaTag className="text-red-500" /> },
    { to: "/admin/products", label: "Sản phẩm", icon: <FaBox className="text-yellow-500" /> },
    { to: "/admin/orders", label: "Hoá đơn", icon: <FaShoppingCart className="text-purple-500" /> },
    { to: "/admin/users", label: "Tài khoản", icon: <FaUser className="text-pink-500" /> },
    { to: "/admin/blogs", label: "Tin tức", icon: <FaNewspaper className="text-amber-200-500" /> },

  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white w-64 shadow-md z-30 transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-200">
              <span>{icon}</span> {/* Render icon */}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3">
          {/* Toggle menu (mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 md:hidden">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div className="text-lg font-semibold hidden md:block">Admin Panel</div>

          {/* User avatar dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setTimeout(() => setShowDropdown(false), 1000)}
          >
            <button className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-200">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                {admin?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm">{admin?.name}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-50">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Đăng xuất
                </button>

                <button onClick={handleBack} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Quay lại
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminLayout;
