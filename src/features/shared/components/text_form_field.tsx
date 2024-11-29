import showPassword from "../../../assets/images/icon-show-password.svg";
import { MouseEventHandler } from "react";
const TextFormField = ({
  name,
  label,
  type,
  showPasswordIcon = false,
  onIconTap,
}: {
  name: string;
  label: string;
  type: string;
  showPasswordIcon?: boolean;
  onIconTap?: MouseEventHandler<HTMLImageElement>;
}): JSX.Element => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div style={{ height: "4px" }} />
      <input
        id={name}
        title={name}
        name={name}
        type={type}
        style={{
          border: "1px solid #98908B",
          height: "42px",
          borderRadius: "8px",
          paddingLeft: "12px",
        }}
      />
      {showPasswordIcon ? (
        <img
          src={showPassword}
          alt="hello"
          style={{
            width: "16px",
            position: "relative",
            bottom: "25px",
            left: "92.5%",
          }}
          onClick={onIconTap}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TextFormField;
