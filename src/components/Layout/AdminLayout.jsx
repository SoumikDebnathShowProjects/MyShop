import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AdminMenu from "./AdminMenu";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10">
      <Header />

      <div className="flex flex-grow">
        {/* Admin sidebar */}
        <aside className="w-64 p-4 border-r border-gray-700">
          <AdminMenu />
        </aside>

        {/* Page content */}
        <main className="flex-grow p-4">
          <Toaster />
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
