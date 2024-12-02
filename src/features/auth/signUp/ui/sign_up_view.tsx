import AuthImage from "../../shared/components/auth_image";
import AuthForm from "../../shared/components/auth_form";
import AuthAppBar from "../../shared/components/auth_app_bar";

const SignUpView = (): JSX.Element => {
  return (
    <>
      <AuthImage />
      <AuthForm isLogin={false} />
      <AuthAppBar />
    </>
  );
};

export default SignUpView;
