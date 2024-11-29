import { useState } from "react";
import TextFormField from "../../../shared/components/text_form_field";

const AuthForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = () =>
    setShowPassword(showPassword === "text" ? "password" : "text");

  return (
    // div to center form
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
          Login
        </p>
        <div style={{ height: "32px" }} />
        <TextFormField name="email" label="Email" type="text" />

        <div style={{ height: "16px" }} />

        <TextFormField
          name="password"
          label="Password"
          type={showPassword}
          showPasswordIcon={true}
          onIconTap={handleShowPassword}
        />

        <div style={{ height: "32px" }} />

        <button
          style={{
            backgroundColor: "black",
            color: "white",
            // height: "32px",
            borderRadius: "8px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          Login
        </button>

        <div style={{ height: "32px" }} />

        <p style={{ color: "#696868", textAlign: "center", fontSize: "14px" }}>
          Need to create an account?{" "}
          <span>
            <a href="http://stackoverflow.com" style={{ color: "#201F24" }}>
              Sign Up
            </a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
