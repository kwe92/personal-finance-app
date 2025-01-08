import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import appData from "../../../app/data.json";

const PotContext = createContext<{
  pots: PotData[] | null;
  isLoading: boolean;
  error: string | null;
  setPots: Function;
}>({
  pots: [],
  isLoading: true,
  error: null,
  setPots: () => {},
});

const PotProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [pots, setPots] = useState<PotData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchPots = async () => {
    setIsLoading(true);

    try {
      // comment to simulate a delay
      setPots(appData.pots);

      setIsLoading(false);

      // uncomment to simulate a delay

      // await new Promise((_) =>
      //   setTimeout(() => {
      //     console.log("fetchPots 1");
      //     setPots(appData.Pots);
      //     setIsLoading(false);
      //     console.log("fetchPots 2");
      //   }, 2000)
      // );
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPots();
  }, []);

  return (
    <PotContext.Provider value={{ pots, setPots, isLoading, error }}>
      {children}
    </PotContext.Provider>
  );
};

const usePotData = () => useContext(PotContext);

export { PotProvider, usePotData };
