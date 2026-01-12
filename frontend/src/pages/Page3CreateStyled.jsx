import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import CalendarIcon from "../assets/Calendar.png";
import RequiredIcon from "../assets/Required.png";
import SelectedIcon from "../assets/Selected.png";
import UnselectedIcon from "../assets/Unselected.png";
import CalendarModal from "../components/CalendarModalStyled";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 70px auto 70px auto;
  margin-left: 115px;
  margin-right: 115px;
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 60px;
`;

const Header = styled.div`
  height: 64px;
  width: 100%;

  background: #f7f8fc;

  display: flex;
  align-items: center;
  font: Inter;
  padding-left: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1b2f;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 32px 48px;
  border-radius: 0 0 16px 16px;
  overflow-y: auto;
`;

const Inner = styled.div`
  width: 760px;
  height: 621px; /* exact working width */
  margin: auto; /* adjust based on your UI */
  display: flex;
  margin-bottom: 50px;
  flex-direction: column;
  gap: 30px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #242639;
  font-family: Inter;
  line-height: 22px;
`;

const OptionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

const OptionBox = styled.div`
  width: 365px;
  height: 44px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 14px;
  cursor: pointer;
  font-family: Inter;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -2%;
  font-style: medium;
`;

const RadioIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  object-fit: contain;
`;

const Input = styled.input`
  width: 752px;
  height: 44px;
  padding: 1.5vh 1vw;
  border: 1px solid #ccc;
  border-radius: 0.8vw;
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const PeriodSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 1px;
`;

const PeriodBox = styled.div`
  width: 365px;
  height: 70px;
  display: flex;
  margin-bottom: 5px;
  margin-top: 10px;
  flex-direction: column;
  gap: 12px;
`;

const DateRangeBox = styled.div`
  width: 356px;
  height: 70px;

  display: flex;
  align-items: center;

  border: 1px solid #d1d5db;
  border-radius: 8px;

  background: #fff;
  padding: 0 14px;
  cursor: pointer;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  font-size: 14px;
  color: #5b5f73;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 60%;
  background: #d1d5db;
  margin-right: 10px;
`;

const CalendarImg = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.75;
`;

const ToggleRow = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 20px;
`;

const ToggleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ToggleBtns = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleBtn = styled.button`
  min-width: 104px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ active }) => (active ? "#e6007a" : "#ccc")};
  background: ${({ active }) => (active ? "#ffebf5" : "#fff")};
  color: ${({ active }) => (active ? "#e6007a" : "#000")};
  cursor: pointer;
`;

const BottomBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0; /* sits exactly above footer */
  height: 60px;
  margin-bottom: 20px;

  background: #ffffff;
  border-top: 1px solid #dcdcdc;

  padding: 0 40px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: flex-end; /* or space-between if you prefer */

  z-index: 90;
`;

const CancelBtn = styled.button`
  width: 78px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #8693a4;

  padding: 6px 16px 6px 16px;
  gap: 8px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 20px;
`;

const SubmitBtn = styled.button`
  width: 78px;
  height: 36px;
  border-radius: 8px;
  border: none;
  color: #fff;
  background: ${({ active }) => (active ? "#e6007a" : "#8693a4")};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  font-weight: 600;
`;

export default function Page3CreateFoa() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState("Ericsson");
  const [placebo, setPlacebo] = useState("Yes");
  const [fullMarket, setFullMarket] = useState("Yes");
  const [excludeFoa, setExcludeFoa] = useState("Yes");

  const [preStart, setPreStart] = useState("");
  const [preEnd, setPreEnd] = useState("");
  const [postStart, setPostStart] = useState("");
  const [postEnd, setPostEnd] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [calendarType, setCalendarType] = useState(null);
  const [tempRange, setTempRange] = useState({ start: "", end: "" });

  const isFormValid =
    vendor &&
    preStart &&
    preEnd &&
    postStart &&
    postEnd &&
    placebo &&
    fullMarket &&
    excludeFoa;

  const onSubmit = () => navigate("/list");

  const openCalendar = (field, type) => {
    setActiveField(field);
    setCalendarType(type);

    if (type === "pre") {
      setTempRange({
        start: preStart || "",
        end: preEnd || "",
      });
    } else {
      setTempRange({
        start: postStart || "",
        end: postEnd || "",
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

  return (
    <Wrapper>
      <Header>Create FOA</Header>

      <Card>
        <Inner>
          <Label>FOA Vendor</Label>

          <OptionRow>
            <OptionBox
              active={vendor === "Ericsson"}
              onClick={() => setVendor("Ericsson")}
            >
              <RadioIcon
                src={vendor === "Ericsson" ? SelectedIcon : UnselectedIcon}
              />
              Ericsson
            </OptionBox>

            <OptionBox
              active={vendor === "Nokia"}
              onClick={() => setVendor("Nokia")}
            >
              <RadioIcon
                src={vendor === "Nokia" ? SelectedIcon : UnselectedIcon}
              />
              Nokia
            </OptionBox>
          </OptionRow>

          <Label>FOA Description</Label>
          <Input placeholder="Type FOA Description" />

          {/* PRE / POST */}
          <PeriodSection>
            <PeriodBox>
              <Label>Pre Period</Label>
              <DateRangeBox>
                <DateItem onClick={() => openCalendar("pre-start", "pre")}>
                  <CalendarImg src={CalendarIcon} />
                  {preStart || "Start Date"}
                </DateItem>
                <VerticalLine />
                <DateItem onClick={() => openCalendar("pre-end", "pre")}>
                  <CalendarImg src={CalendarIcon} />
                  {preEnd || "End Date"}
                </DateItem>
              </DateRangeBox>
            </PeriodBox>

            <PeriodBox>
              <Label>Post Period</Label>
              <DateRangeBox>
                <DateItem onClick={() => openCalendar("post-start", "post")}>
                  <CalendarImg src={CalendarIcon} />
                  {postStart || "Start Date"}
                </DateItem>
                <VerticalLine />
                <DateItem onClick={() => openCalendar("post-end", "post")}>
                  <CalendarImg src={CalendarIcon} />
                  {postEnd || "End Date"}
                </DateItem>
              </DateRangeBox>
            </PeriodBox>
          </PeriodSection>

          {/* Toggles */}
          <ToggleRow>
            <ToggleCol>
              <Label>
                Placebo Required
                <img src={RequiredIcon} width={12} height={12} />
              </Label>

              <ToggleBtns>
                <ToggleBtn
                  active={placebo === "Yes"}
                  onClick={() => setPlacebo("Yes")}
                >
                  Yes
                </ToggleBtn>
                <ToggleBtn
                  active={placebo === "No"}
                  onClick={() => setPlacebo("No")}
                >
                  No
                </ToggleBtn>
              </ToggleBtns>
            </ToggleCol>

            <ToggleCol>
              <Label>
                Full Market
                <img src={RequiredIcon} width={12} height={12} />
              </Label>

              <ToggleBtns>
                <ToggleBtn
                  active={fullMarket === "Yes"}
                  onClick={() => setFullMarket("Yes")}
                >
                  Yes
                </ToggleBtn>
                <ToggleBtn
                  active={fullMarket === "No"}
                  onClick={() => setFullMarket("No")}
                >
                  No
                </ToggleBtn>
              </ToggleBtns>
            </ToggleCol>

            <ToggleCol>
              <Label>
                Market Excluding FOA
                <img src={RequiredIcon} width={12} height={12} />
              </Label>

              <ToggleBtns>
                <ToggleBtn
                  active={excludeFoa === "Yes"}
                  onClick={() => setExcludeFoa("Yes")}
                >
                  Yes
                </ToggleBtn>
                <ToggleBtn
                  active={excludeFoa === "No"}
                  onClick={() => setExcludeFoa("No")}
                >
                  No
                </ToggleBtn>
              </ToggleBtns>
            </ToggleCol>
          </ToggleRow>
        </Inner>
      </Card>

      {/* Bottom Bar */}
      <BottomBar>
        <CancelBtn onClick={() => navigate("/list")}>Cancel</CancelBtn>

        <SubmitBtn
          active={isFormValid}
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          Submit
        </SubmitBtn>
      </BottomBar>
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
    </Wrapper>
  );
}
