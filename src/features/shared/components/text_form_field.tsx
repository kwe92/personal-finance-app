import showPassword from "../../../assets/images/icon-show-password.svg";
import hidePassword from "../../../assets/images/icon-hide-password.svg";

import { MouseEventHandler } from "react";
import "./css/text_form_field.css";

//!! TODO: conver px to rem

const TextFormField = ({
  name,
  label,
  type,
  value,
  showPasswordIcon = false,
  onChange,
  onIconTap,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  showPasswordIcon?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIconTap?: MouseEventHandler<HTMLImageElement>;
}): JSX.Element => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div style={{ height: "4px" }} />
      <div className="textFormFieldContainer">
        <input
          id={name}
          title={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="textFormField"
        />
        {showPasswordIcon ? (
          <img
            src={type === "text" ? hidePassword : showPassword}
            alt="hello"
            style={{
              paddingRight: "12px",
            }}
            onClick={onIconTap}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TextFormField;
