import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page2.css";
import NoFoaImg from "../assets/NoFoa.png";

const tabs = [
  { label: "ALL", key: "all" },
  { label: "CREATED BY ME", key: "created" },
];

export default function Page2List() {
  const [activeTab, setActiveTab] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = "John Smith"; 

  
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
      "in-review": "🟡", 
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

  const displayedSubmissions =
    activeTab === 0
      ? submissions 
      : submissions.filter((item) => item.createdBy === loggedInUser); 

  const createdByMeCount = submissions.filter(
    (item) => item.createdBy === loggedInUser
  ).length;

  return (
    <div className="page2">
      <section className="page2-card">
        <div className="page2-tabs-row">
          <div className="page2-tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                className={`page2-tab ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
                type="button"
              >
                {tab.label} (
                {tab.key === "all" ? submissions.length : createdByMeCount})
              </button>
            ))}
          </div>

          <button className="create-foa-btn" onClick={goToCreateFOA}>
            + Create FOA
          </button>
        </div>

        
        {displayedSubmissions.length === 0 ? (
          <div className="page2-empty">
            <div className="page2-empty-icon">
              <img src={NoFoaImg} alt="No FOA" className="nofea-img" />
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
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {submissions.map((item) => (
                      <tr key={item._id}>
                        <td
                          className="clickable-foa"
                          onClick={() =>
                            navigate(
                              `/report?foaId=${item.foaId}&submissionId=${item.submissionId}`
                            )
                          }
                        >
                          {item.foaId}
                        </td>

                        
                        <td>{item.submissionId || "--"}</td>
                        <td>{item.location || "--"}</td>
                        <td>{item.vendor || "--"}</td>
                        <td>
                          <span
                            className={`status-chip ${item.status
                              ?.toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {item.status || "--"}
                          </span>
                        </td>
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