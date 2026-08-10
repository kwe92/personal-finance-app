import { createContext, useContext, useEffect, useState } from "react";
import { getOverviewSummary } from "../../shared/services/backend_service";
import { useAuth } from "../../auth/context/auth_context";

const emptySummary: OverviewSummary = {
  balance: 0,
  income: 0,
  expenses: 0,
  savings: 0,
};

const OverviewContext = createContext<{
  summary: OverviewSummary;
  isLoading: boolean;
  error: string | null;
}>({
  summary: emptySummary,
  isLoading: true,
  error: null,
});

const OverviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { user, isPlaidLinked } = useAuth();
  const [summary, setSummary] = useState<OverviewSummary>(emptySummary);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    if (!user || !isPlaidLinked) {
      setSummary(emptySummary);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getOverviewSummary();
      setSummary(response ?? emptySummary);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch overview summary",
      );
      setSummary(emptySummary);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [user, isPlaidLinked]);

  return (
    <OverviewContext.Provider
      value={{
        summary,
        isLoading,
        error,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

const useOverviewData = () => useContext(OverviewContext);

export { OverviewProvider, useOverviewData };
