import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * RootLayout Component
 *
 * Main layout wrapper that includes:
 * - Collapsible sidebar (auto-collapsed by default)
 * - Main content area with proper spacing
 * - Responsive design that adapts to sidebar state
 */
export default function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-16" : "ml-64"}
        `}
      >
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}



