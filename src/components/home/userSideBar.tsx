"use client";

import { Sidebar } from "../../components/home/homesidebar"
import React, { useState } from "react";

export default function UserSideBar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div>
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

    </div>
  );
}
