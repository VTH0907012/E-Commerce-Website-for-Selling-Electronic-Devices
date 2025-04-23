// // AdminRoutes.jsx
import { Routes, Route, Navigate,Outlet  } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import CategoryListPage from "../pages/admin/CategoryListPage";
import ProductListPage from "../pages/admin/ProductListPage";
import OrderListPage from "../pages/admin/OrderListPage";
import UserListPage from "../pages/admin/UserListPage";
import BrandListPage from "../pages/admin/BrandListPage";
import { useSelector } from "react-redux";
import BlogsListPage from "../pages/admin/BlogsListPage";

//Add
const RequireUserAuth = () => {
  const token = useSelector((state) => state.user?.userInfo?.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
//
const AdminRoutes = () => (
  <Routes>
    {/* <Route path="login" element={<LoginPage />} /> */}

    <Route path="" element={<AdminLayout />}>
    
      <Route element={<RequireUserAuth />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="categories" element={<CategoryListPage />} />
        <Route path="brand" element={<BrandListPage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="orders" element={<OrderListPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="blogs" element={<BlogsListPage />} />

        {/* fallback riêng cho admin */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Route>
  </Routes>
);
export default AdminRoutes;

// import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AdminLayout from "../layouts/AdminLayout";
// import LoginPage from "../pages/admin/LoginPage";
// import DashboardPage from "../pages/admin/DashboardPage";
// import CategoryListPage from "../pages/admin/CategoryListPage";
// import ProductListPage from "../pages/admin/ProductListPage";
// import OrderListPage from "../pages/admin/OrderListPage";
// import UserListPage from "../pages/admin/UserListPage";

// const RequireAdminAuth = () => {
//   const { token, isAdmin } = useSelector((state) => state.adminAuth);
//   return token && isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
// };

// const AdminRoutes = () => (
//   <Routes>
//     <Route path="login" element={<LoginPage />} />

//     {/* Các route cần đăng nhập */}
//     <Route element={<RequireAdminAuth />}>
//       <Route element={<AdminLayout />}>
//         <Route index element={<DashboardPage />} />
//         <Route path="dashboard" element={<DashboardPage />} />
//         <Route path="categories" element={<CategoryListPage />} />
//         <Route path="products" element={<ProductListPage />} />
//         <Route path="orders" element={<OrderListPage />} />
//         <Route path="users" element={<UserListPage />} />
//         <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//       </Route>
//     </Route>
//   </Routes>
// );

// export default AdminRoutes;
