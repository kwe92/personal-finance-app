import { createContext, useContext, useMemo } from "react";
import { useBudgetData } from "./budget_context";

interface DoughnutChartContextData {
  doughnutChartOptions: any;
  doughnutChartData: any;
}

const DoughnutChartContext = createContext<DoughnutChartContextData>({
  doughnutChartOptions: {},
  doughnutChartData: {
    datasets: [],
  },
});

const DoughnutChartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { budgets } = useBudgetData();

  const value = useMemo(() => {
    const doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false, // CRUCIAL: Stops Chart.js from expanding past container bounds
      plugins: {
        legend: {
          display: false, // Ensures no extra canvas margin is taken up by legends
        },
      },
      layout: {
        autoPadding: false,
        padding: 0,
        margin: 0,
      },
    };

    const doughnutChartData = {
      labels: budgets?.map((budget) => budget.category) ?? [],
      datasets: [
        {
          data:
            budgets?.map((budget) => Number(budget.maximum.toFixed(2))) ?? [],
          backgroundColor: budgets?.map((budget) => budget.theme) ?? [],
          hoverOffset: 4,
        },
      ],
    };

    return {
      doughnutChartOptions,
      doughnutChartData,
    };
  }, [budgets]);

  return (
    <DoughnutChartContext.Provider value={value}>
      {children}
    </DoughnutChartContext.Provider>
  );
};

const useDoughnutChartData = () => useContext(DoughnutChartContext);

export { DoughnutChartProvider, useDoughnutChartData };
