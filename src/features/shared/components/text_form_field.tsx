import showPassword from "../../../assets/images/icon-show-password.svg";
import hidePassword from "../../../assets/images/icon-hide-password.svg";

import { MouseEventHandler } from "react";
import "./css/text_form_field.css";

//!! TODO: conver px to rem

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
      <div className="textFormFieldContainer">
        <input
          id={name}
          title={name}
          name={name}
          type={type}
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
