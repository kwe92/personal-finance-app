import "./transactions_view.css";
import "../shared/css/view_container.css";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import filterIcon from "../../assets/images/icon-filter-mobile.svg";
import calendarIcon from "../../assets/images/calendar.svg";
import chartIcon from "../../assets/images/icon-nav-budgets.svg";
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
import { ExpenseAnalysisView } from "../expenseAnalysis/expense_analysis_view";
import { useExpenseTrackerData } from "../expenseAnalysis/context/expense_analysis_context";
import { AnalysisToggleButton } from "../shared/components/analysis_toggle_button";
import { CalendarModal } from "./components/calendar_modal";

const TransactionsView = (): JSX.Element => {
  const toastService = ToastService.getInstance();
  const { windowWidth } = useWindowSize();

  const {
    transactionQuery,
    filteredTransactions,
    sortBy,
    category,
    dateRange,
    isCalendarOpen,
    setIsCalendarOpen,
    setCustomRange,
    setDateRange,
    setCategory,
    setSortBy,
    setTransactionQuery,
  } = useTransactionFilterData();

  const { transactions, isLoading } = useTransactionData();
  const { isTrackerOpen, setIsTrackerOpen } = useExpenseTrackerData();

  const dateOptions: DateRangeOption[] = [
    "7 days",
    "14 days",
    "30 Days",
    "Current Month",
    "Custom",
  ];

  if (isLoading) {
    // ! TODO: use spinner or move to its own component
    return (
      <div className="view-container">
        <h1>Transactions</h1>
        <div
          className="transaction-view-content"
          style={{ minHeight: "240px" }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              minHeight: "240px",
              alignItems: "center",
              justifyContent: "center",
              color: "#696868",
              fontSize: "16px",
            }}
          >
            Loading transactions...
          </div>
        </div>
      </div>
    );
  }

  const transactionData = transactions ?? [];
  const categoryList = Array.from(
    new Set(transactionData.map((t) => t.category)),
  );
  categoryList.unshift("All Transactions");
  categoryList.sort((a, b) => a.localeCompare(b));

  let transactionListTiles: JSX.Element[] = [];
  if (windowWidth < 650) {
    transactionListTiles = filteredTransactions.map((transaction, i) => (
      <div key={transaction.id || i}>
        <TransactionListTile transaction={transaction} />
        {filteredTransactions.length - 1 !== i ? (
          <Divider style={{ margin: "16px 0" }} />
        ) : (
          <></>
        )}
      </div>
    ));
  }

  return (
    <div
      className="view-container transaction-view"
      style={isTrackerOpen && windowWidth <= 1100 ? { height: "auto" } : {}}
    >
      <h1>Transactions</h1>

      <div className="transaction-view-content">
        <div className="transaction-filters-container">
          <SearchBar
            value={transactionQuery}
            placeholder="Search transactions"
            onChange={setTransactionQuery}
          />

          <div className="transaction-drop-down-container">
            <AnalysisToggleButton
              chartIcon={chartIcon}
              isTrackerOpen={isTrackerOpen}
              onTap={() => setIsTrackerOpen(!isTrackerOpen)}
            />

            <DropDownMenu
              contentId="date-drop-down-menu-content"
              title="Range"
              label={dateRange}
              content={dateOptions}
              icon={calendarIcon}
              onMenuTap={() => toggleMenu(0)}
              onItemTap={(val: DateRangeOption) => setDateRange(val)}
            />

            <DropDownMenu
              id="sort-drop-down-menu"
              title="Sort by"
              label={sortBy}
              content={sortByCategories}
              icon={documentIcon}
              onMenuTap={() => toggleMenu(1)}
              onItemTap={setSortBy}
            />
            <DropDownMenu
              id="filter-drop-down-menu"
              title="Category"
              label={category}
              content={categoryList}
              icon={filterIcon}
              onMenuTap={() => toggleMenu(2)}
              onItemTap={setCategory}
            />
          </div>
        </div>

        {isTrackerOpen && <ExpenseAnalysisView />}

        {windowWidth > 600 ? (
          <TransactionTable />
        ) : (
          <div className="transaction-list-tile-wrapper">
            <GapH8 />
            {transactionListTiles}
          </div>
        )}
      </div>

      {isCalendarOpen && (
        <CalendarModal
          onClose={() => setIsCalendarOpen(false)}
          onApply={(start: Date, end: Date) => {
            setCustomRange({ start, end });
            setIsCalendarOpen(false);
          }}
        />
      )}
    </div>
  );

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".dropdown",
      ".drop-down-menu-content",
    );
  }
};

export default TransactionsView;
