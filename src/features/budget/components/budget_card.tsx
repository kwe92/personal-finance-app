import "./css/budget_card.css";

// TODO: move to feature/shared folder along with associated css
import { ColoredLineListTile } from "../../overview/components/colored_line_list_tile";
import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";
import { toggleDropDownMenu } from "../../shared/utility/toggle_drop_down_menu";
import { useTransactionData } from "../../shared/context/transaction_context";
import { sortByDate } from "../../shared/utility/functions";
import { useBudgetData } from "../../shared/context/budget_context";
import { BudgetViewModel } from "../budget_view_model";
import { useBudgetViewData } from "../context/budget_view_context";

export const BudgetCard = ({
  index,
  budget,
}: {
  index: number;
  budget: BudgetData;
}) => {
  const { transactions } = useTransactionData();

  const { budgets, setBudgets } = useBudgetData();

  const viewModel = BudgetViewModel.getInstance();

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
      {/* header */}
      <div className="budget-card-header">
        <div className="budget-card-header-left-side">
          <div
            className="budget-card-header-circle"
            style={{ backgroundColor: budget!.theme }}
          />
          <p>{budget.category}</p>
        </div>

        {/* NOTE: may need to be moved to the budget_card.css file */}
        <div
          className="budget-card-dropdown"
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "end", // controls the centering of the dropdown menu
          }}
        >
          {/* dot dot dot icon */}
          <svg viewBox="0 0 14 4" onClick={() => toggleMenu(index)}>
            <path d="M8.75 2C8.75 2.34612 8.64736 2.68446 8.45507 2.97225C8.26278 3.26003 7.98947 3.48434 7.6697 3.61679C7.34993 3.74924 6.99806 3.7839 6.65859 3.71637C6.31913 3.64885 6.00731 3.48218 5.76256 3.23744C5.51782 2.9927 5.35115 2.68087 5.28363 2.34141C5.2161 2.00194 5.25076 1.65007 5.38321 1.3303C5.51567 1.01053 5.73997 0.737221 6.02775 0.544928C6.31554 0.352636 6.65388 0.25 7 0.25C7.46413 0.25 7.90925 0.434375 8.23744 0.762563C8.56563 1.09075 8.75 1.53587 8.75 2ZM2 0.25C1.65388 0.25 1.31554 0.352636 1.02775 0.544928C0.739967 0.737221 0.515665 1.01053 0.383212 1.3303C0.250758 1.65007 0.216102 2.00194 0.283627 2.34141C0.351151 2.68087 0.517822 2.9927 0.762564 3.23744C1.00731 3.48218 1.31913 3.64885 1.65859 3.71637C1.99806 3.7839 2.34993 3.74924 2.6697 3.61679C2.98947 3.48434 3.26278 3.26003 3.45507 2.97225C3.64737 2.68446 3.75 2.34612 3.75 2C3.75 1.53587 3.56563 1.09075 3.23744 0.762563C2.90925 0.434375 2.46413 0.25 2 0.25ZM12 0.25C11.6539 0.25 11.3155 0.352636 11.0278 0.544928C10.74 0.737221 10.5157 1.01053 10.3832 1.3303C10.2508 1.65007 10.2161 2.00194 10.2836 2.34141C10.3512 2.68087 10.5178 2.9927 10.7626 3.23744C11.0073 3.48218 11.3191 3.64885 11.6586 3.71637C11.9981 3.7839 12.3499 3.74924 12.6697 3.61679C12.9895 3.48434 13.2628 3.26003 13.4551 2.97225C13.6474 2.68446 13.75 2.34612 13.75 2C13.75 1.77019 13.7047 1.54262 13.6168 1.3303C13.5288 1.11798 13.3999 0.925066 13.2374 0.762563C13.0749 0.600061 12.882 0.471156 12.6697 0.383211C12.4574 0.295265 12.2298 0.25 12 0.25Z" />
          </svg>

          <div className="budget-card-drop-down-menu">
            <p onClick={handleEditBudgetCard}>Edit Budget</p>
            <p style={{ color: "#C94736" }} onClick={handleRemoveBudgetCard}>
              Delete Budget
            </p>
          </div>
        </div>
      </div>

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
          // content="$150.00"
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

    viewModel.toogleAddNewBudgetModal(resetBudgetCardData);
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
};

function toggleMenu(index: number) {
  toggleDropDownMenu(
    index,
    ".budget-card-dropdown",
    ".budget-card-drop-down-menu"
  );
}
