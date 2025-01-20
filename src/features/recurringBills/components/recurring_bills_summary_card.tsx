import { Divider } from "../../shared/components/divider";
import { useTransactionData } from "../../shared/context/transaction_context";
import { sumOfBills } from "../../shared/utility/functions";
import { useRecurringBillsViewData } from "../context/recurring_bills_context";
import "./css/recurring_bills_summary_card.css";

export const RecurringBillsSummaryCard = (): JSX.Element => {
  const { paidBills, upcomingBills, dueSoonBills } =
    useRecurringBillsViewData();

  // bill summary values

  const sumOfBillsPaid = sumOfBills(paidBills);

  const sumOfBillsUpcoming = sumOfBills(upcomingBills);

  const sumOfBillsDueSoon = sumOfBills(dueSoonBills);

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
      </div>
    </div>
  );
};
