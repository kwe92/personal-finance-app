import "./budget_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import { BudgetCard } from "./components/budget_card";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { BudgetViewModel } from "./budget_view_model";
import { AddNewBudgetCard } from "./components/add_new_budget_card";
import { BudgetViewProvider } from "./context/budget_view_context";
import { useBudgetData } from "../shared/context/budget_context";

// TODO: ensure that the budget summary data is using the correct budget data that is shared between the Overview View budget section
export const BudgetView = (): JSX.Element => {
  const viewModel = BudgetViewModel.getInstance();

  const { budgets } = useBudgetData();

  const budgetCards = budgets?.map((budget, i) => {
    return <BudgetCard index={i} budget={budget} />;
  });

  return (
    <BudgetViewProvider>
      <div className="budget-view-main">
        <div className="budget-header-button-section">
          <h1 style={{ color: "#201F24" }}>Budgets</h1>

          <AddNewButton
            label="Budget"
            onTap={viewModel.toogleAddNewBudgetModal}
          />
        </div>
        <BudgetSummary />

        {budgetCards}
      </div>
      <ModalWrapper id="add-new-budget-modal">
        <AddNewBudgetCard onTap={viewModel.toogleAddNewBudgetModal} />
      </ModalWrapper>
    </BudgetViewProvider>
  );
};
