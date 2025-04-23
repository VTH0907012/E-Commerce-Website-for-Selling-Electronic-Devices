import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    // <BrowserRouter>
    //   <AdminRoutes />
    //   <UserRoutes />
    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        {/* Chỉ invoke AdminRoutes cho path="/admin/*" */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Còn lại cho UserRoutes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
