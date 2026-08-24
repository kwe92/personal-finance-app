import React, { useState } from "react";
import "../../shared/css/view_container.css";

export const CalendarModal = ({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (start: Date, end: Date) => void;
}) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-content" style={modalStyle}>
        <h3>Select Date Range</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            margin: "20px 0",
          }}
        >
          <div>
            <label style={labelStyle}>Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button onClick={onClose} style={secondaryBtn}>
            Cancel
          </button>
          <button
            disabled={!start || !end}
            onClick={() => onApply(new Date(start), new Date(end))}
            style={primaryBtn}
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalStyle: React.CSSProperties = {
  background: "white",
  padding: "32px",
  borderRadius: "12px",
  width: "350px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #F2F2F2",
  marginTop: "4px",
};
const labelStyle: React.CSSProperties = { fontSize: "12px", color: "#696868" };
const primaryBtn: React.CSSProperties = {
  padding: "10px 20px",
  background: "#277C78",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
const secondaryBtn: React.CSSProperties = {
  padding: "10px 20px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#696868",
};
