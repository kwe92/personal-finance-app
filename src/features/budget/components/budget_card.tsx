import "./css/budget_card.css";

// TODO: move to feature/shared folder along with associated css
import { ColoredLineListTile } from "../../overview/components/colored_line_list_tile";
import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";
import { useTransactionData } from "../../shared/context/transaction_context";
import { sortByDate } from "../../shared/utility/functions";
import { useBudgetData } from "../../shared/context/budget_context";
import { useBudgetViewData } from "../context/budget_view_context";
import { CardHeader } from "../../shared/components/card_header";
import { ToastService } from "../../shared/services/toast_service";

export const BudgetCard = ({
  index, // required to ensure that only the menu to the associated card will be opened
  budget,
}: {
  index: number;
  budget: BudgetData;
}) => {
  const { transactions } = useTransactionData();

  const { budgets, setBudgets } = useBudgetData();

  const toastService = ToastService.getInstance();
  const {
    resetBudgetCardData,
    setBudgetToEdit,
    setSelectedBudgetCategory,
    setMaxSpending,
    setSelectedColorTag,
    budgetColorTags,
    setEditBudget,
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
        handleDeleteItem={handleRemoveBudgetCard}
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

    toastService.toogleModal("add-new-budget-modal", resetBudgetCardData);
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

  function handleRemoveBudgetCard() {
    const updatedBudgets = budgets?.filter((currentBudgetedItem) => {
      return currentBudgetedItem !== budget;
    });

    setBudgets(updatedBudgets);
  }

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".budget-card-dropdown",
      ".card-drop-down-menu"
    );
  }
};
