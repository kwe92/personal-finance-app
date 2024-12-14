import "./css/drop_down_menu.css";
import caretDown from "../../../assets/images/icon-caret-down.svg";

export const DropDownMenu = ({
  title,
  label,
  onTap,
}: {
  title: string;
  label: string; // TODO: label needs to chsnge dynamically based on selection
  onTap: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div className="drop-down-menu-container" onClick={onTap}>
      <p style={{ color: "#696868" }}>{title}</p>
      <div className="drop-down-menu-content">
        <p>{label}</p>
        <img src={caretDown} alt="caret down" />
      </div>
    </div>
  );
};
