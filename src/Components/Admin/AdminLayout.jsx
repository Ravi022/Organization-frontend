import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Components/AdminHeader/AdminHeader";

export default function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
}
