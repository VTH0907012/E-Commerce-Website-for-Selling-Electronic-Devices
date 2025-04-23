import React from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import FooterUser from "../components/FooterUser";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-grey-100">
      <HeaderUser />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <FooterUser />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default UserLayout;
