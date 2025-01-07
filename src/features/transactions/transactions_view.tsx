import "./transactions_view.css";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import filterIcon from "../../assets/images/icon-filter-mobile.svg";
import { SearchBar } from "../shared/components/search_bar";
import { DropDownMenu } from "../shared/components/drop_down_menu";
import useWindowSize from "../shared/hooks/use_window_size";
import { Divider } from "../shared/components/divider";
import { TransactionListTile } from "./components/transaction_list_tile";
import { TransactionTable } from "./components/transaction_table";
import { useTransactionFilterData } from "../shared/context/transaction_filter_context";
import { useTransactionData } from "../shared/context/transaction_context";
import { toggleDropDownMenu } from "../shared/utility/toggle_drop_down_menu";

const TransactionsView = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  const {
    transactionQuery,
    filteredTransactions,
    sortBy,
    category,
    setCategory,
    setSortBy,
    setTransactionQuery,
  } = useTransactionFilterData();

  const { transactions } = useTransactionData();

  const categoryList = Array.from(
    new Set(transactions?.map((transaction) => transaction.category))
  );

  categoryList.unshift("All Transactions");

  categoryList.sort((a, b) => a.localeCompare(b));

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
            onChange={setTransactionQuery}
          />

          <div className="transaction-drop-down-container">
            <DropDownMenu
              id="sort-drop-down-menu"
              title="Sort by"
              label={sortBy}
              content={sortByContent}
              icon={documentIcon}
              onMenuTap={() => toggleMenu(0)}
              onItemTap={setSortBy}
            />
            <DropDownMenu
              id="filter-drop-down-menu"
              title="Category"
              label={category}
              content={categoryList ?? []}
              icon={filterIcon}
              onMenuTap={() => toggleMenu(1)}
              onItemTap={setCategory}
            />
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

function toggleMenu(index: number) {
  toggleDropDownMenu(index, ".dropdown", ".drop-down-menu-content");
}

//?? could probably be maintained somewhere else, maybe in the view
const sortByContent = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

export default TransactionsView;
