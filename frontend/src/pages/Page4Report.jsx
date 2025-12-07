// frontend/Page4Report.jsx
import React, { useEffect, useState } from "react";
import "./page4.css";
import SitesPanel from "../components/SitesPanel";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Page4Report() {
  const [submissions, setSubmissions] = useState([]);
  const [sites, setSites] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubmissionId, setActiveSubmissionId] = useState(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [retainTab, setRetainTab] = useState("main");
  const [accessTab, setAccessTab] = useState("main");
  const [sitesOpen, setSitesOpen] = useState(false);
    // 📌 Read submissionId from query string
  // const { search } = useLocation();
  // const params = new URLSearchParams(search);
  // const submissionId = params.get("submissionId"); 
  const [searchParams] = useSearchParams();

  const foaId = searchParams.get("foaId");
  const submissionId = searchParams.get("submissionId");
  console.log("submissionId 471",submissionId)
  

  // (make sure your Page2 navigation uses ?submission_id=xxx)
 

  useEffect(() => {
    if (!submissionId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/submissions/${submissionId}/full`
        );

        if (!res.ok) {
          console.error("Error fetching submission");
          setLoading(false);
          return;
        }

        const data = await res.json();
        const normalizedId = data.submissionId;
        const normalizedSubmission = { ...data, id: normalizedId };

        // backend returns ONE submission object
        setSubmissions([normalizedSubmission]);
        setSites(data.sites || []);   // if your backend fills these fields
        setKpis(data.kpis || []);     // if your backend fills these fields

        setActiveSubmissionId(normalizedId);
        setLoading(false);

      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  if (loading) return <div className="foa-page-loading">Loading PRE/POST FOA...</div>;
  if (!activeSubmissionId) return <div className="foa-page-loading">No submissions available.</div>;

  // const submission = submissions.find((s) => s.id === activeSubmissionId);
  // const submissionSites = sites.filter((s) => s.submissionId === submission.id);
  // const submissionKpis = kpis.filter((k) => k.submissionId === submission.id);
  const submission = submissions[0];
  const submissionSites = sites;
  const submissionKpis = kpis;

  const sum = (arr, key) => arr.reduce((a, b) => a + (b[key] || 0), 0);

  function getCounts(arr, key) {
    return {
      green: arr.filter(s => s[key] === 1).length,
      red: arr.filter(s => s[key] === -1).length,
      orange: arr.filter(s => s[key] === 0).length
    };
  }
  
  const voiceSummary = getCounts(submissionSites, "voice");
  const saSummary = getCounts(submissionSites, "sa");
  const nsaSummary = getCounts(submissionSites, "nsa");
  const commonSummary = getCounts(submissionSites, "common");
  

  const retainabilityMainKpis = submissionKpis.filter(
    (k) => k.category === "Retainability" && k.kpiType === "Main"
  );


  const accessibilityMainKpis = submissionKpis.filter(
    (k) => k.category === "Accessibility" && k.kpiType === "Main"
  );

  const retainabilityDetailedKpis = submissionKpis.filter(
    (k) => k.category === "Retainability" && k.kpiType === "Detailed"
  );
  
  const accessibilityDetailedKpis = submissionKpis.filter(
    (k) => k.category === "Accessibility" && k.kpiType === "Detailed"
  );

  const getColorClass = (value) => {
    if (value === 1) return "pill-green";       
    if (value === 0) return "pill-orange";      
    if (value === -1) return "pill-red";        
    return "pill-grey";                         
  };
  
  
  
  return (
    <div className="prepost-container">
      <div className="pp-main-card">

        {/* SUBMISSION HEADER */}
        <section className="pp-submission-strip">
          <div className="pp-sub-block">
            <div className="pp-sub-label">Submission ID</div>
            <div className="pp-sub-value pp-link-text">{submission.submissionId}</div>
          </div>

          <div className="pp-sub-block">
            <div className="pp-sub-label">FOA ID</div>
            <div className="pp-sub-value">{submission.foaId}</div>
          </div>

          <div className="pp-sub-block">
            <div className="pp-sub-label">FOA Vendor</div>
            <div className="pp-sub-value">{submission.vendor}</div>
          </div>

          <div className="pp-sub-block">
            <div className="pp-sub-label">FOA Status</div>
            <div className="pp-status-pill">{submission.status}</div>
          </div>

          <div className="pp-sub-block pp-location-block">
            <div className="pp-sub-label">{submission.location}</div>
            <div className="pp-sub-value">
              <span className="pp-location-sites">{submission.totalSites}</span> Sites
            </div>
          </div>

          <div className="pp-sub-actions">
            <button className="pp-action-btn">Action ▾</button>
            <button className="pp-round-icon">⬇</button>
            <button className="pp-round-icon pp-round-danger">✕</button>
          </div>
        </section>

        
          {/* KPI + RETAINABILITY LEFT | INSIGHTS + SITES RIGHT */}
          <div className="pp-content-grid">
          {/* LEFT COLUMN */}
          <div className="pp-left-col">
            {/* KPI SUMMARY */}
            <div className="pp-kpi-summary">
              <KpiCard title="Voice" data={voiceSummary} />
              <KpiCard title="SA" data={saSummary} />
              <KpiCard title="NSA" data={nsaSummary} />
              <KpiCard title="Common" data={commonSummary} />
            </div>
            

            {/* RETAINABILITY */}
            {/* <section className="pp-retain-card">
            <div className="pp-section-header">
              <div>
                <span className="pp-section-toggle-arrow">▾</span>
                Retainability
              </div>
            </div>

              

              <div className="pp-tabs">
                <button className="pp-tab pp-tab-active">MAIN KPIS</button>
                <button className="pp-tab">DETAILED KPIS</button>
              </div>

              <div className="pp-table-wrapper">
                <table className="pp-kpi-table">
                  <thead>
                    <tr>
                      <th>KPI Name</th>
                      <th>Type</th>
                      <th>Pre Median</th>
                      <th>Post Median</th>
                      <th>% Change</th>
                      <th>Improved Sites</th>
                      <th>Degraded Sites</th>
                      <th>No Change Sites</th>
                    </tr>
                  </thead>

                  <tbody>
                    {retainabilityMainKpis.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="pp-empty-row">
                          No Retainability KPIs recorded.
                        </td>
                      </tr>
                    ) : (
                      retainabilityMainKpis.map((kpi) => (
                        <tr key={kpi.id}>
                          <td>{kpi.kpiName}</td>
                          <td>{kpi.type}</td>
                          <td>{kpi.preMedian}</td>
                          <td>{kpi.postMedian}</td>

                          <td>
                            <span className="pp-pill-green">{kpi.percentChange}</span>
                          </td>
                          <td>{kpi.improvedSites}</td>
                          <td>{kpi.degradedSites}</td>
                          <td>{kpi.noChangeSites}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section> */}
            <section className="pp-retain-card">
              <div className="pp-section-header">
                <div>
                  <span className="pp-section-toggle-arrow">▾</span>
                  Retainability
                </div>
              </div>

              {/* TAB BUTTONS */}
              <div className="pp-tabs">
                <button
                  className={`pp-tab ${retainTab === "main" ? "pp-tab-active" : ""}`}
                  onClick={() => setRetainTab("main")}
                >
                  MAIN KPIS
                </button>

                <button
                  className={`pp-tab ${retainTab === "detailed" ? "pp-tab-active" : ""}`}
                  onClick={() => setRetainTab("detailed")}
                >
                  DETAILED KPIS
                </button>
              </div>

              {/* GET KPIS BASED ON SELECTED TAB */}
              <div className="pp-table-wrapper">
                <table className="pp-kpi-table">
                  <thead>
                    <tr>
                      <th>KPI Name</th>
                      <th>Type</th>
                      <th>Pre Median</th>
                      <th>Post Median</th>
                      <th>% Change</th>
                      <th>Improved Sites</th>
                      <th>Degraded Sites</th>
                      <th>No Change Sites</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(retainTab === "main"
                      ? retainabilityMainKpis
                      : retainabilityDetailedKpis
                    ).length === 0 ? (
                      <tr>
                        <td colSpan="8" className="pp-empty-row">
                          No Retainability KPIs recorded.
                        </td>
                      </tr>
                    ) : (
                      (retainTab === "main"
                        ? retainabilityMainKpis
                        : retainabilityDetailedKpis
                      ).map((kpi, idx) => (
                        <tr key={kpi.id || kpi.id || `${kpi.kpiName}-${kpi.type}-${kpi.category}-${idx}`}>
                          <td>{kpi.kpiName}</td>
                          <td>{kpi.type}</td>
                          <td>{kpi.preMedian}</td>
                          <td>{kpi.postMedian}</td>
                          <td>
                            <span className="pp-pill-green">{kpi.percentChange}</span>
                          </td>
                          <td>{kpi.improvedSites}</td>
                          <td>{kpi.degradedSites}</td>
                          <td>{kpi.noChangeSites}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ACCESSIBILITY */}
            <section className="pp-access-card">
              <div
                className="pp-section-header"
                onClick={() => setAccessOpen(!accessOpen)}
              >
                <div>
                  <span className="pp-section-toggle-arrow">
                    {accessOpen ? "▾" : "▸"}
                  </span>
                  Accessibility
                </div>
              </div>

              <div className={`pp-access-body ${accessOpen ? "open" : ""}`}> 
                <div className="pp-tabs">
                  <button
                    className={`pp-tab ${accessTab === "main" ? "pp-tab-active" : ""}`}
                    onClick={() => setAccessTab("main")}
                  >
                    MAIN KPIS
                  </button>

                  <button
                    className={`pp-tab ${accessTab === "detailed" ? "pp-tab-active" : ""}`}
                    onClick={() => setAccessTab("detailed")}
                  >
                    DETAILED KPIS
                  </button>
                </div>

                <div className="pp-table-wrapper">
                  <table className="pp-kpi-table">
                    <thead>
                      <tr>
                        <th>KPI Name</th>
                        <th>Type</th>
                        <th>Pre Median</th>
                        <th>Post Median</th>
                        <th>% Change</th>
                        <th>Improved Sites</th>
                        <th>Degraded Sites</th>
                        <th>No Change Sites</th>
                      </tr>
                    </thead>

                    <tbody>
                      {(accessTab === "main"
                        ? accessibilityMainKpis
                        : accessibilityDetailedKpis
                      ).length === 0 ? (
                        <tr>
                          <td colSpan="8" className="pp-empty-row">
                            No Accessibility KPIs found.
                          </td>
                        </tr>
                      ) : (
                        (accessTab === "main"
                          ? accessibilityMainKpis
                          : accessibilityDetailedKpis
                        ).map((kpi, idx) => (
                          <tr key={kpi.id || kpi.id || `${kpi.kpiName}-${kpi.type}-${kpi.category}-${idx}`}>
                            <td>{kpi.kpiName}</td>
                            <td>{kpi.type}</td>
                            <td>{kpi.preMedian}</td>
                            <td>{kpi.postMedian}</td>
                            <td>
                              <span className="pp-pill-green">{kpi.percentChange}</span>
                            </td>
                            <td>{kpi.improvedSites}</td>
                            <td>{kpi.degradedSites}</td>
                            <td>{kpi.noChangeSites}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="pp-right-col">
            <InsightsPanel />

            <section className="pp-sites-panel">
            <div 
              className="pp-sites-toggle"
              onClick={() => setSitesOpen(!sitesOpen)}
            >
              <button className={`pp-sites-arrow ${sitesOpen ? "open" : ""}`}>
                ▾
              </button>

              <div className="pp-sites-header-text">
                <div className="pp-sites-title">{submission.totalSites} Sites</div>
                <div className="pp-sites-location">{submission.location}</div>
              </div>
            </div>

            {/* COLLAPSIBLE TABLE */}
            <div className={`pp-sites-content ${sitesOpen ? "open" : ""}`}>
              <table className="pp-sites-table">
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
                  {submissionSites.map((site, idx) => (
                    <tr key={site.id || site.id || site.siteId || `site-row-${idx}`}>
                      <td>{site.siteId}</td>
                      <td><span className={`site-pill ${getColorClass(site.voice)}`}></span></td>
                      <td><span className={`site-pill ${getColorClass(site.sa)}`}></span></td>
                      <td><span className={`site-pill ${getColorClass(site.nsa)}`}></span></td>
                      <td><span className={`site-pill ${getColorClass(site.common)}`}></span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>    
          </section>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function KpiCard({ title, data }) {
  return (
    <div className="pp-kpi-card">
      <div className="pp-kpi-title">{title}</div>

      <div className="pp-kpi-badges">
        <Badge type="good" value={data.green || 0} />
        <Badge type="bad" value={data.red || 0} />
        <Badge type="neutral" value={data.orange || 0} />

      </div>
    </div>
  );  
}

function Badge({ value, type }) {

  const getIcon = () => {
    if (type === "good") return "↑";      
    if (type === "bad") return "↓";       
    if (type === "neutral") return "–";    
    return "";
  };

  return (
    <div className={`pp-badge pp-badge-${type}`}>
      <span className="pp-badge-dot">{getIcon()}</span>
      <span className="pp-badge-value">{value}</span>
    </div>
  );
}


function InsightsPanel() {
  const [open, setOpen] = useState(true);

  return (
    <aside className="pp-insights">

      {/* TOGGLE BAR */}
      <div 
        className="pp-insights-toggle"
        onClick={() => setOpen(!open)}
      >
        <span>Insights</span>

        <button 
          className={`pp-insights-arrow ${open ? "open" : ""}`}
        >
          ▾
        </button>
      </div>

      {/* COLLAPSIBLE CONTENT */}
      <div className={`pp-insights-content ${open ? "open" : ""}`}>
        <div className="pp-insights-body">
          <p><strong>Voice:</strong> Small improvement in access.</p>
          <p><strong>Data & Congestion:</strong> Access improved, congestion greatly reduced.</p>
          <p><strong>Signal & Experience:</strong> Mixed signal results, user experience declined.</p>
        </div>

        <button className="pp-view-insights-btn">View Detailed Insights →</button>
      </div>

    </aside>
  );
}


function LegendDot({ className, label }) {
  return (
    <div className="pp-legend-item">
      <span className={`pp-legend-dot ${className}`} />
      <span className="pp-legend-label">{label}</span>
    </div>
  );
}