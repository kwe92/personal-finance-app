import "./css/text_button.css";

const TextButton = (props: {
  children: React.ReactNode;
  onTap: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button className="text-button" onClick={props.onTap}>
      {props.children}
    </button>
  );
};

export default TextButton;
