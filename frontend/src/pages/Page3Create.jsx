import React, { useEffect, useRef, useState } from "react";
import "./page3.css";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../assets/Calendar.png";
import RequiredIcon from "../assets/Required.png";
import SelectedIcon from "../assets/Selected.png";
import UnselectedIcon from "../assets/Unselected.png";

export default function Page3CreateFoa() {
  const [vendor, setVendor] = useState("Ericsson");
  const [placebo, setPlacebo] = useState("Yes");
  const [fullMarket, setFullMarket] = useState("Yes");
  const [excludeFoa, setExcludeFoa] = useState("Yes");
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [preStart, setPreStart] = useState("");
  const [preEnd, setPreEnd] = useState("");
  const [postStart, setPostStart] = useState("");
  const [postEnd, setPostEnd] = useState("");
  const [tempRange, setTempRange] = useState({ start: "", end: "" });
  const [calendarType, setCalendarType] = useState(null);

  const navigate = useNavigate();

  const openCalendar = (field, type) => {
    setActiveField(field);
    setCalendarType(type);

    if (type === "pre") {
      setTempRange({
        start: preStart || "",
        end: preEnd || ""
      });
    } else {
      setTempRange({
        start: postStart || "",
        end: postEnd || ""
      });
    }

    setShowCalendar(true);
  };

  const confirmDate = () => {
    if (activeField === "pre-start" || activeField === "pre-end") {
      setPreStart(tempRange.start);
      setPreEnd(tempRange.end);
    }

    if (activeField === "post-start" || activeField === "post-end") {
      setPostStart(tempRange.start);
      setPostEnd(tempRange.end);
    }

    setShowCalendar(false);
  };

  const onSubmit = () => {
    navigate("/list");
  };

  const isFormValid =
    vendor &&
    preStart &&
    preEnd &&
    postStart &&
    postEnd &&
    placebo &&
    fullMarket &&
    excludeFoa;

  return (
    <>
      <div className="foa-wrapper">
        {/* Header */}
        <div className="foa-header">Create FOA</div>

        {/* Main Card */}
        <div className="foa-card">
          <div className="foa-inner">
            <label className="label">FOA Vendor</label>

            <div className="option-row">
              {/* Ericsson */}
              <div
                className={`option-box ${
                  vendor === "Ericsson" ? "active" : ""
                }`}
                onClick={() => setVendor("Ericsson")}
              >
                <img
                  src={vendor === "Ericsson" ? SelectedIcon : UnselectedIcon}
                  className="radio-icon"
                  alt="radio"
                />
                <span>Ericsson</span>
              </div>

              {/* Nokia */}
              <div
                className={`option-box ${vendor === "Nokia" ? "active" : ""}`}
                onClick={() => setVendor("Nokia")}
              >
                <img
                  src={vendor === "Nokia" ? SelectedIcon : UnselectedIcon}
                  className="radio-icon"
                  alt="radio"
                />
                <span>Nokia</span>
              </div>
            </div>

            <label className="label">FOA Description</label>
            <input
              className="input-field"
              placeholder="Type FOA Description"
            />

            {/* PRE/POST Period */}
            <div className="period-section">
              <div className="period-box date-anchor">
                <label className="label">Pre Period</label>

                <div className="date-range-box">
                  <div
                    className="date-item"
                    onClick={() => openCalendar("pre-start", "pre")}
                  >
                    <img src={CalendarIcon} className="calendar-icon" />
                    <span>{preStart || "Start Date"}</span>
                  </div>

                  <div className="vertical-line"></div>

                  <div
                    className="date-item"
                    onClick={() => openCalendar("pre-end", "pre")}
                  >
                    <img src={CalendarIcon} className="calendar-icon" />
                    <span>{preEnd || "End Date"}</span>
                  </div>
                </div>
              </div>

              <div className="period-box date-anchor">
                <label className="label">Post Period</label>

                <div className="date-range-box">
                  <div
                    className="date-item"
                    onClick={() => openCalendar("post-start", "post")}
                  >
                    <img src={CalendarIcon} className="calendar-icon" />
                    <span>{postStart || "Start Date"}</span>
                  </div>

                  <div className="vertical-line"></div>

                  <div
                    className="date-item"
                    onClick={() => openCalendar("post-end", "post")}
                  >
                    <img src={CalendarIcon} className="calendar-icon" />
                    <span>{postEnd || "End Date"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="toggle-row">
              <div className="toggle-col">
                <label className="label">
                  Placebo Required
                  <img
                    src={RequiredIcon}
                    alt="required"
                    className="required-icon"
                  />
                </label>
                <div className="toggle-btns">
                  <button
                    className={placebo === "Yes" ? "yes active" : "yes"}
                    onClick={() => setPlacebo("Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={placebo === "No" ? "no active" : "no"}
                    onClick={() => setPlacebo("No")}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="toggle-col">
                <label className="label">
                  Full Market
                  <img
                    src={RequiredIcon}
                    alt="required"
                    className="required-icon"
                  />
                </label>
                <div className="toggle-btns">
                  <button
                    className={fullMarket === "Yes" ? "yes active" : "yes"}
                    onClick={() => setFullMarket("Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={fullMarket === "No" ? "no active" : "no"}
                    onClick={() => setFullMarket("No")}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="toggle-col">
                <label className="label">
                  Market Excluding FOA
                  <img
                    src={RequiredIcon}
                    alt="required"
                    className="required-icon"
                  />
                </label>
                <div className="toggle-btns">
                  <button
                    className={excludeFoa === "Yes" ? "yes active" : "yes"}
                    onClick={() => setExcludeFoa("Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={excludeFoa === "No" ? "no active" : "no"}
                    onClick={() => setExcludeFoa("No")}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bottom-action-bar">
          <button
            className="cancel-bottom-btn"
            onClick={() => navigate("/list")}
          >
            Cancel
          </button>

          <button
            className={`submit-bottom-btn ${isFormValid ? "active" : ""}`}
            disabled={!isFormValid}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>

        {showCalendar && (
          <CalendarModal
            activeField={activeField}
            calendarType={calendarType}
            preStart={preStart}
            preEnd={preEnd}
            postStart={postStart}
            postEnd={postEnd}
            tempRange={tempRange}
            setTempRange={setTempRange}
            confirmDate={confirmDate}
            setShowCalendar={setShowCalendar}
          />
        )}
      </div>
    </>
  );
}
