import "./transactions_view.css";
import "../shared/css/view_container.css";
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
import { ToastService } from "../shared/services/toast_service";
import { sortByCategories } from "../../app/constants/constants";
import { GapH8 } from "../../app/constants/reusable";

const TransactionsView = (): JSX.Element => {
  const toastService = ToastService.getInstance();

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

  // ensure "All Transactions" is the first selectable category
  categoryList.unshift("All Transactions");

  categoryList.sort((a, b) => a.localeCompare(b));

  var transactionListTiles: JSX.Element[] = [];

  // only create transactionListTiles if you will need them
  if (windowWidth < 650) {
    transactionListTiles = createListTiles();
  }

  return (
    <div className="view-container">
      <h1>Transactions</h1>

      <div className="transaction-view-content">
        <div className="transaction-filters-container">
          <SearchBar
            value={transactionQuery}
            placeholder="Search transactions"
            onChange={setTransactionQuery}
          />

          <div className="transaction-drop-down-container">
            <DropDownMenu
              id="sort-drop-down-menu"
              title="Sort by"
              label={sortBy}
              sortBy={sortBy}
              content={sortByCategories}
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
            <GapH8 />
            {transactionListTiles!}
          </div>
        )}
      </div>
    </div>
  );

  function createListTiles(): JSX.Element[] {
    const listTiles = filteredTransactions.map((transaction, i) => {
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

    return listTiles;
  }

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".dropdown",
      ".drop-down-menu-content"
    );
  }
};

export default TransactionsView;
