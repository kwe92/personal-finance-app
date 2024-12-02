import "./css/main_button.css";

const MainButton = (props: {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onTap?: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
  return (
    <button className="main_button" type={props.type} onClick={props.onTap}>
      {props.children}
    </button>
  );
};

export default MainButton;
