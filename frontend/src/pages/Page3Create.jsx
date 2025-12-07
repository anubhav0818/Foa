import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./page3.css";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
export default function Page3CreateFoa() {

  // main form state
  const [vendor, setVendor] = useState("Ericsson");
  const [placebo, setPlacebo] = useState("Yes");
  const [fullMarket, setFullMarket] = useState("Yes");
  const [excludeFoa, setExcludeFoa] = useState("Yes");

  // calendar controls
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null); // "pre-start" | "pre-end" | "post-start" | "post-end"

  // form date values
  const [preStart, setPreStart] = useState("");
  const [preEnd, setPreEnd] = useState("");
  const [postStart, setPostStart] = useState("");
  const [postEnd, setPostEnd] = useState("");

  // temporary selection (for modal)
  const [temp, setTemp] = useState("");

  // open calendar modal
  const openCalendar = (field) => {
    setActiveField(field);
    setShowCalendar(true);
  };

  // confirm button
  const confirmDate = () => {
    if (activeField === "pre-start" || activeField === "pre-end") {
      setPreStart(temp);
      setPreEnd(temp);
    }
    if (activeField === "post-start" || activeField === "post-end") {
      setPostStart(temp);
      setPostEnd(temp);
    }

    setShowCalendar(false);
  };

  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/list");
  };

  return (
    <div className="foa-container">
      <div className="foa-card">

        <h2 className="title">Create FOA</h2>

        {/* Vendor */}
        <label className="label">FOA Vendor</label>
        <div className="option-row">

          <div
            className={`option-box ${vendor === "Ericsson" ? "active" : ""}`}
            onClick={() => setVendor("Ericsson")}
          >
            <input type="radio" checked readOnly />
            Ericsson
          </div>

          <div
            className={`option-box ${vendor === "Nokia" ? "active" : ""}`}
            onClick={() => setVendor("Nokia")}
          >
            <input type="radio" checked={vendor === "Nokia"} readOnly />
            Nokia
          </div>

        </div>

        {/* Description */}
        <label className="label">FOA Description</label>
        <input className="input-field" placeholder="Type FOA Description" />

        {/* PERIOD SECTION */}
        <div className="period-section">

          {/* PRE PERIOD */}
          <div className="period-box">
            <label className="label">Pre Period</label>

            <div className="date-row">

              <div
                className="custom-date-input"
                onClick={() => openCalendar("pre-start")}
              >
                {preStart || "Start Date"}
              </div>

              <div
                className="custom-date-input"
                onClick={() => openCalendar("pre-end")}
              >
                {preEnd || "End Date"}
              </div>

            </div>
          </div>

          {/* POST PERIOD */}
          <div className="period-box">
            <label className="label">Post Period</label>

            <div className="date-row">

              <div
                className="custom-date-input"
                onClick={() => openCalendar("post-start")}
              >
                {postStart || "Start Date"}
              </div>

              <div
                className="custom-date-input"
                onClick={() => openCalendar("post-end")}
              >
                {postEnd || "End Date"}
              </div>

            </div>
          </div>

        </div>

        {/* Toggles */}
        <div className="toggle-row">

          <div className="toggle-col">
            <label className="label">Placebo Required</label>
            <div className="toggle-btns">
              <button className={placebo==="Yes" ? "yes active":"yes"} onClick={()=>setPlacebo("Yes")}>Yes</button>
              <button className={placebo==="No" ? "no active":"no"} onClick={()=>setPlacebo("No")}>No</button>
            </div>
          </div>

          <div className="toggle-col">
            <label className="label">Full Market</label>
            <div className="toggle-btns">
              <button className={fullMarket==="Yes" ? "yes active":"yes"} onClick={()=>setFullMarket("Yes")}>Yes</button>
              <button className={fullMarket==="No" ? "no active":"no"} onClick={()=>setFullMarket("No")}>No</button>
            </div>
          </div>

          <div className="toggle-col">
            <label className="label">Market Excluding FOA</label>
            <div className="toggle-btns">
              <button className={excludeFoa==="Yes" ? "yes active":"yes"} onClick={()=>setExcludeFoa("Yes")}>Yes</button>
              <button className={excludeFoa==="No" ? "no active":"no"} onClick={()=>setExcludeFoa("No")}>No</button>
            </div>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="btn-row">
          <button className="cancel-btn">Cancel</button>
          <button className="submit-btn" onClick={() => onSubmit()}>Submit</button>
        </div>

      </div>

      {/* CALENDAR MODAL */}
      {showCalendar && (
        <CalendarModal
          setShowCalendar={setShowCalendar}
          setTemp={setTemp}
          temp={temp}
          confirmDate={confirmDate}
        />
      )}

    </div>
  );
}



function CalendarModal({ temp, setTemp, confirmDate, setShowCalendar }) {

  const months = ["January","February","March","April","May","June","July"];

  const renderMonth = (year, month) => {

    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let grid = [];

    for (let i = 0; i < firstDay; i++) grid.push("");
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);

    return (
      <div className="cal-month">
        <h3>{months[month]} {year}</h3>

        <div className="cal-grid">

          {["S","M","T","W","T","F","S"].map((d)=>
            <div className="cal-dayname" key={d}>{d}</div>
          )}

          {grid.map((d, idx)=>(
            <div
              key={idx}
              className={`cal-day ${temp===d ? "selected":""}`}
              onClick={() => d !== "" && setTemp(`${year}-${month+1}-${d}`)}
            >
              {d}
            </div>
          ))}

        </div>
      </div>
    );
  };

  return (
    <div className="calendar-overlay">
      <div className="calendar-modal">

        <div className="cal-wrapper">
          {renderMonth(2025, 5)} {/* June */}
          {renderMonth(2025, 6)} {/* July */}
        </div>

        <div className="calendar-actions">
          <button className="cancel-btn" onClick={()=>setShowCalendar(false)}>Cancel</button>
          <button className="confirm-btn" onClick={confirmDate}>Confirm</button>
        </div>

      </div>
    </div>
  );
}
