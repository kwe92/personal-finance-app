import "./css/budget_card.css";

// TODO: move to feature/shared folder along with associated css
import { ColoredLineListTile } from "../../overview/components/colored_line_list_tile";
import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";
import { useTransactionData } from "../../shared/context/transaction_context";
import { sortByDate } from "../../shared/utility/functions";
import { useBudgetViewData } from "../context/budget_view_context";
import { CardHeader } from "../../shared/components/card_header";
import { ToastService } from "../../shared/services/toast_service";
import { ModalClassName, ModalId } from "../../../app/constants/constants";

export const BudgetCard = ({
  index, // required to ensure that only the menu to the associated card will be opened
  budget,
}: {
  index: number;
  budget: BudgetData;
}) => {
  const { transactions } = useTransactionData();

  const toastService = ToastService.getInstance();
  const {
    resetBudgetModalData,
    setBudgetToEdit,
    setSelectedBudgetCategory,
    setMaxSpending,
    setSelectedColorTag,
    budgetColorTags,
    setEditBudget,
    setBudgetToDelete,
  } = useBudgetViewData();

  const filteredTransactionsByCategory = getSortedFilteredTransactions();

  const expendedAmount = getBudgetCategoryExpendedAmount();

  return (
    <div className="budget-card-main">
      <CardHeader
        color={budget!.theme}
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
          lineColor={budget!.theme}
          title="Spent"
          content={`$${Math.abs(expendedAmount).toFixed(2)}`}
          style={{ flex: 1 }}
        />

        <ColoredLineListTile
          lineColor="#F8F4F0"
          title="Remaining"
          content={`$${(budget.maximum - Math.abs(expendedAmount)).toFixed(2)}`}
          style={{ flex: 1 }}
        />
      </div>

      <LatestSpendingCard transactions={filteredTransactionsByCategory ?? []} />
    </div>
  );

  function getBudgetCategoryExpendedAmount(): number {
    const filteredTransactions = getSortedFilteredTransactions();

    let expendedAmount = 0;

    for (var i = 0; i < filteredTransactions!.length; i++) {
      expendedAmount += filteredTransactions?.at(i)?.amount ?? 0;
    }

    return expendedAmount;
  }

  function getSortedFilteredTransactions(): TransactionData[] {
    const filteredTransactionsByCategory = transactions?.filter(
      (transaction) => {
        return transaction.category === budget?.category;
      }
    );

    filteredTransactionsByCategory?.sort((a, b) => sortByDate(a, b));

    return filteredTransactionsByCategory ?? [];
  }

  function handleEditBudgetCard() {
    setEditBudget(true);
    setBudgetToEdit(budget);
    setSelectedBudgetCategory(budget.category);
    setMaxSpending(budget.maximum);
    setSelectedColorTag(
      budgetColorTags.find((colorTag) => {
        return colorTag.theme === budget.theme;
      })
    );

    closeMenu();

    toastService.toogleModal(ModalId.budgetModal, resetBudgetModalData);
  }

  function handleDeleteBudgetCard() {
    setBudgetToDelete(budget);

    const toastService = ToastService.getInstance();

    closeMenu();

    toastService.toogleModal(ModalId.deleteBudgetModal, resetBudgetModalData);
  }

  function closeMenu() {
    const dropdownContent = document.querySelectorAll(
      ModalClassName.cardDropDownMenu
    )[index];

    dropdownContent!.classList.toggle("show");
  }

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ModalClassName.budgetCardDropDown,
      ModalClassName.cardDropDownMenu
    );
  }
};
