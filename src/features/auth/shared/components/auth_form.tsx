import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";
import "../css/auth_form.css";
import { GapH12, GapH16, GapH32 } from "../../../../app/constants/reusable";
import MainButton from "../../../shared/components/main_button";

const AuthForm = ({ isLogin = true }: { isLogin?: boolean }): JSX.Element => {
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
    // div to center form

    <div className="main-container">
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
            <GapH32 />

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

        <GapH16 />

        <TextFormField
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />

        <GapH16 />

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
            <GapH12 />

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

        <GapH32 />

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

        <GapH32 />

        <p style={{ color: "#696868", textAlign: "center", fontSize: "14px" }}>
          {isLogin
            ? "Need to create an account? "
            : "Already have an account? "}
          <span>
            <a href={isLogin ? "/signUp" : "/"} id="auth-link">
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
