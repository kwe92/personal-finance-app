import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import appData from "../../../app/data.json";

const BudgetContext = createContext<{
  budgets: BudgetData[] | null;
  isLoading: boolean;
  error: string | null;
  setBudgets: Function;
}>({
  budgets: [],
  isLoading: true,
  error: null,
  setBudgets: () => {},
});

const BudgetProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [budgets, setBudgets] = useState<BudgetData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchBudgets = async () => {
    setIsLoading(true);

    try {
      // comment to simulate a delay
      setBudgets(appData.budgets);

      setIsLoading(false);

      // uncomment to simulate a delay

      // await new Promise((_) =>
      //   setTimeout(() => {
      //     console.log("fetchBudgets 1");
      //     setBudgets(appData.budgets);
      //     setIsLoading(false);
      //     console.log("fetchBudgets 2");
      //   }, 2000)
      // );
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <BudgetContext.Provider value={{ budgets, setBudgets, isLoading, error }}>
      {children}
    </BudgetContext.Provider>
  );
};

const useBudgetData = () => useContext(BudgetContext);

export { BudgetProvider, useBudgetData };
