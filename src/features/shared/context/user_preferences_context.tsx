import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getPreferences, updatePreferences } from "../services/backend_service";
import { useAuth } from "../../auth/context/auth_context";

const UserPreferencesContext = createContext<{
  preferences: UserPreferencesData | null;
  isLoading: boolean;
  updateSpendingTarget: (target: number) => Promise<void>;
}>({
  preferences: null,
  isLoading: true,
  updateSpendingTarget: async () => {},
});

export const UserPreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferencesData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrefs = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await getPreferences();
      setPreferences(data);
    } catch (e) {
      console.error("Failed to fetch preferences", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrefs();
  }, [user]);

  const updateSpendingTarget = async (target: number) => {
    try {
      const updated = await updatePreferences({
        monthlySpendingTarget: target,
      });
      setPreferences(updated);
    } catch (e) {
      console.error("Failed to update preferences", e);
    }
  };

  const value = useMemo(
    () => ({
      preferences,
      isLoading,
      updateSpendingTarget,
    }),
    [preferences, isLoading],
  );

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferencesData = () => useContext(UserPreferencesContext);
