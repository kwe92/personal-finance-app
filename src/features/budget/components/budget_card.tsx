import "./css/budget_card.css";

import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";
import { useTransactionData } from "../../shared/context/transaction_context";
import { currencyArithmetic } from "../../shared/utility/functions";
import { useBudgetViewData } from "../context/budget_view_context";
import { CardHeader } from "../../shared/components/card_header";
import { ToastService } from "../../shared/services/toast_service";
import { ModalClassName, ModalId } from "../../../app/constants/constants";
import { ColoredLineListTile } from "../../shared/components/colored_line_list_tile";
import { BudgetViewModel } from "../budget_view_model";

export const BudgetCard = ({
  index,
  budget,
}: {
  index: number;
  budget: BudgetData;
}) => {
  const { transactions } = useTransactionData();
  const toastService = ToastService.getInstance();

  const { resetBudgetModalData, populateEditForm, setBudgetToDelete } =
    useBudgetViewData();

  const filteredTransactionsByCategory =
    BudgetViewModel.filterTransactionByBudgetCategory(
      transactions ?? [],
      budget,
    );

  const expendedAmount = BudgetViewModel.budgetCategoryExpendedAmount(
    filteredTransactionsByCategory,
  );

  function closeMenu() {
    const dropdownContent = document.querySelectorAll(
      ModalClassName.cardDropDownMenu,
    )[index];

    dropdownContent?.classList.remove("show");
  }

  function toggleMenu(idx: number) {
    toastService.toggleDropDownMenu(
      idx,
      ModalClassName.budgetCardDropDown,
      ModalClassName.cardDropDownMenu,
    );
  }

  function handleEditBudgetCard() {
    populateEditForm(budget);
    closeMenu();
    toastService.toogleModal(ModalId.budgetModal, resetBudgetModalData);
  }

  function handleDeleteBudgetCard() {
    setBudgetToDelete(budget);
    closeMenu();
    toastService.toogleModal(ModalId.deleteBudgetModal, resetBudgetModalData);
  }

  return (
    <div className="budget-card-main">
      <CardHeader
        color={budget.theme}
        name={budget.category}
        dropdownText="Budget"
        dropdownClassName="budget-card-dropdown"
        onIconTap={() => toggleMenu(index)}
        handleEditItem={handleEditBudgetCard}
        handleDeleteItem={handleDeleteBudgetCard}
      />

      <p id="max-amount">Maximum of ${budget.maximum.toFixed(2)}</p>

      <ProgressBar
        maxAmount={budget.maximum}
        expendedAmount={expendedAmount}
        themeColor={budget.theme}
      />

      <div className="budget-card-list-tile-section">
        <ColoredLineListTile
          lineColor={budget.theme}
          title="Spent"
          content={`$${Math.abs(expendedAmount).toFixed(2)}`}
          style={{ flex: 1 }}
        />

        <ColoredLineListTile
          lineColor="#F8F4F0"
          title="Remaining"
          content={`$${currencyArithmetic(
            budget.maximum,
            Math.abs(expendedAmount),
            "sub",
          ).toFixed(2)}`}
          style={{ flex: 1 }}
        />
      </div>

      <LatestSpendingCard transactions={filteredTransactionsByCategory ?? []} />
    </div>
  );
};
