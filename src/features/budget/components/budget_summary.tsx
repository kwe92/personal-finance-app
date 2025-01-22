import "./css/budget_summary.css";
import { Doughnut } from "react-chartjs-2";
import { SpendingSummaryListTile } from "./spending_summary_list_tile";
import { Divider } from "../../shared/components/divider";
import { useBudgetData } from "../../shared/context/budget_context";
import { useTransactionData } from "../../shared/context/transaction_context";
import { useDoughnutChartData } from "../../shared/context/doughnut_chart_context";

export const BudgetSummary = (): JSX.Element => {
  const { budgets } = useBudgetData();

  const { transactions } = useTransactionData();

  const { doughnutChartOptions, doughnutChartData } = useDoughnutChartData();

  const maximumBudgetAmount = budgets?.reduce(
    (accumulator, budget) => {
      return (accumulator += budget.maximum);
    },
    0 // initial accumulator value
  );

  const budgetCategories = budgets?.map((budget) => budget.category);

  const filteredTransactionsByCategory = transactions?.filter((transaction) =>
    budgetCategories?.includes(transaction.category)
  );

  let expendedAmount = 0;

  // ensure data is not undefined before iterating over
  if (filteredTransactionsByCategory) {
    filteredTransactionsByCategory.forEach(
      (transaction) => (expendedAmount += transaction.amount)
    );
  }
  const latestBudgets = budgets?.slice(0, 4);

  // get the latest budgets at most 4
  const spendingSummaryListTiles = latestBudgets
    ?.slice(0, 4)
    .map((budget, i) => {
      return (
        <>
          <SpendingSummaryListTile budget={budget} />
          {latestBudgets.length - 1 !== i ? <Divider /> : <></>}
        </>
      );
    });

  return (
    // Budget summary main container
    <div className="budget-summary-main">
      {/* Doughnut Chart */}

      <div className="budget-summary-chart-container">
        <Doughnut
          options={doughnutChartOptions}
          data={doughnutChartData}
          style={{ padding: "0px", marginBottom: "10px" }}
        />
      </div>
      <div className="budget-summary-total-spending">
        <p className="budget-summary-bold-text"> Total Spending</p>

        <div>
          {" "}
          <p>${Math.abs(expendedAmount).toFixed(2)} </p>
          <p>of ${maximumBudgetAmount?.toFixed(2)} limit</p>
        </div>
      </div>

      {/* spending summary section */}
      <div className="budget-spending-summary">
        <p className="budget-summary-bold-text">Spending Summary</p>
        {spendingSummaryListTiles}
      </div>
    </div>
  );
};
