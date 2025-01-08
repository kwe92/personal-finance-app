import "./css/main_button.css";

const MainButton = (props: {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  style?: React.CSSProperties;
  onTap?: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  return (
    <button
      className="main-button"
      style={props.style}
      type={props.type}
      onClick={props.onTap}
    >
      {props.children}
    </button>
  );
};

export default MainButton;
