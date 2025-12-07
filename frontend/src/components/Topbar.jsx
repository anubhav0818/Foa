import React, { useState } from "react";

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.25" stroke="#1e1f31" strokeWidth="1.5"/>
    <path d="M10 9.5V15L15 12.25L10 9.5Z" stroke="#1e1f31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9.5 7H17.5C18.3284 7 19 7.67157 19 8.5V16.5C19 17.3284 18.3284 18 17.5 18H9.5C8.67157 18 8 17.3284 8 16.5V8.5C8 7.67157 8.67157 7 9.5 7Z" stroke="#1e1f31" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6 10V15C6 16.1046 6.89543 17 8 17H13" stroke="#1e1f31" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusDocIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="7" y="5" width="10" height="14" rx="1.5" stroke="#1e1f31" strokeWidth="1.5"/>
    <path d="M12 9V15M15 12H9" stroke="#1e1f31" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Topbar({ onToggleSidebar = () => {}, isSidebarOpen = false }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="hamburger"
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
          onClick={onToggleSidebar}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="topbar-center">
        <div className="logo">
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" style={{ marginRight: "8px" }}>
            <defs>
              <pattern id="grid-pattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="4" y2="0" stroke="#e91e63" strokeWidth="0.4" opacity="0.6"/>
                <line x1="0" y1="0" x2="0" y2="4" stroke="#e91e63" strokeWidth="0.4" opacity="0.6"/>
              </pattern>
            </defs>
            {/* Hexagon shape with rounded corners - wider than tall */}
            <path d="M3 4C2.4 4 2 4.4 2 5V7C2 7.3 2.1 7.6 2.3 7.8C2.1 8 2 8.3 2 8.6V10.6C2 11 2.1 11.3 2.3 11.5C2.1 11.7 2 12 2 12.3V14.3C2 14.9 2.4 15.3 3 15.3H5.3C5.6 15.3 5.9 15.2 6.1 15H9.9C10.1 15.2 10.4 15.3 10.7 15.3H13C13.3 15.3 13.6 15.2 13.8 15H17.6C17.8 15.2 18.1 15.3 18.4 15.3H20.7C21.3 15.3 21.7 14.9 21.7 14.3V12.3C21.7 12 21.6 11.7 21.4 11.5C21.6 11.3 21.7 11 21.7 10.6V8.6C21.7 8.3 21.6 8 21.4 7.8C21.6 7.6 21.7 7.3 21.7 7V5C21.7 4.4 21.3 4 20.7 4H18.4C18.1 4 17.8 4.1 17.6 4.3H13.8C13.6 4.1 13.3 4 13 4H10.7C10.4 4 10.1 4.1 9.9 4.3H6.1C5.9 4.1 5.6 4 5.3 4H3Z" fill="#ff4d8b" rx="1"/>
            {/* Left half with grid pattern overlay */}
            <rect x="2" y="4" width="9.85" height="11.3" fill="url(#grid-pattern)" rx="1"/>
            {/* Right half with white "1" shape */}
            {/* Vertical bar of the "1" */}
            <rect x="13.5" y="5.5" width="2.2" height="9" fill="white" rx="0.3"/>
            {/* Angled top part of "1" - upward arrow */}
            <path d="M13.5 5.5L19.5 11.5L17.8 13.2L13.5 8.9V5.5Z" fill="white"/>
            {/* Small triangular shape at bottom right */}
            <path d="M17.8 13.2L19.5 11.5L16.5 14.5L14.8 12.8L17.8 13.2Z" fill="white"/>
          </svg>
          <span className="logo-text-pink">Neuron</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-icon-group">
          <button className="topbar-icon" aria-label="Play">
            <PlayIcon />
          </button>
          <button className="topbar-icon" aria-label="Devices">
            <CardIcon />
          </button>
          <button className="topbar-icon" aria-label="Add document">
            <PlusDocIcon />
          </button>
        </div>
        <div 
          className="user-profile-dropdown" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="avatar">JS</div>
          <div className="user-info">
            <div className="user-name">John Smith</div>
            <div className="user-role">Admin</div>
          </div>
          <div className="dropdown-arrow">▼</div>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item">Sign Out</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
