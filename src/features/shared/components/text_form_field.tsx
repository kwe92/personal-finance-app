import showPassword from "../../../assets/images/icon-show-password.svg";
import hidePassword from "../../../assets/images/icon-hide-password.svg";

import { MouseEventHandler } from "react";
import "./css/text_form_field.css";

const TextFormField = ({
  name,
  label,
  type,
  value,
  placeholder,
  showPasswordIcon = false,
  onChange,
  onIconTap,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  showPasswordIcon?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIconTap?: MouseEventHandler;
}): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          color: "#696868",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {label}
      </label>
      <div style={{ height: "4px" }} />
      <div className="text-form-field-container">
        <input
          id={name}
          title={name}
          name={name}
          type={type}
          value={value}
          step="0.01"
          placeholder={placeholder}
          onChange={onChange}
          className="text-form-field"
        />
        {showPasswordIcon ? (
          <img
            src={type === "text" ? hidePassword : showPassword}
            alt="hello"
            style={{
              paddingRight: "12px",
              cursor: "pointer",
            }}
            onClick={onIconTap}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TextFormField;
