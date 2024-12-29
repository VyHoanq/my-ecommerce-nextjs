"use client";
import Sidebar from "@/components/backend/layout/SideBar";
import Navbar from "@/components/backend/navigations/Navbar";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="  lg:ml-60 md:ml-10 ml-0 flex-grow bg-white min-h-screen w-full overflow-y-scroll">
        {/* Header */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="bg-slate-100 p-8 dark:bg-neutral-800 text-slate-50 min-h-screen mt-16">
          {children}
        </main>
        {/* Main */}
      </div>
      {/* Main Body */}
    </div>
  );
}
