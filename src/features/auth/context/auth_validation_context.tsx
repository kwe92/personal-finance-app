import { createContext, useContext, useState } from "react";

const AuthValidationContext = createContext<{
  isEmailEmpty: boolean;
  isLoginEmailIncorrect: boolean;
  isPasswordEmpty: boolean;
  isShortPassword: boolean;
  isLoginPasswordIncorrect: boolean;
  isNameEmpty: boolean;
  isPasswordMismatch: boolean;
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
  isPasswordMismatch: false,
  setIsEmailEmpty: () => {},
  setIsLoginEmailIncorrect: () => {},
  setIsPasswordEmpty: () => {},
  setIsShortPassword: () => {},
  setIsLoginPasswordIncorrect: () => {},
  setIsNameEmpty: () => {},
  setIsPasswordMismatch: () => {},
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

  const [isPasswordMismatch, setIsPasswordMismatch] = useState<boolean>(false);

  function resetValidators() {
    setIsEmailEmpty(false);
    setIsPasswordEmpty(false);
    setIsNameEmpty(false);
    setIsShortPassword(false);
    setIsLoginEmailIncorrect(false);
    setIsLoginPasswordIncorrect(false);
    setIsPasswordMismatch(false);
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
        isPasswordMismatch,
        setIsEmailEmpty,
        setIsLoginEmailIncorrect,
        setIsPasswordEmpty,
        setIsShortPassword,
        setIsLoginPasswordIncorrect,
        setIsNameEmpty,
        setIsPasswordMismatch,
        resetValidators,
      }}
    >
      {children}
    </AuthValidationContext.Provider>
  );
};

const useAuthValidationData = () => useContext(AuthValidationContext);

export { AuthValidationProvider, useAuthValidationData };
