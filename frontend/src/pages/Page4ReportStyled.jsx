import React, { useEffect, useState } from "react";
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
import styled from "styled-components";
import { viewSizeCalculator } from "../utils/viewSizeCalculator";

const PrePostContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #e8edf5;
  padding: ${() => viewSizeCalculator(1.5)} ${() => viewSizeCalculator(2)};
  box-sizing: border-box;
`;

const PPCanvas = styled.div`
  width: 100%;
  max-width: ${() => viewSizeCalculator(87.5)}; /* 1400px */
  min-width: ${() => viewSizeCalculator(80)}; /* 1280px */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${() => viewSizeCalculator(1)};
`;

// const PPCanvas = styled.div`
//   width: 100%;
//   max-width: 90vw; /* scales with browser zoom */
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: ${viewSizeCalculator(1)};
// `;

const PPMainCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${() => viewSizeCalculator(1)};
  margin-top: ${() => viewSizeCalculator(1.5)};
`;

const PPContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr ${() => viewSizeCalculator(23)};
  gap: ${() => viewSizeCalculator(1.5)};
  margin-top: ${() => viewSizeCalculator(0.25)};
`;

const PPLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${() => viewSizeCalculator(1.25)};
`;

const PPIcon = styled.img`
  width: ${() => viewSizeCalculator(1)};
  height: ${() => viewSizeCalculator(1)};
  object-fit: contain;
`;

const PPActionBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${() => viewSizeCalculator(0.5)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PPSubmissionStrip = styled.section`
  background: #ffffff;
  border-radius: ${() => viewSizeCalculator(1.25)};
  padding: ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1.5)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${() => viewSizeCalculator(1.25)};
  top: ${() => viewSizeCalculator(5)};
  left: ${() => viewSizeCalculator(1.25)};
  width: ${() => viewSizeCalculator(87.5)};
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const PPSubmissionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(0.75)};
`;

const PPSubBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
`;

const PPSubLabel = styled.div`
  font-size: ${() => viewSizeCalculator(0.8125)};
  font-family: Inter;
  font-weight: 500;
  color: #606080;
  line-height: 100%;
`;

const PPSubValue = styled.div`
  height: ${() => viewSizeCalculator(1.1875)};
  font-family: Inter;
  font-weight: 500;
  font-size: ${() => viewSizeCalculator(1)};
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #242639;
`;

const PPStatusPill = styled.div`
  padding: ${() => viewSizeCalculator(0.5)};
  gap: ${() => viewSizeCalculator(0.625)};
  border-radius: ${() => viewSizeCalculator(1.25)};
  width: ${() => viewSizeCalculator(4.375)};
  height: ${() => viewSizeCalculator(1.5)};
  background: #d1f7ff;
  border: ${() => viewSizeCalculator(0.0625)} solid #3ac6e2;
  color: #606080;
  font-size: ${() => viewSizeCalculator(0.625)};
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0%;
`;

const PPKpiSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: ${() => viewSizeCalculator(63.5)};
  height: ${() => viewSizeCalculator(6.5625)};
  top: ${() => viewSizeCalculator(10.75)};
  left: ${() => viewSizeCalculator(1.25)};
  gap: ${() => viewSizeCalculator(0.75)};
`;

const PPKpiCard = styled.div`
  background: #ffffff;
  border-radius: ${() => viewSizeCalculator(1.25)};
  padding: ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1.5)}
    ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1.5)};
  width: 100%;
  max-width: ${() => viewSizeCalculator(15.3125)};
  height: ${() => viewSizeCalculator(5)};
  display: flex;
  flex-direction: column;
  gap: ${() => viewSizeCalculator(1.25)};
  box-shadow: 0 ${() => viewSizeCalculator(0.125)}
    ${() => viewSizeCalculator(0.5)} rgba(0, 0, 0, 0.06);

  &.voice {
    width: 100%;
    max-width: ${() => viewSizeCalculator(15.3125)};
    height: ${() => viewSizeCalculator(5.75)};
    padding: ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1.5)}
      ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1.5)};
    border-radius: ${() => viewSizeCalculator(1)} ${() => viewSizeCalculator(1)}
      0 0;
  }
`;

const PPKpiTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${() => viewSizeCalculator(0.25)};
`;

const PPKpiTitle = styled.span`
  font-size: ${() => viewSizeCalculator(0.875)};
  font-weight: 600;
  color: #2e2e2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PPKpiBadges = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${() => viewSizeCalculator(1.25)};
  flex-wrap: wrap;
  width: ${() => viewSizeCalculator(11.875)};
  height: ${() => viewSizeCalculator(1.25)};
`;

const PPBadge = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ type }) =>
    type === "good" ? viewSizeCalculator(0.625) : viewSizeCalculator(0.375)};

  padding: ${() => viewSizeCalculator(0.5)} ${() => viewSizeCalculator(0.375)}
    ${() => viewSizeCalculator(0.5)} ${() => viewSizeCalculator(0.125)};

  border-radius: ${() => viewSizeCalculator(1.25)};
  background: transparent;

  width: ${() => viewSizeCalculator(3.125)};
  height: ${() => viewSizeCalculator(1.25)};

  border: ${() => viewSizeCalculator(0.09375)} solid
    ${({ type }) =>
      type === "good" ? "#36b560" : type === "bad" ? "#ff4545" : "#fbad42"};
`;

const PPBadgeIcon = styled.img`
  width: ${() => viewSizeCalculator(1)};
  height: ${() => viewSizeCalculator(1)};
  object-fit: contain;
  padding-left: ${() => viewSizeCalculator(0.125)};
`;

const PPKpiStatusIcon = styled.img`
  width: ${() => viewSizeCalculator(1)}; /* 16px */
  height: ${() => viewSizeCalculator(1)}; /* 16px */
  object-fit: contain;
`;

// const PPBadgeDot = styled.span`
//   width: ${() => viewSizeCalculator(1)};
//   height: ${() => viewSizeCalculator(1)};
//   border-radius: 50%;
//   background: ${({ type }) =>
//     type === "good" ? "#36b560" : type === "bad" ? "#ff4545" : "#fbad42"};
// `;

const PPKpiBadgeIcon = styled.img`
  width: ${() => viewSizeCalculator(0.7)};
  height: ${() => viewSizeCalculator(0.7)};
  object-fit: contain;
  padding-left: ${() => viewSizeCalculator(0.125)};
`;

const PPBadgeValue = styled.span`
  font-size: ${() => viewSizeCalculator(0.6875)};
  font-weight: 500;
  color: #242639;
`;

const PPKpiCombinedCard = styled.section`
  background: #ffffff;

  border-radius: 0 ${() => viewSizeCalculator(1.25)}
    ${() => viewSizeCalculator(1.25)} ${() => viewSizeCalculator(1.25)};

  top: ${() => viewSizeCalculator(16.5)};
  padding: ${() => viewSizeCalculator(1)};
  width: ${() => viewSizeCalculator(63.5)};
  height: ${() => viewSizeCalculator(29.875)};

  box-shadow: 0 ${() => viewSizeCalculator(0.125)}
    ${() => viewSizeCalculator(0.625)} rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
  gap: ${() => viewSizeCalculator(1.25)};

  margin-top: -${() => viewSizeCalculator(2.0595)};
`;

const PPGreyCard = styled.div`
  background: #f5f7fb;
  border-radius: ${() => viewSizeCalculator(0.75)};
  padding: ${() => viewSizeCalculator(0.875)};
`;

const PPSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9vw;
  font-weight: 600;
  margin-bottom: 1vh;
  min-height: ${() => viewSizeCalculator(1.25)};
  height: fit-content;
  gap: ${() => viewSizeCalculator(0.375)};
`;

const PPSectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(0.5)};
`;

const PPTabs = styled.div`
  display: flex;
  gap: 0.5vw;
  margin-bottom: 1vh;
`;

const PPTab = styled.button`
  border: none;
  position: relative;
  padding: 0.7vh 1.4vw;
  font-size: ${() => viewSizeCalculator(0.625)};
  font-weight: 700;
  line-height: ${() => viewSizeCalculator(0.8)};
  letter-spacing: 1%;
  cursor: pointer;
  background: transparent;
  padding-bottom: ${() => viewSizeCalculator(0.625)};
  padding-top: ${() => viewSizeCalculator(0.625)};
  display: inline-block;
  color: #707c8b;

  ${({ active }) =>
    active &&
    `
      background: #ffffff;
      color: #e6007a;
      min-width: ${viewSizeCalculator(3.375)};
      width: fit-content;
      line-height: ${viewSizeCalculator(0.9375)};
      letter-spacing: ${viewSizeCalculator(0.0125)};
  `}

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ active }) => (active ? "100%" : "0")};
    height: ${() => viewSizeCalculator(0.1875)};
    background: #e6007a;
    border-radius: ${() => viewSizeCalculator(0.125)};
    transition: width 0.15s ease;
  }
`;

const PPExpandBody = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  background: #ffffff;
  border-radius: ${() => viewSizeCalculator(0.625)};
  padding: ${() => viewSizeCalculator(0.625)} ${() => viewSizeCalculator(1)};
`;

const PPTableWrapper = styled.div`
  background: #ffffff;
  border-radius: 1vw;
  padding: 1vh 1vw;
`;

const PPKpiTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78vw;
  table-layout: fixed;

  th,
  td {
    padding: 0.9vh 0.8vw;
    text-align: center;
    font-family: inter;
    font-weight: 400;
    font-size: ${() => viewSizeCalculator(0.75)};
    line-height: ${() => viewSizeCalculator(1.25)};
    letter-spacing: 0%;
  }

  thead th {
    color: #777;
    font-weight: 400;
    font-family: inter;
    font-size: ${() => viewSizeCalculator(0.75)};
    line-height: ${() => viewSizeCalculator(0.87375)};
    letter-spacing: 0%;
    background-color: #f7f7fb;
    border-radius: ${() => viewSizeCalculator(0.375)};
    padding-left: ${() => viewSizeCalculator(0.625)};
    padding-right: ${() => viewSizeCalculator(1)};
    white-space: nowrap;
  }

  tbody tr:nth-child(2) td {
    border-top: 0.08vw solid #e3e3f3;
  }

  tbody tr:last-child td {
    border-bottom: ${() => viewSizeCalculator(0.0625)} solid #e3e3f3;
    gap: ${() => viewSizeCalculator(0.125)};
  }
`;

const PPInfoCard = styled.div`
  width: ${() => viewSizeCalculator(23)};
  height: ${() => viewSizeCalculator(35.625)};
  background: #ffffff;
  border-radius: ${() => viewSizeCalculator(1.25)};
  padding: ${() => viewSizeCalculator(1)};
  gap: ${() => viewSizeCalculator(1.25)};
  top: ${() => viewSizeCalculator(10.75)};
  left: ${() => viewSizeCalculator(65.75)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  margin-left: 0;
`;

const RightPPGreyCard = styled.div`
  background: #f7f7fb;
  width: ${() => viewSizeCalculator(21)};
  min-height: ${() => viewSizeCalculator(3.8125)};
  max-height: ${() => viewSizeCalculator(30.125)};
  gap: ${() => viewSizeCalculator(1.25)};
  padding: ${() => viewSizeCalculator(1)};
  border-radius: ${() => viewSizeCalculator(1)};
  overflow: hidden;
`;

const PPInfoSectionHeader = styled.div`
  background: transparent;
  font-weight: 600;
  font-family: Inter;
  font-size: ${() => viewSizeCalculator(1)};
  line-height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border-radius: ${() => viewSizeCalculator(1)};
  gap: ${() => viewSizeCalculator(0.625)};
  width: ${() => viewSizeCalculator(19)};
`;

const PPHeaderTitle = styled.span`
  flex: 1;
  font-weight: 500;
  font-family: inter;
  font-size: ${() => viewSizeCalculator(1)};
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #242639;
`;

const PPInfoSectionBody = styled.div`
  background: transparent;
  padding: ${() => viewSizeCalculator(0.875)} 0
    ${() => viewSizeCalculator(0.875)} 0;

  overflow-y: auto;
  flex-grow: 1;
  display: ${(p) => (p.open ? "block" : "none")};

  font-style: inter;
  font-weight: 400;
  font-size: ${() => viewSizeCalculator(0.875)};
  line-height: ${() => viewSizeCalculator(1.25)};
  letter-spacing: ${() => viewSizeCalculator(0)};
  color: #242639;
`;

const PPViewInsightsBtn = styled.button`
  margin-top: ${() => viewSizeCalculator(1.25)};
  margin-left: auto;
  align-items: self-end;
  gap: ${() => viewSizeCalculator(0.625)};
  align-self: flex-end;
  margin-left: ${() => viewSizeCalculator(9)};
  background: none;
  border: none;
  color: #ed0295;
  font-size: ${() => viewSizeCalculator(0.8125)};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PPViewInsightsIcon = styled.img`
  width: ${() => viewSizeCalculator(0.875)}; /* 14px */
  height: ${() => viewSizeCalculator(0.875)};
  margin-right: ${() => viewSizeCalculator(0.375)}; /* 6px */
  margin-top: ${() => viewSizeCalculator(0.0625)}; /* 1px */
  object-fit: contain;
`;

const PPSitesHeaderText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: ${() => viewSizeCalculator(0.25)};
`;

const PPSitesCount = styled.span`
  font-size: ${() => viewSizeCalculator(1.125)};
  font-weight: 700;
  color: #e20074;
`;

const PPSitesLabel = styled.span`
  font-size: ${() => viewSizeCalculator(0.8125)};
  font-weight: 500;
  color: #666;
`;

const PPSitesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${() => viewSizeCalculator(0.68)};

  th {
    text-align: left;
    background: #f7f7fb;
    padding: ${() => viewSizeCalculator(0.5)};
    font-weight: 500;
  }

  td {
    padding: ${() => viewSizeCalculator(0.5)};
    border-bottom: ${() => viewSizeCalculator(0.0625)} solid #e3e3f3;
  }
`;

const SitePill = styled.span`
  display: inline-block;
  width: ${() => viewSizeCalculator(2.625)};
  height: ${() => viewSizeCalculator(0.625)};
  border-radius: ${() => viewSizeCalculator(0.3125)};
  margin: 0 auto;

  background-color: ${({ type }) =>
    type === 1
      ? "#2ecc71"
      : type === 0
      ? "#f5a623"
      : type === -1
      ? "#d0021b"
      : "#d8d8d8"};
`;

const PPPillGreen = styled.span`
  background: #7cefa2;
  color: #242639;
  border: ${() => viewSizeCalculator(0.0625)} solid #218e45; /* 1px */
  border-radius: ${() => viewSizeCalculator(1.25)}; /* 20px */
  box-sizing: border-box;

  width: ${() => viewSizeCalculator(4.375)}; /* 70px */
  height: ${() => viewSizeCalculator(1.5)}; /* 24px */
  padding: ${() => viewSizeCalculator(0.5)}; /* 8px */

  font-family: Inter;
  font-weight: 500;
  font-size: ${() => viewSizeCalculator(0.6875)}; /* 11px */

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${() => viewSizeCalculator(0.625)}; /* 10px */
`;

const PPSubActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(1.25)}; /* 20px */
`;

const PPDividerVertical = styled.div`
  width: ${() => viewSizeCalculator(0.0625)}; /* 1px */
  height: ${() => viewSizeCalculator(2.75)}; /* 44px */
  background: #dce0e6;
`;

const PPSubActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(0.8)}; /* 0.8vw approx */
`;

const PPActionImg = styled.img`
  width: ${() => viewSizeCalculator(6.4375)}; /* 103px */
  height: ${() => viewSizeCalculator(2)}; /* 32px */
  object-fit: contain;
`;

const PPDownloadImg = styled.img`
  width: ${() => viewSizeCalculator(2)}; /* 32px */
  height: ${() => viewSizeCalculator(2)};
  object-fit: contain;
`;

const PPCancelImg = styled.img`
  width: ${() => viewSizeCalculator(2)}; /* 32px */
  height: ${() => viewSizeCalculator(2)};
  object-fit: contain;
`;

const PPSubLabelWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(0.375)}; /* 6px */
`;

const PPSubValueWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${() => viewSizeCalculator(0.0625)}; /* 1px */
`;

const PPDownIcon = styled.img`
  width: ${() => viewSizeCalculator(0.75)}; /* 12px */
  height: ${() => viewSizeCalculator(0.75)};
`;

const PPRequiredIcon = styled.img`
  width: ${() => viewSizeCalculator(0.875)}; /* 14px */
  height: ${() => viewSizeCalculator(0.875)};
`;

const PPLocationSites = styled.span`
  color: #e20074;
  font-weight: 600;
  font-size: ${() => viewSizeCalculator(1.125)}; /* 18px */
  line-height: 100%;
  letter-spacing: 0%;
  width: ${() => viewSizeCalculator(1.4375)}; /* 23px */
  height: ${() => viewSizeCalculator(1.375)}; /* 22px */
`;

const PPLocationText = styled.span`
  color: #606080;
  font-weight: 500;
  font-size: ${() => viewSizeCalculator(0.8125)}; /* 13px */
  line-height: 100%;
  letter-spacing: 0%;
  width: ${() => viewSizeCalculator(1.9375)}; /* 31px */
  height: ${() => viewSizeCalculator(1)}; /* 16px */
`;

const PPLinkText = styled(PPSubValue)`
  cursor: pointer;
  font-weight: 500;
  font-size: ${() => viewSizeCalculator(1)}; /* 16px */
  line-height: 100%;
  letter-spacing: 0%;
  color: #e20074;
  width: ${() => viewSizeCalculator(6.125)}; /* 98px */
`;

const PPSectionToggleIcon = styled.img`
  width: ${() => viewSizeCalculator(0.875)}; /* 14px */
  height: ${() => viewSizeCalculator(0.875)};
  cursor: pointer;
`;

const PPToggleIcon = styled.img`
  width: ${() => viewSizeCalculator(1.25)}; /* 20px */
  height: ${() => viewSizeCalculator(1.25)}; /* 20px */
  object-fit: contain;
  cursor: pointer;
`;

const PPHeaderRightIcon = styled.img`
  width: ${() => viewSizeCalculator(1.5)}; /* 24px */
  height: ${() => viewSizeCalculator(1.5)}; /* 24px */
  object-fit: contain;
`;

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
          `https://foa-azure.vercel.app/submissions/${submissionId}/full`
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
      orange: arr.filter((s) => s[key] === 0).length,
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
    <PrePostContainer>
      <PPCanvas>
        <PPMainCard>
          {/* SUBMISSION HEADER */}
          <PPSubmissionStrip>
            <PPSubmissionLeft>
              <PPIcon src={RightArrow} />

              <PPSubBlock>
                <PPSubLabelWithIcon>
                  <PPSubLabel>Submission ID</PPSubLabel>
                  <PPDownIcon src={DownArrow} alt="toggle" />
                </PPSubLabelWithIcon>

                <PPSubValueWithIcon>
                  <PPLinkText>{submission.submissionId}</PPLinkText>
                  <PPRequiredIcon src={RequiredIcon} />
                </PPSubValueWithIcon>
              </PPSubBlock>
            </PPSubmissionLeft>

            <PPSubBlock>
              <PPSubLabel>FOA ID</PPSubLabel>
              <PPSubValue>{submission.foaId}</PPSubValue>
            </PPSubBlock>

            <PPSubBlock>
              <PPSubLabel>FOA Vendor</PPSubLabel>
              <PPSubValue>{submission.vendor}</PPSubValue>
            </PPSubBlock>

            <PPSubBlock>
              <PPSubLabel>FOA Status</PPSubLabel>
              <PPStatusPill>{submission.status}</PPStatusPill>
            </PPSubBlock>

            <PPSubBlock>
              <PPSubLabel>{submission.location}</PPSubLabel>
              <PPSubValue>
                <PPLocationSites>{submission.totalSites}</PPLocationSites>
                <PPLocationText>Sites</PPLocationText>
              </PPSubValue>
            </PPSubBlock>

            <PPSubActionsWrapper>
              <PPDividerVertical />

              <PPSubActions>
                <PPActionBtn>
                  <PPActionImg src={ActionIcon} />
                </PPActionBtn>

                <PPActionBtn>
                  <PPDownloadImg src={DownloadIcon} />
                </PPActionBtn>

                <PPActionBtn>
                  <PPCancelImg src={CancelIcon} />
                </PPActionBtn>
              </PPSubActions>
            </PPSubActionsWrapper>
          </PPSubmissionStrip>

          <PPContentGrid>
            <PPLeftCol>
              {" "}
              <PPKpiSummary>
                <KpiCard title="Voice" data={voiceSummary} />
                <KpiCard title="SA" data={saSummary} />
                <KpiCard title="NSA" data={nsaSummary} />
                <KpiCard title="Common" data={commonSummary} />
              </PPKpiSummary>
              <PPKpiCombinedCard>
                {/* Retainability */}
                <PPGreyCard>
                  <PPSectionHeader
                    onClick={() => {
                      setRetainOpen(true);
                      setAccessOpen(false);
                    }}
                  >
                    <PPSectionTitle>
                      <PPSectionToggleIcon
                        src={retainOpen ? DownArrow : RightArrow}
                      />

                      <span>Retainability</span>
                    </PPSectionTitle>
                  </PPSectionHeader>

                  <PPExpandBody open={retainOpen}>
                    <PPTabs>
                      <PPTab
                        active={retainTab === "main"}
                        onClick={() => setRetainTab("main")}
                      >
                        MAIN KPIS
                      </PPTab>

                      <PPTab
                        active={retainTab === "detailed"}
                        onClick={() => setRetainTab("detailed")}
                      >
                        DETAILED KPIS
                      </PPTab>
                    </PPTabs>

                    <PPTableWrapper>
                      <PPKpiTable>
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
                          ).map((kpi, idx) => (
                            <tr key={idx}>
                              <td>{kpi.kpiName}</td>
                              <td>{kpi.type}</td>
                              <td>{kpi.preMedian}</td>
                              <td>{kpi.postMedian}</td>
                              <td>
                                <PPPillGreen>{kpi.percentChange}</PPPillGreen>
                              </td>
                              <td>{kpi.improvedSites}</td>
                              <td>{kpi.degradedSites}</td>
                              <td>{kpi.noChangeSites}</td>
                            </tr>
                          ))}
                        </tbody>
                      </PPKpiTable>
                    </PPTableWrapper>
                  </PPExpandBody>
                </PPGreyCard>

                {/* Accessibility */}
                <PPGreyCard>
                  <PPSectionHeader
                    onClick={() => {
                      setAccessOpen(true);
                      setRetainOpen(false);
                    }}
                  >
                    <PPSectionTitle>
                      <PPSectionToggleIcon
                        src={accessOpen ? DownArrow : RightArrow}
                      />

                      <span>Accessibility</span>
                    </PPSectionTitle>
                  </PPSectionHeader>

                  <PPExpandBody open={accessOpen}>
                    <PPTabs>
                      <PPTab
                        active={accessTab === "main"}
                        onClick={() => setAccessTab("main")}
                      >
                        MAIN KPIS
                      </PPTab>

                      <PPTab
                        active={accessTab === "detailed"}
                        onClick={() => setAccessTab("detailed")}
                      >
                        DETAILED KPIS
                      </PPTab>
                    </PPTabs>

                    <PPTableWrapper>
                      <PPKpiTable>
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
                          ).map((kpi, idx) => (
                            <tr key={idx}>
                              <td>{kpi.kpiName}</td>
                              <td>{kpi.type}</td>
                              <td>{kpi.preMedian}</td>
                              <td>{kpi.postMedian}</td>
                              <td>
                                <PPPillGreen>{kpi.percentChange}</PPPillGreen>
                              </td>
                              <td>{kpi.improvedSites}</td>
                              <td>{kpi.degradedSites}</td>
                              <td>{kpi.noChangeSites}</td>
                            </tr>
                          ))}
                        </tbody>
                      </PPKpiTable>
                    </PPTableWrapper>
                  </PPExpandBody>
                </PPGreyCard>
              </PPKpiCombinedCard>
            </PPLeftCol>

            {/* RIGHT COLUMN */}
            <PPInfoCard>
              {/* Insights */}
              <RightPPGreyCard>
                <PPInfoSectionHeader
                  onClick={() => {
                    setSitesOpen(false);
                    setInsightsOpen(!insightsOpen);
                  }}
                >
                  <PPToggleIcon
                    src={insightsOpen ? DownArrow : RightArrow}
                    alt="toggle"
                  />

                  <PPHeaderTitle>Insights</PPHeaderTitle>

                  <PPHeaderRightIcon src={InsightsIcon} alt="insights" />
                </PPInfoSectionHeader>

                <PPInfoSectionBody open={insightsOpen}>
                  <p>
                    <strong>Voice:</strong> Small improvement in access.
                  </p>
                  <p>
                    <strong>Data & Congestion:</strong> Access improved,
                    congestion greatly reduced.
                  </p>
                  <p>
                    <strong>Signal & Experience:</strong> Mixed signal results,
                    user experience declined.
                  </p>

                  <PPViewInsightsBtn>
                    <PPViewInsightsIcon src={MoreIcon} alt="more" />
                    <span>View Detailed Insights</span>
                  </PPViewInsightsBtn>
                </PPInfoSectionBody>
              </RightPPGreyCard>

              {/* Sites */}
              <RightPPGreyCard>
                <PPInfoSectionHeader
                  onClick={() => {
                    setInsightsOpen(false);
                    setSitesOpen(!sitesOpen);
                  }}
                >
                  <PPToggleIcon
                    src={sitesOpen ? DownArrow : RightArrow}
                    alt="toggle"
                  />

                  <PPSitesHeaderText>
                    <PPSitesCount>{submission.totalSites}</PPSitesCount>
                    <PPSitesLabel>Sites</PPSitesLabel>
                  </PPSitesHeaderText>
                </PPInfoSectionHeader>

                <PPInfoSectionBody open={sitesOpen}>
                  <PPSitesTable>
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
                            <SitePill type={site.voice} />
                          </td>

                          <td>
                            <SitePill type={site.sa} />
                          </td>

                          <td>
                            <SitePill type={site.nsa} />
                          </td>

                          <td>
                            <SitePill type={site.common} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </PPSitesTable>
                </PPInfoSectionBody>
              </RightPPGreyCard>
            </PPInfoCard>
          </PPContentGrid>
        </PPMainCard>
      </PPCanvas>
    </PrePostContainer>
  );
}

function KpiCard({ title, data }) {
  const iconMap = {
    Voice: VoiceIcon,
    SA: SaIcon,
    NSA: NsaIcon,
    Common: CommonIcon,
  };

  const iconToUse = iconMap[title] || CommonIcon;

  return (
    <PPKpiCard className={title === "Voice" ? "voice" : ""}>
      <PPKpiTitleRow>
        <PPKpiTitle>{title}</PPKpiTitle>
        <PPKpiBadgeIcon src={iconToUse} alt={`${title} icon`} />
      </PPKpiTitleRow>

      <PPKpiBadges>
        <PPBadge type="good">
          <PPKpiStatusIcon src={PlusIcon} />
          <PPBadgeValue>{data.green || 0}</PPBadgeValue>
        </PPBadge>

        <PPBadge type="bad">
          <PPKpiStatusIcon src={MinusIcon} />
          <PPBadgeValue>{data.red || 0}</PPBadgeValue>
        </PPBadge>

        <PPBadge type="neutral">
          <PPKpiStatusIcon src={ZeroIcon} />
          <PPBadgeValue>{data.orange || 0}</PPBadgeValue>
        </PPBadge>
      </PPKpiBadges>
    </PPKpiCard>
  );
}

function Badge({ value, type }) {
  const iconMap = {
    good: PlusIcon,
    bad: MinusIcon,
    neutral: ZeroIcon,
  };

  const iconToUse = iconMap[type];

  return (
    <PPBadge type={type}>
      <PPBadgeIcon src={iconToUse} alt={type} />
      <PPBadgeValue>{value}</PPBadgeValue>
    </PPBadge>
  );
}
