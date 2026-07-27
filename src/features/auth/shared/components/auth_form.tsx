import "../css/auth_form.css";

import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";
import * as gaps from "../../../../app/constants/reusable";
import MainButton from "../../../shared/components/main_button";
import { useNavigate } from "react-router";
import TextButton from "../../../shared/components/text_button";
import { useAuthValidationData } from "../../context/auth_validation_context";
import { useAuth } from "../../context/auth_context";

const AuthForm = ({ isLogin = true }: { isLogin?: boolean }): JSX.Element => {
  const navigate = useNavigate();
  const { login, signUp } = useAuth();

  const {
    isEmailEmpty,
    isPasswordEmpty,
    isShortPassword,
    isNameEmpty,
    setIsEmailEmpty,
    setIsPasswordEmpty,
    setIsShortPassword,
    setIsNameEmpty,
    resetValidators,
    setIsLoginEmailIncorrect,
    setIsLoginPasswordIncorrect,
    isPasswordMismatch,
    setIsPasswordMismatch,
  } = useAuthValidationData();

  const [showPassword, setShowPassword] = useState("password");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="auth-form-container">
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

        {authError ? <p className="error-text">{authError}</p> : <></>}

        {!isLogin ? (
          <>
            <gaps.GapH16 />

            <TextFormField
              showPasswordIcon={true}
              name="verifyPassword"
              label="Verify Password"
              type={showPassword}
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
              onIconTap={handleShowPassword}
            />
            {isPasswordMismatch ? (
              <p className="error-text">Passwords do not match</p>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        {!isLogin ? (
          <>
            <gaps.GapH12 />

            <p
              style={{
                textAlign: "right",
                color: !isShortPassword ? "#696868" : "red",
                fontSize: "12px",
                fontWeight: !isShortPassword ? "normal" : "bold",
              }}
            >
              Passwords must be at least 8 characters
            </p>
          </>
        ) : (
          <></>
        )}

        <gaps.GapH32 />

        <MainButton type="submit" onTap={handleForm} disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait..."
            : isLogin
              ? "Login"
              : "Create Account"}
        </MainButton>

        <gaps.GapH32 />

        <div
          style={{
            display: "flex",
            flex: 1,
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
                  setAuthError("");
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

    if (isShortPassword) {
      setIsShortPassword(false);
    }

    setPassword(e.target.value);
  }

  function handleShowPassword() {
    setShowPassword(showPassword === "text" ? "password" : "text");
  }

  function handleVerifyPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isPasswordMismatch) {
      setIsPasswordMismatch(false);
    }
    setVerifyPassword(e.target.value);
  }

  async function handleForm(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const emailValue = email.trim();
    const passwordValue = password;

    const hasEmail = emailValue.length > 0;
    const hasPassword = passwordValue.length > 0;
    const hasValidName = isLogin ? true : name.trim().length > 0;
    const hasValidPasswordLength = isLogin ? true : passwordValue.length >= 8;
    const passwordsMatch = isLogin ? true : passwordValue === verifyPassword;

    setIsEmailEmpty(!hasEmail);
    setIsPasswordEmpty(!hasPassword);
    setIsShortPassword(!hasValidPasswordLength);
    setIsNameEmpty(!hasValidName);
    setIsPasswordMismatch(!passwordsMatch && !isLogin);
    setAuthError("");
    setIsLoginEmailIncorrect(false);
    setIsLoginPasswordIncorrect(false);

    if (!hasEmail || !hasPassword || !hasValidName || !hasValidPasswordLength || !passwordsMatch) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(emailValue, passwordValue);
      } else {
        await signUp(emailValue, passwordValue);
      }

      setName("");
      setEmail("");
      setPassword("");
      setVerifyPassword("");
      resetValidators();
      navigate("/home");
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code?: string }).code)
          : "";
      let message = "Unable to sign in right now. Please try again.";

      switch (code) {
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          setIsLoginEmailIncorrect(true);
          break;
        case "auth/user-disabled":
          message = "This account has been disabled.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          message = isLogin
            ? "Email or password is incorrect."
            : "That email/password combination could not be used.";
          setIsLoginEmailIncorrect(true);
          setIsLoginPasswordIncorrect(true);
          break;
        case "auth/email-already-in-use":
          message = "An account already exists with this email.";
          setIsLoginEmailIncorrect(true);
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          setIsShortPassword(true);
          break;
        case "auth/network-request-failed":
          message = "Network error. Please try again.";
          break;
        default:
          break;
      }

      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  }
};

export default AuthForm;
