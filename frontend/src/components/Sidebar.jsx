import React from "react";
import { useNavigate } from "react-router-dom";

// Icon components
const LineGraphIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 12L6 8L9 11L14 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="2" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="6" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2V14M10 4H6.5C5.67 4 5 4.67 5 5.5S5.67 7 6.5 7H9.5C10.33 7 11 7.67 11 8.5S10.33 10 9.5 10H5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="2" y="10" width="2" height="4" fill="currentColor"/>
    <rect x="6" y="6" width="2" height="8" fill="currentColor"/>
    <rect x="10" y="4" width="2" height="10" fill="currentColor"/>
    <rect x="14" y="8" width="2" height="6" fill="currentColor"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2H12V14H4V2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M6 6H10M6 9H10M6 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const StackedLinesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="2" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="2" fill="currentColor"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="3" y="5" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M6 5V4C6 3.45 6.45 3 7 3H9C9.55 3 10 3.45 10 4V5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const A2Icon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <text x="8" y="12" fontSize="12" fontWeight="700" textAnchor="middle" fill="currentColor">Aa</text>
  </svg>
);

const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12.5 8.5L12.2 9.8L13.5 10.1L13.2 11.4L11.9 11.1L11.6 12.4L10.3 12.1L10.6 10.8L9.3 10.5L9.6 9.2L10.9 9.5L11.2 8.2L12.5 8.5Z" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

const insightsMenu = [
  { title: "NETWORK FACTS", icon: <LineGraphIcon /> },
  { title: "MARKET VALUATION", icon: <DollarIcon /> },
  { title: "MBP SCORE (DAILY)", icon: <BarChartIcon /> },
  { title: "QGP REPORT", icon: <DocumentIcon /> },
  { title: "NOKIA ERICSSON REPORT", icon: <StackedLinesIcon /> },
  { title: "YODA", icon: <CameraIcon />, new: true },
];

const helpMenu = [
  { title: "DATA DICTIONARY", icon: <A2Icon /> },
];

const adminMenu = [
  { title: "ADMIN CONTROL CENTER", icon: <GearIcon />, arrow: true },
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
          <div className="sidebar-version">Version - V0.11.0</div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="menu-section">
            <div className="menu-section-title">INSIGHTS & INTELLIGENCE</div>
            {insightsMenu.map((m, i) => (
              <div className="menu-row" key={i} onClick={() => handleMenuClick(m.title)}  // ← CLICK HANDLER HERE
              style={{ cursor: "pointer" }}>
                
                <div className="menu-icon">{m.icon}</div>
                <div className="menu-title">{m.title}</div>
                {m.new && <div className="badge">NEW</div>}
              </div>
            ))}
          </div>

          <div className="menu-section">
            <div className="menu-section-title">HELP</div>
            {helpMenu.map((m, i) => (
              <div className="menu-row" key={i}>
                <div className="menu-icon">{m.icon}</div>
                <div className="menu-title">{m.title}</div>
              </div>
            ))}
          </div>

          <div className="menu-section">
            <div className="menu-section-title">ADMIN SETTINGS</div>
            {adminMenu.map((m, i) => (
              <div className="menu-row" key={i}>
                <div className="menu-icon">{m.icon}</div>
                <div className="menu-title">{m.title}</div>
                {m.arrow && <div className="menu-arrow">→</div>}
              </div>
            ))}
          </div>

          <div className="menu-section signout-section">
            <div className="menu-row signout-row">
              <div className="menu-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 14H3C2.45 14 2 13.55 2 13V3C2 2.45 2.45 2 3 2H6M10 11L14 7L10 3M14 7H6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="menu-title">SIGN OUT</div>
              <div className="menu-arrow">→</div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
// export default function Sidebar({ isMobileOpen = false, onClose = () => {} }) {
//   const navigate = useNavigate();

//   const handleMenuClick = (title) => {
//     if (title === "YODA") {
//       navigate("/prepost");
//       onClose(); // close mobile sidebar
//     }
//   };

//   return (
//     <aside className={`sidebar ${isMobileOpen ? "open" : ""}`}>
//       <div className="sidebar-inner">

//         <nav className="sidebar-nav">
//           <div className="menu-section">
//             {insightsMenu.map((m, i) => (
//               <div 
//                 className="menu-row" 
//                 key={i} 
//                 onClick={() => handleMenuClick(m.title)}
//               >
//                 <div className="menu-icon">{m.icon}</div>
//                 <div className="menu-title">{m.title}</div>
//                 {m.new && <div className="badge">NEW</div>}
//               </div>
//             ))}
//           </div>
//         </nav>

//       </div>
//     </aside>
//   );
// }
