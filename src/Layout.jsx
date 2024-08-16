import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="bg-gray-900 text-white p-2  relative">
      <div className="flex h-[98vh] gap-4">
        {/* <Header /> */}

        <div className="w-1/6 border border-gray-400 rounded-xl p-4 flex flex-col  justify-between">
          <Sidebar />
        </div>
        <div className="w-5/6 border border-gray-400 rounded-xl p-4">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
