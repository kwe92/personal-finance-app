import { TransactionViewProvider } from "../../transactions/context/transaction_view_context";
import { TransactionProvider } from "./transactionContext";

export const MultiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <TransactionProvider>
        <TransactionViewProvider>{children}</TransactionViewProvider>
      </TransactionProvider>
    </>
  );
};
