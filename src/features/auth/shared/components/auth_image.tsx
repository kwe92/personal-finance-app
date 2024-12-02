import authImage from "../../../../assets/images/illustration-authentication.svg";

import logo from "../../../../assets/images/logo-large.svg";

import "../css/auth_image.css";

const AuthImage = (): JSX.Element => {
  return (
    <div id="auth-image-container">
      <img
        src={authImage}
        alt="hello"
        style={{
          height: "100%",
          padding: "16px 0px 16px 16px",
          boxSizing: "border-box",
          borderRadius: "24px",
        }}
      />
      <img
        src={logo}
        alt="hello"
        style={{
          position: "absolute",
          padding: "16px 0px 16px 16px",
          top: "24px",
          left: "24px",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "0px",
          width: "90%",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "2vw",
            fontWeight: "bold",
          }}
        >
          Keep track of your money <br />
          and save for your future
        </p>
        <div style={{ height: "24px" }} />
        <p
          style={{
            color: "white",
            fontSize: "0.75vw",
          }}
        >
          Personal finance app puts you in control of your spending. Track
          <br />
          transactions, set budgets, and add to savings pots easily.
        </p>
        <div style={{ height: "42px" }} />
      </div>
    </div>
  );
};

export default AuthImage;
