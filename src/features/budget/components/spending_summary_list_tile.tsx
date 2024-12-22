import "./css/spending_summary_list_tile.css";

export const SpendingSummaryListTile = ({
  label,
  maxAmount,
  expendedAmount,
  lineColor,
}: {
  label: string;
  maxAmount: number;
  expendedAmount: number;
  lineColor: string;
}): JSX.Element => {
  return (
    <div className="spending-summary-list-tile-main">
      {/*  vertical line and label section*/}
      <div className="spending-summary-left-section">
        {/* list tile vertical line | NOTE: may need to be moved to a css file instead of being styled inline */}
        <div
          style={{
            width: "4px",
            height: "100%",
            borderRadius: "12px",
            backgroundColor: lineColor,
          }}
        />
        <p style={{ fontSize: "14px", color: "#696868" }}>{label}</p>
      </div>

      <div className="spending-summary-right-section">
        <p>${expendedAmount.toFixed(2)}</p>
        <p>of ${maxAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};
