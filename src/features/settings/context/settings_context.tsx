import React, { createContext, useContext, useState, useMemo } from "react";
import { useAuth } from "../../auth/context/auth_context";

interface SettingsContextInterface {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  clearMessages: () => void;
  updateAccountInfoHandler: (name: string, email: string) => Promise<void>;
  updatePasswordHandler: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextInterface>({
  isLoading: false,
  error: null,
  successMessage: null,
  clearMessages: () => {},
  updateAccountInfoHandler: async () => {},
  updatePasswordHandler: async () => {},
});

const SettingsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const updateAccountInfoHandler = async (
    name: string,
    email: string,
  ): Promise<void> => {
    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      // TODO: Replace with your backend/service call when ready:
      // await updateAccountInfo({ uid: user.uid, name, email });
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSuccessMessage("Account information updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update account information.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updatePasswordHandler = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      // TODO: Replace with your backend/service call when ready:
      // await updatePassword({ currentPassword, newPassword });
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSuccessMessage("Password updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isLoading,
      error,
      successMessage,
      clearMessages,
      updateAccountInfoHandler,
      updatePasswordHandler,
    }),
    [isLoading, error, successMessage],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsData = () => useContext(SettingsContext);

export { SettingsProvider, useSettingsData };
