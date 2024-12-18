import "./transactions_view.css";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import filterIcon from "../../assets/images/icon-filter-mobile.svg";
import { SearchBar } from "../shared/components/search_bar";
import { DropDownMenu } from "../shared/components/drop_down_menu";
import useWindowSize from "../shared/hooks/use_window_size";
import { Divider } from "../shared/components/divider";
import { TransactionListTile } from "./components/transaction_list_tile";
import { TransactionTable } from "./components/transaction_table";
import { useTransactionViewData } from "./context/transaction_view_context";
import { useTransactionData } from "../shared/context/transaction_context";

// TODO: move functions to the bottom of file or abstract away into a class

// TODO: ensure that the transaction view transaction-view-content is not scrollable from its parent

// TODO: in the future you will need to have a continue button for semi-inifinite continuous scrolling of the transactions when the list is really long

// TODO: maybe add the ability to filter by date range

// TODO: add some todos as issues on github

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
  } = useTransactionViewData();

  const { transactions } = useTransactionData();

  //?? could probably be maintained somewhere else, maybe in the view
  const sortByContent = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];

  const categoryList = Array.from(
    new Set(transactions?.map((transaction) => transaction.category))
  );
  //?? could probably be maintained somewhere else, maybe in the view | adds the All Transactions category to the list of categories
  categoryList.unshift("All Transactions");

  categoryList.sort((a, b) => a.localeCompare(b));

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

  const toggleMenu = (index: number) => {
    const dropdownContainer = document.querySelectorAll(".dropdown")[index];

    const dropdownContent = document.querySelectorAll(
      ".drop-down-menu-content"
    )[index];

    dropdownContent!.classList.toggle("show");

    document.addEventListener("click", function (event: any) {
      if (
        !dropdownContainer!.contains(event.target) &&
        !dropdownContent!.contains(event.target)
      ) {
        dropdownContent!.classList.remove("show");
      }
    });
  };

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

export default TransactionsView;
