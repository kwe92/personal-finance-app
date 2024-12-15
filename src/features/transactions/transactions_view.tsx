import "./transactions_view.css";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import filterIcon from "../../assets/images/icon-filter-mobile.svg";
import { SearchBar } from "../shared/components/search_bar";
import { DropDownMenu } from "../shared/components/drop_down_menu";
import useWindowSize from "../shared/hooks/use_window_size";
import { Divider } from "../shared/components/divider";
import { TransactionListTile } from "./components/transaction_list_tile";
import { useTransactionData } from "../shared/context/transactionContext";
import { TransactionTable } from "./components/transaction_table";
import { useState } from "react";
import { useTransactionViewData } from "./context/transaction_view_context";

const TransactionsView = (): JSX.Element => {
  // const { transactions, isLoading, error } = useTransactionData();

  // TODO: filter transactions in  TransactionViewProvider
  // const [transactionQuery, setTransactionQuery] = useState<string>("");

  const { windowWidth } = useWindowSize();

  const { transactionQuery, setTransactionQuery, filteredTransactions } =
    useTransactionViewData();

  const handleQueryChange = (e: any) => {
    console.log(e.currentTarget.value);
    setTransactionQuery(e.target.value);
  };

  var transactionListTiles: JSX.Element[];

  if (filteredTransactions !== null) {
    transactionListTiles = filteredTransactions
      .filter((transaction) => {
        return transaction.name
          .toLowerCase()
          .includes(transactionQuery.toLowerCase());
      })
      .map((transaction, i) => {
        return (
          <>
            <TransactionListTile transaction={transaction} />
            {filteredTransactions.length - 1 !== i ? (
              <Divider style={{ margin: "16px 0 16px 0" }} />
            ) : (
              <></>
            )}
          </>
        );
      });
  }

  return (
    <div className="transaction-view-main">
      <h1>Transactions</h1>

      <div className="transaction-view-content">
        <div className="transaction-filters-container">
          <SearchBar
            placeholder="Search transactions"
            onChange={handleQueryChange}
          />

          <div className="transaction-drop-down-container">
            {windowWidth > 700 ? (
              <>
                <DropDownMenu
                  title="Sort by"
                  label="Latest"
                  onTap={() => {
                    // TODO: implement
                  }}
                />
                <DropDownMenu
                  title="Category"
                  label="All Transactions"
                  onTap={() => {
                    // TODO: implement
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src={documentIcon}
                  alt="document-icon"
                  onClick={() => {
                    // TODO: implement
                  }}
                />
                <img
                  src={filterIcon}
                  alt="filter-icon"
                  onClick={() => {
                    // TODO: implement
                  }}
                />
              </>
            )}
          </div>
        </div>

        {windowWidth > 600 ? (
          <TransactionTable />
        ) : (
          <div className="transaction-list-tile-wrapper">
            {transactionListTiles!}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;
