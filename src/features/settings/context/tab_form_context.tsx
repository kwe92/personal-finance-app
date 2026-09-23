import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "../../auth/context/auth_context";
import { useSettingsData } from "./settings_context";

interface TabFormContextInterface {
  activeTab: number;
  handleTabSwitch: (index: number) => void;

  name: string;
  email: string;
  nameError: boolean;
  emailError: boolean;
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setNameError: (val: boolean) => void;
  setEmailError: (val: boolean) => void;
  handleAccountSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrentPassword: "text" | "password";
  showNewPassword: "text" | "password";
  showConfirmPassword: "text" | "password";
  setCurrentPassword: (val: string) => void;
  setNewPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
  toggleShowCurrentPassword: () => void;
  toggleShowNewPassword: () => void;
  toggleShowConfirmPassword: () => void;

  currentPasswordError: boolean;
  newPasswordError: boolean;
  isShortPassword: boolean;
  passwordMismatch: boolean;
  setCurrentPasswordError: (val: boolean) => void;
  setNewPasswordError: (val: boolean) => void;
  setIsShortPassword: (val: boolean) => void;
  setPasswordMismatch: (val: boolean) => void;
  handlePasswordSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
}

const TabFormContext = createContext<TabFormContextInterface>({
  activeTab: 0,
  handleTabSwitch: () => {},
  name: "",
  email: "",
  nameError: false,
  emailError: false,
  setName: () => {},
  setEmail: () => {},
  setNameError: () => {},
  setEmailError: () => {},
  handleAccountSubmit: async () => {},

  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  showCurrentPassword: "password",
  showNewPassword: "password",
  showConfirmPassword: "password",
  setCurrentPassword: () => {},
  setNewPassword: () => {},
  setConfirmPassword: () => {},
  toggleShowCurrentPassword: () => {},
  toggleShowNewPassword: () => {},
  toggleShowConfirmPassword: () => {},

  currentPasswordError: false,
  newPasswordError: false,
  isShortPassword: false,
  passwordMismatch: false,
  setCurrentPasswordError: () => {},
  setNewPasswordError: () => {},
  setIsShortPassword: () => {},
  setPasswordMismatch: () => {},
  handlePasswordSubmit: async () => {},
});

const TabFormProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { user } = useAuth();
  const { clearMessages, updateAccountInfoHandler, updatePasswordHandler } =
    useSettingsData();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showCurrentPassword, setShowCurrentPassword] = useState<
    "text" | "password"
  >("password");
  const [showNewPassword, setShowNewPassword] = useState<"text" | "password">(
    "password",
  );
  const [showConfirmPassword, setShowConfirmPassword] = useState<
    "text" | "password"
  >("password");

  const [currentPasswordError, setCurrentPasswordError] =
    useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [isShortPassword, setIsShortPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const dbUser = user as unknown as { name?: string };
      setName(dbUser.name ?? user.displayName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleTabSwitch = (index: number) => {
    clearMessages();
    setActiveTab(index);
  };

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword((prev) => (prev === "text" ? "password" : "text"));

  const toggleShowNewPassword = () =>
    setShowNewPassword((prev) => (prev === "text" ? "password" : "text"));

  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => (prev === "text" ? "password" : "text"));

  const handleAccountSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const isNameInvalid = trimmedName.length === 0;
    const isEmailInvalid = trimmedEmail.length === 0;

    setNameError(isNameInvalid);
    setEmailError(isEmailInvalid);

    if (isNameInvalid || isEmailInvalid) return;

    await updateAccountInfoHandler(trimmedName, trimmedEmail);
  };

  const handlePasswordSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const hasCurrentPassword = currentPassword.length >= 8;
    const hasValidLength = newPassword.length >= 8;
    const doPasswordsMatch = newPassword === confirmPassword;

    setCurrentPasswordError(!hasCurrentPassword);
    setNewPasswordError(newPassword.length === 0);
    setIsShortPassword(newPassword.length > 0 && !hasValidLength);
    setPasswordMismatch(!doPasswordsMatch);

    if (!hasCurrentPassword || !hasValidLength || !doPasswordsMatch) {
      return;
    }

    await updatePasswordHandler(currentPassword, newPassword);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const value = useMemo(
    () => ({
      activeTab,
      handleTabSwitch,
      name,
      email,
      nameError,
      emailError,
      setName,
      setEmail,
      setNameError,
      setEmailError,
      handleAccountSubmit,
      currentPassword,
      newPassword,
      confirmPassword,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      setCurrentPassword,
      setNewPassword,
      setConfirmPassword,
      toggleShowCurrentPassword,
      toggleShowNewPassword,
      toggleShowConfirmPassword,
      currentPasswordError,
      newPasswordError,
      isShortPassword,
      passwordMismatch,
      setCurrentPasswordError,
      setNewPasswordError,
      setIsShortPassword,
      setPasswordMismatch,
      handlePasswordSubmit,
    }),
    [
      activeTab,
      name,
      email,
      nameError,
      emailError,
      currentPassword,
      newPassword,
      confirmPassword,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      currentPasswordError,
      newPasswordError,
      isShortPassword,
      passwordMismatch,
      updateAccountInfoHandler,
      updatePasswordHandler,
    ],
  );

  return (
    <TabFormContext.Provider value={value}>{children}</TabFormContext.Provider>
  );
};

const useTabFormData = () => useContext(TabFormContext);

export { TabFormProvider, useTabFormData };
