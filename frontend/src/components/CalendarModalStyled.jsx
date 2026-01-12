import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 120px;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 760px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Day = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: ${({ selected }) => (selected ? "#e6007a" : "#f4f5fa")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  cursor: pointer;

  &:hover {
    background: ${({ selected }) => (selected ? "#e6007a" : "#e9eaf5")};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const Btn = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const CancelBtn = styled(Btn)`
  background: #f0f0f0;
`;

const ConfirmBtn = styled(Btn)`
  background: #e6007a;
  color: white;
`;

export default function CalendarModal({
  tempRange,
  setTempRange,
  confirmDate,
  setShowCalendar,
}) {
  const selectDate = (day) => {
    if (!tempRange.start) {
      setTempRange({ start: day, end: "" });
    } else {
      setTempRange({ ...tempRange, end: day });
    }
  };

  return (
    <Overlay onClick={() => setShowCalendar(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>Select Date Range</Header>

        <Grid>
          {Array.from({ length: 30 }).map((_, i) => {
            const day = `2025-01-${String(i + 1).padStart(2, "0")}`;
            return (
              <Day
                key={day}
                selected={tempRange.start === day || tempRange.end === day}
                onClick={() => selectDate(day)}
              >
                {i + 1}
              </Day>
            );
          })}
        </Grid>

        <Footer>
          <CancelBtn onClick={() => setShowCalendar(false)}>Cancel</CancelBtn>
          <ConfirmBtn onClick={confirmDate}>Confirm</ConfirmBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
}
