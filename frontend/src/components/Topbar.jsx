import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/neuron-logo.png";  
import CardIconImg from "../assets/CardIcon.png";
import PlayIconImg from "../assets/PlayIcon.png";
import PlusDocIconImg from "../assets/PlusDocIcon.png";
import HamburgerIconImg from "../assets/Hamburger.png";
import DownArrowImg from "../assets/DownArrow.png";


export default function Topbar({ onToggleSidebar = () => {}, isSidebarOpen = false }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="topbar">
      {/* Left */}
      <div className="topbar-left">

        {!isSidebarOpen && (
          <div className="hamburger-container" onClick={onToggleSidebar}>
            <img 
              src={HamburgerIconImg} 
              alt="Menu Icon" 
              className="hamburger-icon-img"
            />
            <span className="hamburger-text">PRE/POST FOA</span>
          </div>
        )}

      </div>

      {/* Center logo */}
      <div className="topbar-center">
        <div className="logo">
          <img 
            src={Logo} 
            alt="Neuron Logo"
            className="app-logo" 
            style={{ height: "1.8rem",width: "2.0rem", marginRight: "2px" }}
          />
          <span className="logo-text-pink">Neuron</span>
        </div>
      </div>

      {/* Right section */}
      <div className="topbar-right">
        <div className="topbar-icon-group">
          <button className="topbar-icon"><img src={PlayIconImg} alt="Play Icon" className="icon-img" /> </button>
          <button className="topbar-icon"><img src={CardIconImg} alt="Card Icon" className="icon-img" /></button>
          <button className="topbar-icon"><img src={PlusDocIconImg} alt="Plus Doc Icon" className="icon-img" /></button>
        </div>

        <div 
          className="user-profile-dropdown"
          ref={dropdownRef}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="avatar">JS</div>
          <div className="user-info">
            <div className="user-name">John Smith</div>
            <div className="user-role">Admin</div>
          </div>
          <img 
            src={DownArrowImg} 
            alt="Dropdown Arrow" 
            className="dropdown-arrow-img"
          />


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