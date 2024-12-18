import "./css/drop_down_menu.css";
import caretDown from "../../../assets/images/icon-caret-down.svg";
import { Divider } from "./divider";

export const DropDownMenu = ({
  id,
  title,
  label,
  content,
  onMenuTap,
  onItemTap,
}: {
  id?: string;
  title: string;
  label: string;
  content: string[];
  onMenuTap?: React.MouseEventHandler;
  onItemTap?: Function;
}): JSX.Element => {
  const dropDownMenuItems = content.map((menuItem, i) => {
    return (
      <>
        <li
          key={i}
          onClick={() => {
            onItemTap?.(menuItem);
          }}
        >
          {menuItem}
        </li>
        {content.length - 1 !== i ? <Divider /> : <></>}
      </>
    );
  });

  return (
    <div
      id={id}
      className="dropdown"
      style={{ position: "relative" }}
      onClick={onMenuTap}
    >
      <div className="drop-down-menu-container">
        <p style={{ color: "#696868" }}>{title}</p>
        <div className="drop-down-menu-selector">
          <p>{label}</p>
          <img src={caretDown} alt="caret down" />
        </div>
      </div>
      <ul className="drop-down-menu-content">{dropDownMenuItems}</ul>
    </div>
  );
};
