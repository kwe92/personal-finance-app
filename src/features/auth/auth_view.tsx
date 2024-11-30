import AuthForm from "./shared/components/auth_form";
import AuthImage from "./shared/components/auth_image";

const AuthView = (): JSX.Element => {
  return (
    <>
      <AuthImage />
      <AuthForm textButtonCallback={() => {}} />
    </>
  );
};

export default AuthView;
