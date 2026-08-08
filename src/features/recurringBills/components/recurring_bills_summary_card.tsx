import { Divider } from "../../shared/components/divider";
import { sumOfBills } from "../../shared/utility/functions";
import { useRecurringBillsViewData } from "../context/recurring_bills_context";
import "./css/recurring_bills_summary_card.css";

export const RecurringBillsSummaryCard = (): JSX.Element => {
  const { paidBills, upcomingBills, dueSoonBills, pastDueBills } =
    useRecurringBillsViewData();

  const sumOfBillsPaid = sumOfBills(paidBills);
  const sumOfBillsUpcoming = sumOfBills(upcomingBills);
  const sumOfBillsDueSoon = sumOfBills(dueSoonBills);
  const sumOfBillsPastDue = sumOfBills(pastDueBills ?? []);

  return (
    <div className="recurring-bills-summary-card">
      <p>Summary</p>

      <div className="recurring-bills-summary-card-content">
        <div className="recurring-bills-summary-card-tist-tile">
          <p>Paid Bills</p>
          <p>
            {paidBills.length} (${sumOfBillsPaid.toFixed(2)})
          </p>
        </div>

        <Divider />

        <div className="recurring-bills-summary-card-tist-tile">
          <p>Upcoming Bills</p>
          <p>
            {upcomingBills.length} (${sumOfBillsUpcoming.toFixed(2)})
          </p>
        </div>

        <Divider />

        <div className="recurring-bills-summary-card-tist-tile">
          <p>Due Soon Bills</p>
          <p>
            {dueSoonBills.length} (${sumOfBillsDueSoon.toFixed(2)})
          </p>
        </div>

        {pastDueBills && pastDueBills.length > 0 && (
          <>
            <Divider />
            <div className="recurring-bills-summary-card-tist-tile">
              <p style={{ color: "#C94736" }}>Past Due Bills</p>
              <p style={{ color: "#C94736" }}>
                {pastDueBills.length} (${sumOfBillsPastDue.toFixed(2)})
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
