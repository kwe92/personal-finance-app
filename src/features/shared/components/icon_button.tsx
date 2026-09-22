import "./css/icon_button.css";

export const IconButton = ({
  icon,
  iconOnly = false,
  button_text = "",
  style = {},
  onClick,
}: {
  icon: string;
  iconOnly?: boolean;
  button_text: string;
  style?: React.CSSProperties;
  onClick: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <div
      className="icon-button"
      onClick={onClick}
      style={Object.assign(
        iconOnly ? { paddingLeft: "0px", gap: "0px" } : {},
        style,
      )}
    >
      <img src={icon} alt="icon" />
      <p>{button_text}</p>
    </div>
  );
};
