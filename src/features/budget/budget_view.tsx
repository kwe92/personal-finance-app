import "./budget_view.css";
import "../shared/css/view_container.css";
import "../shared/css/button_header_section.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import { BudgetCard } from "./components/budget_card";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { BudgetModal } from "./components/budget_modal";
import { useBudgetViewData } from "./context/budget_view_context";
import { useBudgetData } from "../shared/context/budget_context";
import { ToastService } from "../shared/services/toast_service";
import { ModalId } from "../../app/constants/constants";
import { DeleteModal } from "../shared/components/delete_modal";
export const BudgetView = (): JSX.Element => {
  const modalId = ModalId.budgetModal;

  const toastService = ToastService.getInstance();

  const { budgets, setBudgets } = useBudgetData();

  const { resetBudgetModalData, budgetToDelete } = useBudgetViewData();

  const budgetCards = budgets?.map((budget, i) => {
    return <BudgetCard index={i} budget={budget} />;
  });

  return (
    <>
      <div className="view-container" style={{ overflowY: "scroll" }}>
        <div className="button-header-section">
          <h1 style={{ color: "#201F24" }}>Budgets</h1>

          <AddNewButton
            label="Budget"
            onTap={() => {
              toastService.toogleModal(modalId, resetBudgetModalData);
            }}
          />
        </div>
        <BudgetSummary />

        {budgetCards}
      </div>
      <ModalWrapper id={modalId}>
        <BudgetModal />
      </ModalWrapper>

      <ModalWrapper id={ModalId.deleteBudgetModal}>
        <DeleteModal
          modalId={ModalId.deleteBudgetModal}
          isPot={false}
          title={budgetToDelete.category}
          handleItemDeletion={handleDeleteBudget}
        />
      </ModalWrapper>
    </>
  );

  function handleDeleteBudget() {
    const updatedBudget = budgets?.filter((currentBudgetItem) => {
      return currentBudgetItem !== budgetToDelete;
    });
    setBudgets(updatedBudget!);
  }
};
