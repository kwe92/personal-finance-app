import "../css/auth_form.css";

import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";
import * as gaps from "../../../../app/constants/reusable";
import MainButton from "../../../shared/components/main_button";
import { useNavigate } from "react-router";
import TextButton from "../../../shared/components/text_button";
import { useAuthValidationData } from "../../context/auth_validation_context";

//!! TODO: add verify password section

//!! TODO: continue working on auth form validation

const AuthForm = ({ isLogin = true }: { isLogin?: boolean }): JSX.Element => {
  const navigate = useNavigate();

  const {
    isEmailEmpty,
    isPasswordEmpty,
    isNameEmpty,
    setIsEmailEmpty,
    setIsPasswordEmpty,
    setIsNameEmpty,
    resetValidators,
  } = useAuthValidationData();

  const [showPassword, setShowPassword] = useState("password");

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNameEmpty) {
      setIsNameEmpty(false);
    }
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isEmailEmpty) {
      setIsEmailEmpty(false);
    }
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isPasswordEmpty) {
      setIsPasswordEmpty(false);
    }

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
            {isNameEmpty ? (
              <p className="error-text">Enter your name</p>
            ) : (
              <></>
            )}
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
        {isEmailEmpty ? (
          <p className="error-text">Enter a valid email</p>
        ) : (
          <></>
        )}

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

        {isPasswordEmpty ? (
          <p className="error-text">Enter a valid password</p>
        ) : (
          <></>
        )}

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
            if (email.length === 0) {
              setIsEmailEmpty(true);
            }

            if (password.length === 0) {
              setIsPasswordEmpty(true);
            }

            if (name.length === 0) {
              setIsNameEmpty(true);
            }

            //!! TODO: change logic to be sign in with test account or sign up depending on what the user is doing

            if (
              isLogin &&
              email === "test@test.io" &&
              password === "Password11!!"
            ) {
              setName("");
              setEmail("");
              setPassword("");

              //!! TODO: replace with validation and real auth checks

              navigate("/home");
            }
          }}
        >
          {isLogin ? "Login" : "Create Account"}
        </MainButton>

        <gaps.GapH32 />

        <div
          style={{
            display: "flex",
            flex: 1,
            // backgroundColor: "lightsteelblue",
            placeContent: "center",
            placeItems: "end",
          }}
        >
          <p
            style={{ color: "#696868", textAlign: "center", fontSize: "14px" }}
          >
            {isLogin
              ? "Need to create an account? "
              : "Already have an account? "}
            <span>
              <TextButton
                onTap={() => {
                  resetValidators();
                  navigate(isLogin ? "/auth/signUp" : "/auth/login");
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </TextButton>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
