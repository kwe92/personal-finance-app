import "./css/modal_drop_down_menu.css";
import caretDown from "../../../assets/images/icon-caret-down.svg";

export const ModalDropDownMenu = ({
  label,
  content,
  initialValue,
  isColorTag = false,
  tagColor,
  toggleMenu,
}: {
  label: string;
  content: JSX.Element[];
  initialValue: string;
  isColorTag?: boolean;
  tagColor?: string;
  toggleMenu: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <div className="modal-drop-down-menu" onClick={toggleMenu}>
      <label
        style={{
          color: "#696868",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {label}
      </label>
      {/* dropdown selector*/}
      <div className="modal-drop-down-menu-selector">
        {isColorTag ? (
          <div className="modal-drop-down-menu-colored-tag-section">
            {/* circle */}
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "8px",
                backgroundColor: tagColor,
              }}
            />
            <p>{initialValue}</p>
          </div>
        ) : (
          <p>{initialValue}</p>
        )}

        <img src={caretDown} alt="caret down" />
      </div>
      {/* dropdown content*/}
      <div className="modal-drop-down-menu-content">{content}</div>
    </div>
  );
};
