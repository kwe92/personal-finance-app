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

const TransactionsView = (): JSX.Element => {
  const { transactions, isLoading, error } = useTransactionData();
  var transactionListTiles: JSX.Element[];

  if (transactions !== null) {
    transactionListTiles = transactions.map((transaction, i) => {
      return (
        <>
          <TransactionListTile transaction={transaction} />
          {transactions.length - 1 !== i ? (
            <Divider style={{ margin: "16px 0 16px 0" }} />
          ) : (
            <></>
          )}
        </>
      );
    });
  }

  const { windowWidth, windowHeight } = useWindowSize();
  return (
    <div className="transaction-view-main">
      <h1>Transactions</h1>

      <div className="transaction-view-content">
        <div className="transaction-filters-container">
          <SearchBar placeholder="Search transactions" />

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
