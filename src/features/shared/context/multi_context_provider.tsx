import { TransactionViewProvider } from "../../transactions/context/transaction_view_context";
import { BudgetProvider } from "./budget_context";
import { TransactionProvider } from "./transaction_context";

export const MultiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <TransactionProvider>
        <BudgetProvider>{children}</BudgetProvider>
      </TransactionProvider>
    </>
  );
};
