import AuthImage from "./components/auth_image";
import AuthForm from "../../shared/components/auth_form";

const LoginView = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AuthImage />
      <AuthForm />
    </div>
  );
};

export default LoginView;
