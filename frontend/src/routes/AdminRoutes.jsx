// // AdminRoutes.jsx
import { Routes, Route, Navigate,Outlet  } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
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
