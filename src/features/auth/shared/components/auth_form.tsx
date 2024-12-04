import "../css/auth_form.css";

import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";
import * as gaps from "../../../../app/constants/reusable";
import MainButton from "../../../shared/components/main_button";
import { useNavigate } from "react-router";
import TextButton from "../../../shared/components/text_button";

const AuthForm = ({ isLogin = true }: { isLogin?: boolean }): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const handleShowPassword = () =>
    setShowPassword(showPassword === "text" ? "password" : "text");

  return (
    <div className="auth-form-container">
      {/* form */}
      <form
        className="form-theme"
        onSubmit={(e) => {
          e.preventDefault(); // prevent form default behavior, add custom client-side form handling
          console.log("hello");
        }}
      >
        <p id="title-text">{isLogin ? "Login" : "SignUp"}</p>

        {!isLogin ? (
          <>
            <gaps.GapH32 />

            <TextFormField
              name="name"
              label="Name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </>
        ) : (
          <></>
        )}

        <gaps.GapH16 />

        <TextFormField
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />

        <gaps.GapH16 />

        <TextFormField
          showPasswordIcon={true}
          name="password"
          label={isLogin ? "Password" : "Create Password"}
          type={showPassword}
          value={password}
          onChange={handlePasswordChange}
          onIconTap={handleShowPassword}
        />

        {!isLogin ? (
          <>
            <gaps.GapH12 />

            <p
              style={{
                textAlign: "right",
                color: "#696868",
                fontSize: "12px",
              }}
            >
              Passwords must be at least 8 characters
            </p>
          </>
        ) : (
          <></>
        )}

        <gaps.GapH32 />

        <MainButton
          type="submit"
          onTap={() => {
            setName("");
            setEmail("");
            setPassword("");
          }}
        >
          {isLogin ? "Login" : "Create Account"}
        </MainButton>

        <gaps.GapH32 />

        <p style={{ color: "#696868", textAlign: "center", fontSize: "14px" }}>
          {isLogin
            ? "Need to create an account? "
            : "Already have an account? "}
          <span>
            <TextButton
              onTap={() => {
                navigate(isLogin ? "/auth/signUp" : "/auth/login");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </TextButton>
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
