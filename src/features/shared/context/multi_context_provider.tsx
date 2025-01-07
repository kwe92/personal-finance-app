import { BudgetProvider } from "./budget_context";
import { DoughnutChartProvider } from "./doughnut_chart_context";
import { TransactionProvider } from "./transaction_context";
import { TransactionFilterProvider } from "./transaction_filter_context";

export const MultiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <TransactionProvider>
        <TransactionFilterProvider>
          <BudgetProvider>
            <DoughnutChartProvider>{children}</DoughnutChartProvider>
          </BudgetProvider>
        </TransactionFilterProvider>
      </TransactionProvider>
    </>
  );
};
