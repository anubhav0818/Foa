import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Page1HomeStyled from "./pages/Page1HomeStyled";
import Page2ListStyled from "./pages/Page2ListStyled";
import Page3CreateStyled from "./pages/Page3CreateStyled";
import Page4ReportStyled from "./pages/Page4ReportStyled";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-root">
      <Topbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="app-body">
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={closeSidebar}
            aria-label="Close sidebar overlay"
          />
        )}

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Page1HomeStyled />} />

            <Route path="/test" element={<Page4ReportStyled />} />

            <Route path="/list" element={<Page2ListStyled />} />
            <Route path="/create" element={<Page3CreateStyled />} />
            <Route path="/report" element={<Page4ReportStyled />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
