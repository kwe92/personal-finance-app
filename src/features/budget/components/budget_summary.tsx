import React from "react";
import "./css/budget_summary.css";
import { Doughnut } from "react-chartjs-2";
import { SpendingSummaryListTile } from "./spending_summary_list_tile";
import { Divider } from "../../shared/components/divider";
import { useBudgetData } from "../../shared/context/budget_context";
import { useTransactionData } from "../../shared/context/transaction_context";
import { useDoughnutChartData } from "../../shared/context/doughnut_chart_context";
import { BudgetViewModel } from "../budget_view_model";
import { useUserPreferencesData } from "../../shared/context/user_preferences_context";
import { ToastService } from "../../shared/services/toast_service";
import { ModalId } from "../../../app/constants/constants";

export const BudgetSummary = (): JSX.Element => {
  const { budgets } = useBudgetData();
  const { transactions } = useTransactionData();
  const { preferences } = useUserPreferencesData();
  const { doughnutChartOptions, doughnutChartData } = useDoughnutChartData();
  const toastService = ToastService.getInstance();

  const maximumBudgetAmount = budgets?.reduce(
    (accumulator, budget) => accumulator + budget.maximum,
    0,
  );

  const expendedAmount = (budgets ?? []).reduce((acc, budget) => {
    const filteredTxns = BudgetViewModel.filterTransactionByBudgetCategory(
      transactions ?? [],
      budget,
    );
    return acc + BudgetViewModel.budgetCategoryExpendedAmount(filteredTxns);
  }, 0);

  const latestBudgets = budgets?.slice(0, 4) ?? [];

  const spendingSummaryListTiles = latestBudgets.map((budget, i) => (
    <React.Fragment key={budget.id || budget.category || i}>
      <SpendingSummaryListTile budget={budget} />
      {latestBudgets.length - 1 !== i && <Divider />}
    </React.Fragment>
  ));

  return (
    <div className="budget-summary-main">
      <div className="budget-summary-chart-container">
        <Doughnut
          options={doughnutChartOptions}
          data={doughnutChartData}
          style={{ padding: "0px", marginBottom: "10px" }}
        />
      </div>

      <div className="budget-summary-total-spending">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <p className="budget-summary-bold-text">Total Spending</p>
          <div>
            <p>${Math.abs(expendedAmount).toFixed(2)}</p>
            <p>of ${maximumBudgetAmount?.toFixed(2)} planned</p>
          </div>
        </div>

        <Divider />
        {/* TODO: Move Icon text button into component */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
          }}
          onClick={() => toastService.toogleModal(ModalId.globalTargetModal)}
        >
          <p style={{ fontSize: "12px", fontWeight: "bold", color: "#201F24" }}>
            Limit: $
            {preferences?.monthlySpendingTarget.toFixed(2) ??
              maximumBudgetAmount.toFixed(2)}
          </p>
          {/* #277C78 */}
          <p style={{ fontSize: "10px", color: "#5f98da", fontWeight: "bold" }}>
            ✎ Edit Target
          </p>
        </div>
      </div>
      <div className="budget-spending-summary">
        <p className="budget-summary-bold-text">Spending Summary</p>
        {spendingSummaryListTiles}
      </div>
    </div>
  );
};
