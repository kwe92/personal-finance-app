import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";
import { Transitions } from "../../../../App";

//!! TODO: remove inline css and figure out where state should live

const AuthForm = ({
  isLogin = true,
  textButtonCallback,
}: {
  isLogin?: boolean;
  textButtonCallback: React.MouseEventHandler<HTMLAnchorElement>;
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = () =>
    setShowPassword(showPassword === "text" ? "password" : "text");

  return (
    // div to center form
    Transitions.fade(
      <div
        style={{
          display: "flex",
          // backgroundColor: "green",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "560px",
            height: "422px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <p
            style={{
              fontSize: "2vw",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Login" : "SignUp"}
          </p>

          {!isLogin ? (
            <>
              <div style={{ height: "32px" }} />
              <TextFormField name="name" label="Name" type="text" />
            </>
          ) : (
            <></>
          )}

          <div style={{ height: "16px" }} />

          <TextFormField name="email" label="Email" type="text" />

          <div style={{ height: "16px" }} />

          <TextFormField
            name="password"
            label={isLogin ? "Password" : "Create Password"}
            type={showPassword}
            showPasswordIcon={true}
            onIconTap={handleShowPassword}
          />

          {!isLogin ? (
            <>
              <div style={{ height: "12px" }} />

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

          <div style={{ height: "32px" }} />

          <button
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <div style={{ height: "32px" }} />

          <p
            style={{ color: "#696868", textAlign: "center", fontSize: "14px" }}
          >
            {isLogin
              ? "Need to create an account? "
              : "Already have an account? "}
            <span>
              <a onClick={textButtonCallback} style={{ color: "#201F24" }}>
                {isLogin ? "Sign Up" : "Login"}
              </a>
            </span>
          </p>
        </form>
      </div>
    )
  );
};

export default AuthForm;
