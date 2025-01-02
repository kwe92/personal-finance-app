import "./css/progress_bar.css";

export const ProgressBar = ({
  maxAmount,
  expendedAmount,
  themeColor,
}: {
  maxAmount: number;
  expendedAmount: number;
  themeColor: string;
}): JSX.Element => {
  const percentSpent = Math.abs(expendedAmount / maxAmount);

  return (
    <div className="progress-bar-main">
      <div
        style={{
          width: (percentSpent * 100).toString() + "%",
          maxWidth: "100%",
          height: "inherit",
          backgroundColor: percentSpent < 1 ? themeColor : "#e7162a",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
};
