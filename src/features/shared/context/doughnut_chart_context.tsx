import * as chartJS from "chart.js";
import { createContext, useContext } from "react";
import { useBudgetData } from "./budget_context";

interface DoughnutChartContextData {
  //!! TODO: figure out why the chartJS.ChartOptions and chartJS.ChartData do not work with react-chartjs-2 Doughnut options and data properties
  doughnutChartOptions: any;
  doughnutChartData: any;
  //   doughnutChartOptions: chartJS.ChartOptions;
  //   doughnutChartData: chartJS.ChartData;
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

  const doughnutChartOptions = {
    layout: {
      autoPadding: false,
      padding: 0,
      margin: 0,
    },
  };

  const doughnutChartData = {
    labels: budgets?.map((budget) => {
      return budget.category;
    }),
    datasets: [
      {
        data:
          budgets?.map((budget) => {
            return Number(budget.maximum.toFixed(2));
          }) ?? [],

        backgroundColor: budgets?.map((budget) => {
          return budget.theme;
        }),
        hoverOffset: 4,
      },
    ],
  };
  return (
    <DoughnutChartContext.Provider
      value={{
        doughnutChartOptions: doughnutChartOptions,
        doughnutChartData: doughnutChartData,
      }}
    >
      {children}
    </DoughnutChartContext.Provider>
  );
};

const useDoughnutChartData = () => useContext(DoughnutChartContext);

export { DoughnutChartProvider, useDoughnutChartData };
