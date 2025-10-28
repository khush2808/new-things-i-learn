import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

const navLinks: NavLink[] = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/bar-chart", label: "Bar Chart", icon: "📊" },
  { path: "/line-chart", label: "Line Chart", icon: "📈" },
  { path: "/time-series", label: "Time Series", icon: "📉" },
  { path: "/options-chart", label: "Options Chart", icon: "💹" },
];

/**
 * Collapsible Sidebar Component
 * 
 * Features:
 * - Auto-collapsed by default
 * - Smooth animations
 * - Highlights active route
 * - Accessible (ARIA labels, keyboard navigation)
 * - Responsive design
 */
export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          flex flex-col shadow-xl
        `}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <h2 className="text-xl font-bold truncate">
              ECharts Dashboard
            </h2>
          )}
          <button
            onClick={onToggle}
            className={`
              p-2 rounded-lg hover:bg-gray-800 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isCollapsed ? "mx-auto" : ""}
            `}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? "☰" : "✕"}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "hover:bg-gray-800 text-gray-300 hover:text-white"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    aria-current={isActive ? "page" : undefined}
                    title={isCollapsed ? link.label : undefined}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {link.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="font-medium">{link.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          {!isCollapsed && (
            <p className="text-xs text-gray-400 text-center">
              React + ECharts
            </p>
          )}
        </div>
      </aside>

      {/* Toggle button for collapsed sidebar (always visible) */}
      {isCollapsed && (
        <div className="fixed top-4 left-4 z-30 lg:hidden">
          <button
            onClick={onToggle}
            className="p-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open sidebar"
          >
            ☰
          </button>
        </div>
      )}
    </>
  );
}

