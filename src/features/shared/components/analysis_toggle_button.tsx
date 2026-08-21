import "./css/analysis_toggle_button.css";

export const AnalysisToggleButton = ({
  isTrackerOpen,
  chartIcon,
  onTap,
  style,
}: {
  isTrackerOpen: boolean;
  chartIcon: string;
  onTap: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}): JSX.Element => (
  <button
    className={`analyze-toggle-button ${isTrackerOpen ? "active" : ""}`}
    onClick={onTap}
    style={style}
  >
    <img src={chartIcon} alt="analyze" />
    <span>{isTrackerOpen ? "Hide Analysis" : "Analyze"}</span>
  </button>
);

export default AnalysisToggleButton;
