import React, { useState } from "react";
import "./sitesPanel.css";   // Make sure you create this file

export default function SitesPanel({ sites, location }) {
  const [open, setOpen] = useState(true); // open by default like screenshot

  const renderPill = (value) => {
    if (value === null || value === undefined) return <span className="sp-pill sp-na"></span>;
    if (value >= 0.7) return <span className="sp-pill sp-green"></span>;        // good
    if (value >= 0.4) return <span className="sp-pill sp-yellow"></span>;       // mild
    if (value > 0) return <span className="sp-pill sp-orange"></span>;          // mild negative
    return <span className="sp-pill sp-red"></span>;                             // severe
  };

  return (
    <div className="sp-card">
      {/* HEADER */}
      <div className="sp-header" onClick={() => setOpen(!open)}>
        <span className="sp-arrow">{open ? "▾" : "▸"}</span>

        <span className="sp-count">{sites.length} Sites</span>

        <span className="sp-location">{location}</span>
      </div>

      {/* BODY */}
      {open && (
        <div className="sp-body">
          <table className="sp-table">
            <thead>
              <tr>
                <th>Site ID</th>
                <th>Voice</th>
                <th>SA</th>
                <th>NSA</th>
                <th>COM</th>
              </tr>
            </thead>

            <tbody>
              {sites.map((s) => (
                <tr key={s.id}>
                  <td>{s.siteId}</td>
                  <td>{renderPill(s.voice)}</td>
                  <td>{renderPill(s.sa)}</td>
                  <td>{renderPill(s.nsa)}</td>
                  <td>{renderPill(s.common)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
