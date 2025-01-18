import "./recurring_bills_view.css";
import "../shared/css/view_container.css";
import { RecurringBillsSummaryCard } from "./components/recurring_bills_summary_card";
import { TotalBills } from "./components/total_bills_section";

export const RecurringBillsView = (): JSX.Element => {
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
        <div className="recurring-bills-view-content-second-section">
          {/* TODO: add right side content */}
        </div>
      </div>
    </div>
  );
};
