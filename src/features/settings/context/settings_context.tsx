import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuth } from "../../auth/context/auth_context";
import {
  updateUserName,
  updatePassword,
  fetchConnectedInstitutionPlaceHolder,
  disconnectBankAccountPlaceHolder,
  selectDifferentInstitutionPlaceHolder,
} from "../../shared/services/backend_service";

interface SettingsContextInterface {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  connectedInstitution: string | null;
  clearMessages: () => void;
  updateAccountInfoHandler: (name: string, email: string) => Promise<void>;
  updatePasswordHandler: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  disconnectBankHandler: () => Promise<void>;
  selectNewInstitutionHandler: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextInterface>({
  isLoading: false,
  error: null,
  successMessage: null,
  connectedInstitution: null,
  clearMessages: () => {},
  updateAccountInfoHandler: async () => {},
  updatePasswordHandler: async () => {},
  disconnectBankHandler: async () => {},
  selectNewInstitutionHandler: async () => {},
});

const SettingsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { user, updateLocalUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [connectedInstitution, setConnectedInstitution] = useState<
    string | null
  >(null);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // Fetch the connected institution when the settings page mounts
  useEffect(() => {
    if (!user) return;

    const fetchInstitution = async () => {
      try {
        setIsLoading(true);
        const res = await fetchConnectedInstitutionPlaceHolder();
        setConnectedInstitution(res.institutionName);
      } catch (err) {
        console.error("Failed to fetch institution", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, [user]);

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
      await updateUserName({ displayName: name });

      updateLocalUser({ displayName: name, email });

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
    if (!user || !user.email) {
      setError("User is not authenticated or missing email.");
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword({ password: newPassword });
      setSuccessMessage("Password updated successfully.");
    } catch (err: any) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("The current password you entered is incorrect.");
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to change password.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectBankHandler = async (): Promise<void> => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await disconnectBankAccountPlaceHolder();
      setConnectedInstitution(null);
      setSuccessMessage(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to disconnect bank.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectNewInstitutionHandler = async (): Promise<void> => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await selectDifferentInstitutionPlaceHolder();
      setSuccessMessage(res.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initiate new institution selection.",
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
      connectedInstitution,
      clearMessages,
      updateAccountInfoHandler,
      updatePasswordHandler,
      disconnectBankHandler,
      selectNewInstitutionHandler,
    }),
    [isLoading, error, successMessage, connectedInstitution],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsData = () => useContext(SettingsContext);

export { SettingsProvider, useSettingsData };
