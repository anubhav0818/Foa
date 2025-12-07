import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// IMPORT PAGES (USE EXACT FILE NAMES)
import Page1Home from "./pages/Page1Home";
import Page2List from "./pages/Page2List";
import Page3Create from "./pages/Page3Create";
import Page4Report from "./pages/Page4Report";


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-root">
      <Topbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="app-body">
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} aria-label="Close sidebar overlay" />}

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Page1Home />} />
            <Route path="/list" element={<Page2List />} />
            <Route path="/create" element={<Page3Create />} />
            <Route path="/report" element={<Page4Report />} />
            
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
