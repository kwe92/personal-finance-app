import { createContext, useContext, useState } from "react";

const AuthValidationContext = createContext<{
  isEmailEmpty: boolean;
  isLoginEmailIncorrect: boolean;
  isPasswordEmpty: boolean;
  isShortPassword: boolean;
  isLoginPasswordIncorrect: boolean;
  isNameEmpty: boolean;
  setIsEmailEmpty: (truthValue: boolean) => void;
  setIsLoginEmailIncorrect: (truthValue: boolean) => void;
  setIsPasswordEmpty: (truthValue: boolean) => void;
  setIsShortPassword: (truthValue: boolean) => void;
  setIsLoginPasswordIncorrect: (truthValue: boolean) => void;
  setIsNameEmpty: (truthValue: boolean) => void;
  resetValidators: () => void;
}>({
  isEmailEmpty: false,
  isLoginEmailIncorrect: false,
  isPasswordEmpty: false,
  isShortPassword: false,
  isLoginPasswordIncorrect: false,
  isNameEmpty: false,
  setIsEmailEmpty: () => {},
  setIsLoginEmailIncorrect: () => {},
  setIsPasswordEmpty: () => {},
  setIsShortPassword: () => {},
  setIsLoginPasswordIncorrect: () => {},
  setIsNameEmpty: () => {},
  resetValidators: () => {},
});

const AuthValidationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(false);

  const [isLoginEmailIncorrect, setIsLoginEmailIncorrect] =
    useState<boolean>(false);

  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);

  const [isShortPassword, setIsShortPassword] = useState<boolean>(false);

  const [isLoginPasswordIncorrect, setIsLoginPasswordIncorrect] =
    useState<boolean>(false);

  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);

  function resetValidators() {
    setIsEmailEmpty(false);
    setIsPasswordEmpty(false);
    setIsNameEmpty(false);
    setIsShortPassword(false);
  }

  return (
    <AuthValidationContext.Provider
      value={{
        isEmailEmpty,
        isLoginEmailIncorrect,
        isPasswordEmpty,
        isShortPassword,
        isLoginPasswordIncorrect,
        isNameEmpty,
        setIsEmailEmpty,
        setIsLoginEmailIncorrect,
        setIsPasswordEmpty,
        setIsShortPassword,
        setIsLoginPasswordIncorrect,
        setIsNameEmpty,
        resetValidators,
      }}
    >
      {children}
    </AuthValidationContext.Provider>
  );
};

const useAuthValidationData = () => useContext(AuthValidationContext);

export { AuthValidationProvider, useAuthValidationData };
