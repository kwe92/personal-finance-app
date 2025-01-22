import "./recurring_bills_view.css";
import "../shared/css/view_container.css";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import { RecurringBillsSummaryCard } from "./components/recurring_bills_summary_card";
import { TotalBills } from "./components/total_bills_section";
import { RecurringBillsTable } from "./components/recurring_bills_table";
import { SearchBar } from "../shared/components/search_bar";
import { DropDownMenu } from "../shared/components/drop_down_menu";
import { sortByCategories } from "../../app/constants/constants";
import { ToastService } from "../shared/services/toast_service";
import { useRecurringBillsViewData } from "./context/recurring_bills_context";
import useWindowSize from "../shared/hooks/use_window_size";
import { RecurringBillsListTile } from "./components/recurring_bills_list_tile";
import { getBillCategory } from "../shared/utility/functions";
import { Divider } from "../shared/components/divider";

//!! TODO: move all the css you need from transactions to the shared css folder and ensure that you rename the classes

export const RecurringBillsView = (): JSX.Element => {
  const toastService = ToastService.getInstance();

  const { windowWidth } = useWindowSize();

  const { sortBy, setSortBy, setQueryString, queryString } =
    useRecurringBillsViewData();

  const { recurringBills } = useRecurringBillsViewData();

  var recurringBillsListTiles: JSX.Element[] = [];

  if (windowWidth < 650) {
    recurringBillsListTiles = createRecurringBillsListTiles(recurringBills);
  }

  return (
    <div className="view-container">
      <h1 style={{ color: "#201F24" }}>Recurring Bills</h1>

      <div className="recurring-bills-view-content">
        {/* left side */}
        <div className="recurring-bills-view-content-first-section">
          {/* TODO: add left side content */}
          <TotalBills />
          <RecurringBillsSummaryCard />
        </div>

        {/* right side */}
        <div className="recurring-bills-view-second-section">
          <div className="recurring-bills-view-second-section-content">
            <div className="transaction-filters-container">
              <SearchBar
                value={queryString}
                placeholder="Search bills"
                onChange={setQueryString}
              />

              <div className="transaction-drop-down-container">
                <DropDownMenu
                  id="recurring-bills-sort-drop-down-menu"
                  title="Sort by"
                  label={sortBy}
                  sortBy={sortBy}
                  content={sortByCategories}
                  icon={documentIcon}
                  onMenuTap={() => {
                    toastService.toggleDropDownMenu(
                      0,
                      ".dropdown",
                      ".drop-down-menu-content"
                    );
                  }}
                  onItemTap={setSortBy}
                />
              </div>
            </div>
            {windowWidth > 600 ? (
              <RecurringBillsTable />
            ) : (
              <div style={{ overflowY: "scroll" }}>
                {recurringBillsListTiles}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function createRecurringBillsListTiles(recurringBills: TransactionData[]) {
  const listTiles = recurringBills.map((bill, i) => {
    return (
      <>
        <RecurringBillsListTile
          bill={bill}
          billStatus={getBillCategory(bill)}
        />
        {recurringBills.length - 1 !== i ? (
          <Divider style={{ marginTop: "12px" }} />
        ) : (
          <></>
        )}
      </>
    );
  });

  return listTiles;
}
