import "./css/overview_view_shared_styles.css";
import * as gaps from "../../../app/constants/reusable";
import IconCaretRight from "./icon_caret_right";

const OverviewIconTextButton = ({
  label,
  onTap,
}: {
  label: string;
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div className="overview-icon-text-button" onClick={onTap}>
      <p>{label}</p>
      <IconCaretRight />
    </div>
  );
};

export default OverviewIconTextButton;
