import logo from "../../../assets/images/logo-large.svg";
import "./css/auth_app_bar.css";

const AuthAppBar = (): JSX.Element => {
  return (
    <div id="auth-app-bar">
      <img src={logo}></img>
    </div>
  );
};

export default AuthAppBar;
