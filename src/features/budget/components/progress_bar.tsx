// TODO: remove inline css

export const ProgressBar = ({
  maxAmount,
  expendedAmount,
}: {
  maxAmount: number;
  expendedAmount: number;
}): JSX.Element => (
  <div
    style={{
      width: "100%",
      height: "42px",
      backgroundColor: "#F8F4F0",
      borderRadius: "6px",
    }}
  >
    <div
      style={{
        width: ((expendedAmount / maxAmount) * 100).toString() + "%",
        height: "inherit",
        backgroundColor: expendedAmount / maxAmount < 1 ? "#82C9D7" : "#e7162a",
        borderRadius: "inherit",
      }}
    />
  </div>
);
