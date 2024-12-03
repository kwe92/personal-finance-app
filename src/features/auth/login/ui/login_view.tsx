import AuthAppBar from "../../shared/components/auth_app_bar";
import AuthForm from "../../shared/components/auth_form";
import AuthImage from "../../shared/components/auth_image";

const LoginView = (): JSX.Element => {
  return (
    <>
      <AuthForm />
      <AuthAppBar />
    </>
  );
};

export default LoginView;
