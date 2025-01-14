import "./css/text_button.css";

const TextButton = (props: {
  children: React.ReactNode;
  onTap: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}) => {
  return (
    <button className="text-button" onClick={props.onTap} style={props.style}>
      {props.children}
    </button>
  );
};

export default TextButton;
