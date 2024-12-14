import * as gaps from "../../../app/constants/reusable";
import { useTransactionData } from "../../shared/context/transactionContext";
import useWindowSize from "../../shared/hooks/use_window_size";
import { TansactionRow } from "./transaction_row";

export const TransactionTable = (): JSX.Element => {
  const { transactions, isLoading, error } = useTransactionData();
  const { windowWidth, windowHeight } = useWindowSize();

  var transactionRowItems: JSX.Element[];

  if (transactions !== null) {
    transactionRowItems = transactions.map((transaction, i) => {
      return <TansactionRow transaction={transaction} />;
    });
  }

  return (
    <div className="transaction-table-wrapper">
      <table>
        <tr>
          <th style={{ textAlign: "start" }}>Recipient / Sender</th>
          <th style={{ textAlign: "start" }}>Category</th>
          <th style={{ textAlign: "start" }}>Transaction Date</th>
          <th style={{ textAlign: "end" }}>Amount</th>
        </tr>
        {windowWidth > 1200 ? <gaps.GapH24 /> : <gaps.GapH16 />}
        <tbody>{transactionRowItems!}</tbody>
      </table>
    </div>
  );
};
