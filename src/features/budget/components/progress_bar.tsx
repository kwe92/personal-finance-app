import "./css/progress_bar.css";

export const ProgressBar = ({
  maxAmount,
  expendedAmount,
}: {
  maxAmount: number;
  expendedAmount: number;
}): JSX.Element => (
  <div className="progress-bar-main">
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
