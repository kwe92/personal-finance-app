import "./budget_view.css";
import "../shared/css/view_container.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import { BudgetCard } from "./components/budget_card";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { AddNewBudgetCard } from "./components/add_new_budget_card";
import { useBudgetViewData } from "./context/budget_view_context";
import { useBudgetData } from "../shared/context/budget_context";
import { ToastService } from "../shared/services/toast_service";
export const BudgetView = (): JSX.Element => {
  const modalId = "add-new-budget-modal";

  const toastService = ToastService.getInstance();

  const { budgets } = useBudgetData();

  const { resetBudgetCardData } = useBudgetViewData();

  const budgetCards = budgets?.map((budget, i) => {
    return <BudgetCard index={i} budget={budget} />;
  });

  return (
    <>
      <div className="view-container">
        <div className="budget-header-button-section">
          <h1 style={{ color: "#201F24" }}>Budgets</h1>

          <AddNewButton
            label="Budget"
            onTap={() => {
              toastService.toogleModal(modalId, resetBudgetCardData);
            }}
          />
        </div>
        <BudgetSummary />

        {budgetCards}
      </div>
      <ModalWrapper id={modalId} contentId={`${modalId}-content`}>
        <AddNewBudgetCard />
      </ModalWrapper>
    </>
  );
};
