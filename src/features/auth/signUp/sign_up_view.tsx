import AuthForm from "../shared/components/auth_form";

const SignUpView = (): JSX.Element => {
  return (
    <>
      <AuthForm isLogin={false} />
    </>
  );
};

export default SignUpView;
