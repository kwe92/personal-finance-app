import "./css/overview_view_shared_styles.css";
import OverviewIconTextButton from "./overview_icon_text_button";

const OverviewSectionHeader = ({
  title,
  buttonLabel,
  onTap,
}: {
  title: string;
  buttonLabel: string;
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div className="overview-title-text-button-section">
      <p>{title}</p>
      <OverviewIconTextButton label={buttonLabel} onTap={onTap} />
    </div>
  );
};

export default OverviewSectionHeader;
