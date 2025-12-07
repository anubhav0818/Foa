import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";

const tabs = [
  { label: "ALL", key: "all" },
  { label: "CREATED BY ME", key: "created" },
];

export default function Page2List() {
  const [activeTab, setActiveTab] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = "John Smith"; // <-- matches the name in topbar

  // ===== FETCH ON PAGE LOAD =====
  useEffect(() => {
    fetch("http://127.0.0.1:8000/submissions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched submissions:", data);
        setSubmissions(data);
      })
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  const goToCreateFOA = () => {
    navigate("/create");
  };

  const getStatusChip = (status) => {
    const normalized = status?.toLowerCase().replace(" ", "-");
  
    const icons = {
      new: "🟦",
      "in-analysis": "🟠",
      "in-review": "🟡",   // <-- Added
      finalized: "🟢",
      failed: "🔴",
      passed: "🟢",
    };
  
    return (
      <span className={`status-chip ${normalized}`}>
        <span className="status-icon">{icons[normalized]}</span>
        {status}
      </span>
    );
  };
  

  // ===== FILTER LOGIC FOR TABS =====

  // const displayedSubmissions =
  //   activeTab === 0
  //     ? submissions
  //     : submissions.filter((item) => item.created_by === "me"); // <- adjust based on backend

  const displayedSubmissions =
  activeTab === 0
    ? submissions                                // ALL TAB
    : submissions.filter((item) => item.createdBy === loggedInUser);  // CREATED BY ME TAB

    const createdByMeCount = submissions.filter(
      (item) => item.createdBy === loggedInUser
    ).length;
    
    
  return (
    <div className="page2">
      <header className="page2-header">
        <div className="page2-title">
          <span className="page2-title-text">PRE/POST FOA</span>
        </div>
        <button className="page2-primary-btn" onClick={goToCreateFOA}>
          + Create FOA
        </button>
      </header>

      

      <section className="page2-card">
        {/* TABS */}
        <div className="page2-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              className={`page2-tab ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {tab.label} (
                {tab.key === "all" ? submissions.length : createdByMeCount}
                )
            </button>
          ))}
        </div>

        {/* Show empty message OR list */}
        {displayedSubmissions.length === 0 ? (
          <div className="page2-empty">
            <div className="page2-empty-icon" aria-hidden="true">
              <span className="page2-empty-dot" />
              <span className="page2-empty-body" />
            </div>  
            <p>There are no FOAs created yet.</p>
          </div>
        ) : (
          <div className="page2-list">
            
          {submissions.length === 0 ? (
  <div className="page2-empty">
    <div className="page2-empty-icon" aria-hidden="true">
      <span className="page2-empty-dot" />
      <span className="page2-empty-body" />
    </div>
    <p>No submissions found.</p>
  </div>
) : (
  <div className="page2-table-wrapper">
    <table className="page2-table">
      <thead>
        <tr>
          <th>FOA Id</th>
          <th>Submission Id</th>
          <th>Location</th>
          <th>Vendor</th>
          <th>Status</th>
          <th>Total Sites</th>
          {/* <th>Date Updated</th>
          <th>Created By</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {submissions.map((item) => (
    <tr key={item._id}>
      {/* FOA Name */}
      <td 
        className="clickable-foa"
        onClick={() => navigate(`/report?foaId=${item.foaId}&submissionId=${item.submissionId}`)}
        >
          {item.foaId}
        </td>


      {/* Submission ID */}
      <td>{item.submissionId || "--"}</td>

      {/* Market / Location */}
      <td>{item.location || "--"}</td>

      {/* Vendor */}
      <td>{item.vendor || "--"}</td>

      {/* Status */}
      <td>
        <span className={`status-chip ${item.status?.toLowerCase().replace(" ", "-")}`}>
          {item.status || "--"}
        </span>
      </td>

      {/* Total Sites */}
      <td>{item.totalSites || "--"}</td>

      <td>⋮</td>
    </tr>
  ))}
</tbody>

    </table>
  </div>
)}

          </div>
        )}
      </section>
    </div>
  );
}