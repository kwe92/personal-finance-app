import { Divider } from "../../shared/components/divider";
import { useTransactionData } from "../../shared/context/transaction_context";
import { formatDate } from "../../shared/utility/functions";
import "./css/recurring_bills_summary_card.css";

//!! TODO: continue styling css file and adding hard-coded logic

export const RecurringBillsSummaryCard = (): JSX.Element => {
  const { transactions } = useTransactionData();

  var paidBills = [];

  var sumOfBillsPaid = 0;

  if (transactions !== null) {
    const recurringBills = transactions!.filter((trnasaction) => {
      return trnasaction.recurring === true;
    });

    paidBills = getPaidBills(recurringBills);

    sumOfBillsPaid = Math.abs(
      paidBills.reduce((accumulator, bill) => {
        return accumulator + bill.amount;
      }, 0)
    );
  }

  return (
    <div className="recurring-bills-summary-card">
      <p>Summary</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="recurring-bills-summary-card-tist-tile">
          <p>Paid Bills</p>
          <p>
            {paidBills.length} (${sumOfBillsPaid.toFixed(2)})
          </p>
        </div>

        <Divider />

        <div className="recurring-bills-summary-card-tist-tile">
          <p>Paid Bills</p>
          <p>
            {paidBills.length} (${sumOfBillsPaid.toFixed(2)})
          </p>
        </div>

        <Divider />

        <div className="recurring-bills-summary-card-tist-tile">
          <p>Paid Bills</p>
          <p>
            {paidBills.length} (${sumOfBillsPaid.toFixed(2)})
          </p>
        </div>
      </div>
    </div>
  );

  // TODO: refactor into billsByType and use an enum and a switch statement to return the bill type
  function getPaidBills(recurringBills: TransactionData[]): TransactionData[] {
    return recurringBills.filter((bill) => {
      const now = Date.now();

      const billDate = Date.parse(bill.date);

      return billDate < now;
    });
  }
};
