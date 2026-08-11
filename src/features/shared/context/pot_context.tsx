import { useContext, useEffect, useState, createContext } from "react";
import {
  createPot,
  deletePot,
  getPots,
  updatePot,
} from "../services/backend_service";
import { useAuth } from "../../auth/context/auth_context";

interface PotContextInterface {
  pots: PotData[];
  isLoading: boolean;
  error: string | null;
  setPots: React.Dispatch<React.SetStateAction<PotData[]>>;
  deletePotHandler: (id: string) => Promise<void>;
  addPotHandler: (payload: PotPayload) => Promise<PotData>;
  updatePotHandler: (id: string, payload: PotPayload) => Promise<void>;
}

const PotContext = createContext<PotContextInterface>({
  pots: [],
  isLoading: true,
  error: null,
  setPots: () => {},
  deletePotHandler: async () => {},
  addPotHandler: async () => ({}) as PotData,
  updatePotHandler: async () => {},
});

const PotProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { user } = useAuth();
  const [pots, setPots] = useState<PotData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPots = async () => {
    if (!user) {
      setPots([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getPots();
      setPots(response.pots ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pots");
      setPots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePotHandler = async (id: string) => {
    try {
      await deletePot(id);
      setPots((prev) => prev.filter((pot) => pot.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete pot");
      throw err;
    }
  };

  const addPotHandler = async (payload: PotPayload): Promise<PotData> => {
    try {
      const response = await createPot(payload);
      const newPot = response.pot;
      setPots((prev) => [newPot, ...prev]);
      return newPot;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add pot");
      throw err;
    }
  };

  const updatePotHandler = async (
    id: string,
    payload: PotPayload,
  ): Promise<void> => {
    try {
      const response = await updatePot(id, payload);
      const updatedPot = response.pot;

      setPots((prev) => prev.map((pot) => (pot.id === id ? updatedPot : pot)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update pot");
      throw err;
    }
  };

  useEffect(() => {
    fetchPots();
  }, [user]);

  return (
    <PotContext.Provider
      value={{
        pots,
        setPots,
        deletePotHandler,
        addPotHandler,
        updatePotHandler,
        isLoading,
        error,
      }}
    >
      {children}
    </PotContext.Provider>
  );
};

const usePotData = () => useContext(PotContext);

export { PotProvider, usePotData };
