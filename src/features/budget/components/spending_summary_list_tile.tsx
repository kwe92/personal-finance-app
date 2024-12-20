// TODO: remove inline css

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        // alignItems: "center",
        height: "24px",
      }}
    >
      {/*  vertical line and label section*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* list tile vertical line */}
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

      {/* Expended Amount */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          ${expendedAmount.toFixed(2)}
        </p>
        {/* Max Amount */}
        <p style={{ fontSize: "12px", fontWeight: "normal", color: "#696868" }}>
          of ${maxAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
