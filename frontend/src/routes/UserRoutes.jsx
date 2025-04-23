// import { Routes, Route, Navigate  } from "react-router-dom";
// import UserLayout from "../layouts/UserLayout";
// import HomePage from "../pages/user/HomePage";
// import ProductList from "../pages/user/ProductList";
// import CartPage from "../pages/user/CartPage";
// import CheckoutPage from "../pages/user/CheckoutPage";
// import LoginPage from "../pages/user/LoginPage";

// const UserRoutes = () => {
//   return (
//     <Routes>
//         <Route path="/*" element={<UserLayout />}>
//           <Route index           element={<HomePage />} />
//           <Route path="products" element={<ProductList />} />
//           <Route path="cart"     element={<CartPage />} />
//           <Route path="checkout" element={<CheckoutPage />} />
//           <Route path="login"    element={<LoginPage />} />
//           <Route path="*"        element={<Navigate to="/" replace />} />
//         </Route>
//     </Routes>
//   );
// };

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/user/HomePage";
import ProductList from "../pages/user/ProductList";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import OrderHistoryPage from "../pages/user/OrderHistoryPage";
import ProductDetail from "../pages/user/ProductDetail";

import BlogsDetailPage from "../pages/user/BlogsDetailPage";
import BlogsOverviewPage from "../pages/user/BlogsOverviewPage";
import ProfilePage from "../pages/user/ProfilePage";

// Component bảo vệ route người dùng
const RequireUserAuth = () => {
  const token = useSelector((state) => state.user?.userInfo?.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="blogs" element={<BlogsOverviewPage />} />
        <Route path="blogs/:id" element={<BlogsDetailPage />} />

        {/* Đăng nhập */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Bảo vệ route checkout (đăng nhập mới vào được) */}
        <Route element={<RequireUserAuth />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-history" element={<OrderHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />

        </Route>

        {/* Redirect cho route không xác định */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
