import { createContext, useContext, useEffect, useState } from "react";
import { getOverviewSummary } from "../../shared/services/backend_service";

const emptySummary: OverviewSummary = {
  balance: 0,
  income: 0,
  expenses: 0,
  savings: 0,
};

const OverviewContext = createContext<{
  summary: OverviewSummary;
  isLoading: boolean;
}>({
  summary: emptySummary,
  isLoading: true,
});

const OverviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [summary, setSummary] = useState<OverviewSummary>(emptySummary);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      setIsLoading(true);

      try {
        const response = await getOverviewSummary();

        if (!isMounted) {
          return;
        }

        setSummary(response ?? emptySummary);
      } catch (error) {
        if (isMounted) {
          setSummary(emptySummary);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <OverviewContext.Provider
      value={{
        summary,
        isLoading,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

const useOverviewData = () => useContext(OverviewContext);

export { OverviewProvider, useOverviewData };
