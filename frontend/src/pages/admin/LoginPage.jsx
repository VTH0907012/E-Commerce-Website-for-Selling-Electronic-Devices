// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username === 'admin' && password === 'admin123') {
//       // Redirect nếu đăng nhập thành công
//       navigate('/admin/dashboard');
//     } else {
//       setError('Tên đăng nhập hoặc mật khẩu không đúng');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Đăng nhập Admin</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Tên đăng nhập</label>
//             <input
//               id="username"
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
//             <input
//               id="password"
//               type="password"
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//             Đăng nhập
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLogin } from "../../redux/slices/adminSlice";
import api from "../../utils/api"; // <- Đảm bảo bạn đã config axios ở đây

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/login", {
        email: username,
        password,
      });

      const { token, user } = res.data;

      if (!user?.isAdmin) {
        return setError("Bạn không có quyền truy cập admin");
      }

      // Lưu vào Redux
      dispatch(adminLogin({ token, user }));

      // Chuyển hướng đến dashboard
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập Admin</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-800 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
