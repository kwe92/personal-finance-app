import { TransactionViewProvider } from "../../transactions/context/transaction_view_context";
import { BudgetProvider } from "./budget_context";
import { DoughnutChartProvider } from "./doughnut_chart_context";
import { TransactionProvider } from "./transaction_context";

export const MultiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <TransactionProvider>
        <BudgetProvider>
          <DoughnutChartProvider>{children}</DoughnutChartProvider>
        </BudgetProvider>
      </TransactionProvider>
    </>
  );
};
