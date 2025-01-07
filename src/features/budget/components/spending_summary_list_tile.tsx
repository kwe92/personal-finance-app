import { useTransactionData } from "../../shared/context/transaction_context";
import { sortByDate } from "../../shared/utility/functions";
import "./css/spending_summary_list_tile.css";

export const SpendingSummaryListTile = ({
  budget,
}: {
  budget: BudgetData;
}): JSX.Element => {
  // TODO: refactor duplicated code, see BudgetCard for details as the bellow code is nearly identical
  const { transactions } = useTransactionData();

  const filteredTransactionsByCategory = transactions?.filter((transaction) => {
    return transaction.category === budget?.category;
  });

  filteredTransactionsByCategory?.sort((a, b) => sortByDate(a, b));

  let expendedAmount = 0;

  for (var i = 0; i < filteredTransactionsByCategory!.length; i++) {
    expendedAmount += filteredTransactionsByCategory?.at(i)?.amount ?? 0;
  }

  // TODO: refactor duplicated code end

  return (
    <div className="spending-summary-list-tile-main">
      {/*  vertical line and label section*/}
      <div className="spending-summary-left-section">
        {/* list tile vertical line | NOTE: may need to be moved to a css file instead of being styled inline */}
        <div
          style={{
            width: "4px",
            height: "100%",
            borderRadius: "12px",
            backgroundColor: budget.theme,
          }}
        />
        <p style={{ fontSize: "14px", color: "#696868" }}>{budget.category}</p>
      </div>

      <div className="spending-summary-right-section">
        <p>${Math.abs(expendedAmount).toFixed(2)}</p>
        <p>of ${budget.maximum.toFixed(2)}</p>
      </div>
    </div>
  );
};
