import React from "react";
import { useNavigate } from "react-router-dom";
import NetworkIcon from "../assets/Network.png";
import MarketIcon from "../assets/Market.png";
import MBPIcon from "../assets/Mbp.png";
import QGPIcon from "../assets/Qgp.png";
import NokiaIcon from "../assets/Nokia.png";
import YodaIcon from "../assets/Yoda.png";

import DictionaryIcon from "../assets/Dictionary.png";

import SettingsIcon from "../assets/Settings.png";
import RightArrowIcon from "../assets/RightArrow.png";

import SignOutIcon from "../assets/SignOut.png";



const insightsMenu = [
  { title: "NETWORK FACTS", icon: NetworkIcon },
  { title: "MARKET VALUATION", icon: MarketIcon },
  { title: "MBP SCORE (DAILY)", icon: MBPIcon },
  { title: "QGP REPORT", icon: QGPIcon },
  { title: "NOKIA ERICSSON REPORT", icon: NokiaIcon },
  { title: "YODA", icon: YodaIcon, new: true },
];


const helpMenu = [
  { title: "DATA DICTIONARY", icon: DictionaryIcon },
];


const adminMenu = [
  { title: "ADMIN CONTROL CENTER", icon: SettingsIcon, arrow: RightArrowIcon },
];


export default function Sidebar({ isMobileOpen = false, onClose = () => {} }) {

  const navigate = useNavigate();
  
  const handleMenuClick = (title) => {
    if (title === "YODA") {
      navigate("/list");   // ← THIS TAKES YOU TO PAGE 2
      onClose();
    }
  };

  const goToCreateFOA = () => {
    navigate("/create");            // ✅ ROUTE TO PAGE 3
  };
  
  return (
    <aside className={`sidebar ${isMobileOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <button className="sidebar-close" aria-label="Close sidebar" onClick={onClose}>✕</button>
            <div className="sidebar-version highlight-version">
              <span className="ver-normal">Version</span>
              <span className="ver-bold">– V0.11.0</span>
            </div>


        </div>
        
        <nav className="sidebar-nav">
          <div className="menu-section">
            <div className="menu-section-title">INSIGHTS & INTELLIGENCE</div>
            {insightsMenu.map((m, i) => (
              <div className="menu-row" key={i} onClick={() => handleMenuClick(m.title)}  // ← CLICK HANDLER HERE
              style={{ cursor: "pointer" }}>
                
                <div className="menu-icon"><img src={m.icon} alt={m.title} className="sidebar-icon-img" /></div>
                <div className="menu-title">{m.title}</div>
                {m.new && <div className="badge">NEW</div>}
              </div>
            ))}
          </div>

          <div className="menu-section">
            <div className="menu-section-title">HELP</div>
            {helpMenu.map((m, i) => (
              <div className="menu-row" key={i}>
                <div className="menu-icon">
                  <img src={m.icon} alt={m.title} className="sidebar-icon-img" />
                </div>
                <div className="menu-title">{m.title}</div>
              </div>
            ))}
          </div>

          <div className="menu-section">
            <div className="menu-section-title">ADMIN SETTINGS</div>
            {adminMenu.map((m, i) => (
              <div className="menu-row" key={i}>
                <div className="menu-icon">
                  <img src={m.icon} alt={m.title} className="sidebar-icon-img" />
                </div>
                <div className="menu-title">{m.title}</div>

                {m.arrow && (
                  <img src={m.arrow} alt="arrow" className="menu-arrow-img" />
                )}
              </div>
            ))}
          </div>


          <div className="menu-section signout-section">
            <div className="menu-row signout-row">
              <div className="menu-icon">
                <img src={SignOutIcon} alt="Sign Out" className="sidebar-icon-img" />
              </div>
              <div className="menu-title">SIGN OUT</div>
              <div className="menu-arrow"><img src={RightArrowIcon} alt="arrow" className="menu-arrow-img" /></div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}