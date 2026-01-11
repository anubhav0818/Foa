import React, { useEffect, useState } from "react";
import "./page4.css";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ActionIcon from "../assets/Action.png";
import DownloadIcon from "../assets/Download.png";
import CancelIcon from "../assets/Cancel.png";
import RequiredIcon from "../assets/Required.png";
import DownArrow from "../assets/DownArrow.png";
import RightArrow from "../assets/RightArrow.png";
import VoiceIcon from "../assets/Voice.png";
import SaIcon from "../assets/Sa.png";
import NsaIcon from "../assets/Nsa.png";
import CommonIcon from "../assets/Common.png";
import PlusIcon from "../assets/Plus.png";
import MinusIcon from "../assets/Minus.png";
import ZeroIcon from "../assets/Zero.png";
import InsightsIcon from "../assets/Insights.png";
import MoreIcon from "../assets/More.png";
import StrongIcon from "../assets/Strong.png";
import MildGreenIcon from "../assets/Mildg.png";
import MildOrangeIcon from "../assets/Mildo.png";
import SevereIcon from "../assets/Severe.png";
import NaIcon from "../assets/Na.png";


export default function Page4Report() {
  const [submissions, setSubmissions] = useState([]);
  const [sites, setSites] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubmissionId, setActiveSubmissionId] = useState(null);

  const [retainOpen, setRetainOpen] = useState(true);
  const [accessOpen, setAccessOpen] = useState(false);

  const [retainTab, setRetainTab] = useState("main");
  const [accessTab, setAccessTab] = useState("main");

  const [sitesOpen, setSitesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(true);

  const [searchParams] = useSearchParams();

  const foaId = searchParams.get("foaId");
  const submissionId = searchParams.get("submissionId");

  console.log("submissionId 471", submissionId);

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

        setSubmissions([normalizedSubmission]);
        setSites(data.sites || []);
        setKpis(data.kpis || []);
        setActiveSubmissionId(normalizedId);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  if (loading) {
    return <div className="foa-page-loading">Loading PRE/POST FOA...</div>;
  }

  if (!activeSubmissionId) {
    return <div className="foa-page-loading">No submissions available.</div>;
  }

  const submission = submissions[0];
  const submissionSites = sites;
  const submissionKpis = kpis;

  function getCounts(arr, key) {
    return {
      green: arr.filter((s) => s[key] === 1).length,
      red: arr.filter((s) => s[key] === -1).length,
      orange: arr.filter((s) => s[key] === 0).length
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

    <div className="pp-canvas">
      <div className="pp-main-card">
        {/* SUBMISSION HEADER */}
        <section className="pp-submission-strip">
          <div className="pp-submission-left">
            <img src={RightArrow} className="pp-left-arrow" alt="arrow" />

            <div className="pp-sub-block">
              <div className="pp-sub-label-with-icon">
                <span className="pp-sub-label">Submission ID</span>
                <img src={DownArrow} alt="toggle" className="pp-down-icon" />
              </div>

              <div className="pp-sub-value-with-icon">
                <span className="pp-sub-value pp-link-text">
                  {submission.submissionId}
                </span>
                <img
                  src={RequiredIcon}
                  alt="required"
                  className="pp-required-icon"
                />
              </div>
            </div>
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
              <span className="pp-location-sites">
                {submission.totalSites}
              </span>
              <span className="pp-location-text"> Sites</span>
            </div>
          </div>

          <div className="pp-sub-actions-wrapper">
            <div className="pp-divider-vertical" />

            <div className="pp-sub-actions">
              <button className="pp-action-btn">
                <img src={ActionIcon} alt="Action" className="pp-action-img" />
              </button>

              <button className="pp-download-btn">
                <img
                  src={DownloadIcon}
                  alt="Download"
                  className="pp-download-img"
                />
              </button>

              <button className="pp-cancel-btn">
                <img
                  src={CancelIcon}
                  alt="Cancel"
                  className="pp-cancel-img"
                />
              </button>
            </div>
          </div>
        </section>

        <div className="pp-content-grid">
          <div className="pp-left-col">
            <div className="pp-kpi-summary">
              <KpiCard title="Voice" data={voiceSummary} />
              <KpiCard title="SA" data={saSummary} />
              <KpiCard title="NSA" data={nsaSummary} />
              <KpiCard title="Common" data={commonSummary} />
            </div>

            <section className="pp-kpi-combined-card">
              {/* Retainability */}
              <div className="pp-kpi-grey-card">
                <div
                  className="pp-section-header"
                  onClick={() => {
                    setRetainOpen(true);
                    setAccessOpen(false);
                  }}
                  
                >
                  <div className="pp-section-title">
                    <img
                      src={retainOpen ? DownArrow : RightArrow} 
                      alt="toggle"
                      className="pp-section-toggle-icon"
                    />
                    <span>Retainability</span>
                  </div>
                </div>

                <div className={`pp-retain-body ${retainOpen ? "open" : ""}`}>
                  <div className="pp-tabs">
                    <button
                      className={`pp-tab ${
                        retainTab === "main" ? "pp-tab-active" : ""
                      }`}
                      onClick={() => setRetainTab("main")}
                    >
                      <span className="pp-tab-text">MAIN KPIS</span>
                    </button>

                    <button
                      className={`pp-tab ${
                        retainTab === "detailed" ? "pp-tab-active" : ""
                      }`}
                      onClick={() => setRetainTab("detailed")}
                    >
                      <span className="pp-tab-text">DETAILED KPIS</span>
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
                            <tr
                              key={`${kpi.kpiName}-${kpi.type}-${kpi.category}-${idx}`}
                            >
                              <td>{kpi.kpiName}</td>
                              <td>{kpi.type}</td>
                              <td>{kpi.preMedian}</td>
                              <td>{kpi.postMedian}</td>
                              <td>
                                <span className="pp-pill-green">
                                  {kpi.percentChange}
                                </span>
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
              </div>

              {/* Accessibility */}
              <div className="pp-kpi-grey-card">
                <div
                  className="pp-section-header"
                  onClick={() => {
                    setAccessOpen(true);
                    setRetainOpen(false);
                  }}
                  
                >
                  <div className="pp-section-title">
                    <img
                      src={accessOpen ? DownArrow : RightArrow}
                      alt="toggle"
                      className="pp-section-toggle-icon"
                    />
                    <span>Accessibility</span>
                  </div>
                </div>

                <div className={`pp-access-body ${accessOpen ? "open" : ""}`}>
                  <div className="pp-tabs">
                    <button
                      className={`pp-tab ${
                        accessTab === "main" ? "pp-tab-active" : ""
                      }`}
                      onClick={() => setAccessTab("main")}
                    >
                      <span className="pp-tab-text">MAIN KPIS</span>
                    </button>

                    <button
                      className={`pp-tab ${
                        accessTab === "detailed" ? "pp-tab-active" : ""
                      }`}
                      onClick={() => setAccessTab("detailed")}
                    >
                      <span className="pp-tab-text">DETAILED KPIS</span>
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
                            <tr
                              key={`${kpi.kpiName}-${kpi.type}-${kpi.category}-${idx}`}
                            >
                              <td>{kpi.kpiName}</td>
                              <td>{kpi.type}</td>
                              <td>{kpi.preMedian}</td>
                              <td>{kpi.postMedian}</td>
                              <td>
                                <span className="pp-pill-green">
                                  {kpi.percentChange}
                                </span>
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
              </div>
              {/* KPI Legend */}
              <div className="pp-kpi-legend">
                <div className="pp-kpi-legend-item">
                  <img src={StrongIcon} alt="Strong improvement" />
                  <span>Strong improvement (≥ +5%)</span>
                </div>

                <div className="pp-kpi-legend-item">
                  <img src={MildGreenIcon} alt="Mild improvement" />
                  <span>Mild improvement (0 to +5%)</span>
                </div>

                <div className="pp-kpi-legend-item">
                  <img src={MildOrangeIcon} alt="Mild degradation" />
                  <span>Mild degradation (-5% to 0)</span>
                </div>

                <div className="pp-kpi-legend-item">
                  <img src={SevereIcon} alt="Severe degradation" />
                  <span>Severe degradation (≤ -5%)</span>
                </div>

                <div className="pp-kpi-legend-item">
                  <img src={NaIcon} alt="N/A" />
                  <span>N/A</span>
                </div>
              </div>


            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="pp-info-card">
            {/* Insights */}
            <div className="pp-grey-card">
              <div
                className="pp-info-section-header"
                onClick={() => {
                  setSitesOpen(false);
                  setInsightsOpen(!insightsOpen);
                }}
              >
                <img
                  src={insightsOpen ? DownArrow : RightArrow}
                  alt="toggle"
                  className="pp-toggle-icon"
                />
                <span className="pp-header-title">Insights</span>
                <img
                  src={InsightsIcon}
                  alt="insights"
                  className="pp-header-right-icon"
                />
              </div>

              <div
                className={`pp-info-section-body ${
                  insightsOpen ? "open" : ""
                }`}
              >
                <p>
                  <strong>Voice:</strong> Small improvement in access.
                </p>
                <p>
                  <strong>Data & Congestion:</strong> Access improved, congestion
                  greatly reduced.
                </p>
                <p>
                  <strong>Signal & Experience:</strong> Mixed signal results,
                  user experience declined.
                </p>

                <button className="pp-view-insights-btn">
                  <img
                    src={MoreIcon}
                    alt="more"
                    className="pp-view-insights-icon"
                  />
                  <span>View Detailed Insights</span>
                </button>
              </div>
            </div>

            {/* Sites */}
            <div className="pp-grey-card">
              <div
                className="pp-info-section-header"
                onClick={() => {
                  setInsightsOpen(false);
                  setSitesOpen(!sitesOpen);
                }}
              >
                <img
                  src={sitesOpen ? DownArrow : RightArrow}
                  alt="toggle"
                  className="pp-toggle-icon"
                />

                <div className="pp-sites-header-text">
                  <span className="pp-sites-count">
                    {submission.totalSites}
                  </span>
                  <span className="pp-sites-label">Sites</span>
                </div>
              </div>

              <div
                className={`pp-info-section-body ${sitesOpen ? "open" : ""}`}
              >
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
                      <tr key={idx}>
                        <td>{site.siteId}</td>
                        <td>
                          <span
                            className={`site-pill ${getColorClass(site.voice)}`}
                          />
                        </td>
                        <td>
                          <span
                            className={`site-pill ${getColorClass(site.sa)}`}
                          />
                        </td>
                        <td>
                          <span
                            className={`site-pill ${getColorClass(site.nsa)}`}
                          />
                        </td>
                        <td>
                          <span
                            className={`site-pill ${getColorClass(
                              site.common
                            )}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
      
  </div>
  );
}

function KpiCard({ title, data }) {
  const iconMap = {
    Voice: VoiceIcon,
    SA: SaIcon,
    NSA: NsaIcon,
    Common: CommonIcon
  };

  const iconToUse = iconMap[title] || CommonIcon;

  return (
    <div className={`pp-kpi-card ${title === "Voice" ? "pp-kpi-voice" : ""}`}>
      <div className="kpi-title-row">
        <span className="kpi-title">{title}</span>

        {iconToUse && (
          <img
            src={iconToUse}
            alt={`${title} icon`}
            className="kpi-title-icon"
          />
        )}
      </div>

      <div className="pp-kpi-badges">
        <Badge type="good" value={data.green || 0} />
        <Badge type="bad" value={data.red || 0} />
        <Badge type="neutral" value={data.orange || 0} />
      </div>
    </div>
  );
}

function Badge({ value, type }) {
  const iconMap = {
    good: PlusIcon,
    bad: MinusIcon,
    neutral: ZeroIcon
  };

  const iconToUse = iconMap[type];

  return (
    <div className={`pp-badge pp-badge-${type}`}>
      <img src={iconToUse} alt={type} className="pp-badge-icon" />
      <span className="pp-badge-value">{value}</span>
    </div>
  );
}