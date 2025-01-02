import "./budget_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import { BudgetCard } from "./components/budget_card";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { BudgetViewModel } from "./budget_view_model";
import { AddNewBudgetCard } from "./components/add_new_budget_card";
import { useBudgetViewData } from "./context/budget_view_context";
import { useBudgetData } from "../shared/context/budget_context";

// TODO: ensure that the budget summary data is using the correct budget data that is shared between the Overview View budget section
export const BudgetView = (): JSX.Element => {
  const viewModel = BudgetViewModel.getInstance();

  const { budgets } = useBudgetData();

  const { resetBudgetCardData } = useBudgetViewData();

  const budgetCards = budgets?.map((budget, i) => {
    return <BudgetCard index={i} budget={budget} />;
  });

  return (
    <>
      <div className="budget-view-main">
        <div className="budget-header-button-section">
          <h1 style={{ color: "#201F24" }}>Budgets</h1>

          <AddNewButton
            label="Budget"
            onTap={() => {
              // ensure the first time toogleAddNewBudgetModal gets called the resetBudgetCardData function is added to the listener
              viewModel.toogleAddNewBudgetModal(resetBudgetCardData);
            }}
          />
        </div>
        <BudgetSummary />

        {budgetCards}
      </div>
      <ModalWrapper id="add-new-budget-modal">
        <AddNewBudgetCard />
      </ModalWrapper>
    </>
  );
};
