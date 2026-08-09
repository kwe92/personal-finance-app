import { useContext, useEffect, useState, createContext } from "react";
import {
  createBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
} from "../services/backend_service";
import { useAuth } from "../../auth/context/auth_context";

interface BudgetContextInterface {
  budgets: BudgetData[];
  isLoading: boolean;
  error: string | null;
  setBudgets: React.Dispatch<React.SetStateAction<BudgetData[]>>;
  deleteBudgetHandler: (id: string) => Promise<void>;
  addBudgetHandler: (payload: BudgetPayload) => Promise<BudgetData>;
  updateBudgetHandler: (id: string, payload: BudgetPayload) => Promise<void>;
}

const BudgetContext = createContext<BudgetContextInterface>({
  budgets: [],
  isLoading: true,
  error: null,
  setBudgets: () => {},
  deleteBudgetHandler: async () => {},
  addBudgetHandler: async () => ({}) as BudgetData,
  updateBudgetHandler: async () => {},
});

const BudgetProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [budgets, setBudgets] = useState<BudgetData[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getBudgets();
      setBudgets(response.budgets ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch budgets");
      setBudgets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBudgetHandler = async (id: string) => {
    await deleteBudget(id);
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  const addBudgetHandler = async (
    payload: BudgetPayload,
  ): Promise<BudgetData> => {
    const response = await createBudget(payload);
    const newBudget = response.budget;
    setBudgets((prev) => [newBudget, ...prev]);
    return newBudget;
  };

  const updateBudgetHandler = async (
    id: string,
    payload: BudgetPayload,
  ): Promise<void> => {
    const response = await updateBudget(id, payload);
    const updatedBudget = response.budget;

    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) => (budget.id === id ? updatedBudget : budget)),
    );
  };

  useEffect(() => {
    fetchBudgets();
  }, [user]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        setBudgets,
        deleteBudgetHandler,
        addBudgetHandler,
        updateBudgetHandler,
        isLoading,
        error,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

const useBudgetData = () => useContext(BudgetContext);

export { BudgetProvider, useBudgetData };
