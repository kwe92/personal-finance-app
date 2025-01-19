import { Divider } from "../../shared/components/divider";
import { useTransactionData } from "../../shared/context/transaction_context";
import { getDaysDifference } from "../../shared/utility/functions";
import "./css/recurring_bills_summary_card.css";

export const RecurringBillsSummaryCard = (): JSX.Element => {
  const { transactions } = useTransactionData();

  // bill summary values

  var paidBills: TransactionData[] = [];

  var upcomingBills: TransactionData[] = [];

  var dueSoonBills: TransactionData[] = [];

  var sumOfBillsPaid = 0;

  var sumOfBillsUpcoming = 0;

  var sumOfBillsDueSoon = 0;

  if (transactions !== null) {
    setBillSummaryValues();
  }

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

  function setBillSummaryValues() {
    const recurringBills = transactions!.filter((trnasaction) => {
      return trnasaction.recurring === true;
    });

    paidBills = billsByCategory(recurringBills, "paid");

    upcomingBills = billsByCategory(recurringBills, "upcoming");

    dueSoonBills = billsByCategory(recurringBills, "due");

    sumOfBillsPaid = sumOfBills(paidBills);

    sumOfBillsUpcoming = sumOfBills(upcomingBills);

    sumOfBillsDueSoon = sumOfBills(dueSoonBills);
  }
};

function billsByCategory(
  recurringBills: TransactionData[],
  recurringBillCategory: RecurringBillCategory
): TransactionData[] {
  return recurringBills.filter((bill) => {
    const now = new Date(Date.now());

    const billDate = new Date(bill.date);

    const differenceInDays = getDaysDifference(now, billDate);

    switch (recurringBillCategory) {
      case "paid":
        return differenceInDays > 0;

      case "upcoming":
        return differenceInDays < -8;

      case "due":
        return differenceInDays > -8 && differenceInDays <= 0;
    }
  });
}

function sumOfBills(bills: TransactionData[]): number {
  return Math.abs(
    bills.reduce((accumulator, bill) => {
      return accumulator + bill.amount;
    }, 0)
  );
}
