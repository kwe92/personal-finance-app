import "./css/drop_down_menu.css";
import caretDown from "../../../assets/images/icon-caret-down.svg";
import { Divider } from "./divider";
import useWindowSize from "../hooks/use_window_size";
import { useTransactionViewData } from "../../transactions/context/transaction_view_context";

// TODO: fix the spacing of category drop down menu items as they are bunched together for some reason

export const DropDownMenu = ({
  id,
  title,
  label,
  content,
  icon,
  onMenuTap,
  onItemTap,
}: {
  id?: string;
  title: string;
  label: string;
  content: string[];
  icon: string;
  onMenuTap?: React.MouseEventHandler;
  onItemTap?: Function;
}): JSX.Element => {
  const { category, sortBy } = useTransactionViewData();

  const { windowWidth } = useWindowSize();

  const dropDownMenuItems = content.map((menuItem, i) => {
    return (
      <>
        <li
          key={i}
          onClick={() => {
            onItemTap?.(menuItem);
          }}
          style={{
            fontWeight:
              category == menuItem || sortBy == menuItem ? "bold" : "normal",
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
      {windowWidth > 700 ? (
        <div className="drop-down-menu-container">
          <p style={{ color: "#696868" }}>{title}</p>
          <div className="drop-down-menu-selector">
            <p>{label}</p>
            <img src={caretDown} alt="caret down" />
          </div>
        </div>
      ) : (
        <img src={icon} alt="document-icon" />
      )}

      <ul className="drop-down-menu-content">{dropDownMenuItems}</ul>
    </div>
  );
};
