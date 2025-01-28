import { createContext, useContext, useState } from "react";

const AuthValidationContext = createContext<{
  isEmailEmpty: boolean;
  isLoginEmailIncorrect: boolean;
  isPasswordEmpty: boolean;
  isLoginPasswordIncorrect: boolean;
  isNameEmpty: boolean;
  setIsEmailEmpty: (truthValue: boolean) => void;
  setIsLoginEmailIncorrect: (truthValue: boolean) => void;
  setIsPasswordEmpty: (truthValue: boolean) => void;
  setIsLoginPasswordIncorrect: (truthValue: boolean) => void;
  setIsNameEmpty: (truthValue: boolean) => void;
  resetValidators: () => void;
}>({
  isEmailEmpty: false,
  isLoginEmailIncorrect: false,
  isPasswordEmpty: false,
  isLoginPasswordIncorrect: false,
  isNameEmpty: false,
  setIsEmailEmpty: () => {},
  setIsLoginEmailIncorrect: () => {},
  setIsPasswordEmpty: () => {},
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

  const [isLoginPasswordIncorrect, setIsLoginPasswordIncorrect] =
    useState<boolean>(false);

  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);

  function resetValidators() {
    setIsEmailEmpty(false);
    setIsPasswordEmpty(false);
  }

  return (
    <AuthValidationContext.Provider
      value={{
        isEmailEmpty,
        isLoginEmailIncorrect,
        isPasswordEmpty,
        isLoginPasswordIncorrect,
        isNameEmpty,
        setIsEmailEmpty,
        setIsLoginEmailIncorrect,
        setIsPasswordEmpty,
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
