import "./css/add_new_budget_card.css";
import "../../shared/css/base_modal.css";

import MainButton from "../../shared/components/main_button";
import TextFormField from "../../shared/components/text_form_field";
import { useBudgetViewData } from "../context/budget_view_context";
import { useBudgetData } from "../../shared/context/budget_context";
import Budget from "../../shared/models/budget";
import { formatDate } from "../../shared/utility/functions";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import { ModalDropDownMenu } from "../../shared/components/modal_drop_down_menu";
import { ToastService } from "../../shared/services/toast_service";

// TODO: added validators to the card as to give the user a visual representation of any errors made while filling out the card

export const AddNewBudgetCard = (): JSX.Element => {
  const toastService = ToastService.getInstance();

  const { budgets, setBudgets } = useBudgetData();

  const {
    categoryContent,
    colorTagContent,
    selectedBudgetCategory,
    resetBudgetCardData,
    selectedColorTag,
    maxSpending,
    setMaxSpending,
    editBudet,
    budgetToEdit,
  } = useBudgetViewData();

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{!editBudet ? "Add New Budget" : "Edit Budget"}</p>

        <CloseModalButton
          onTap={() => {
            resetBudgetCardData();
            toastService.toogleModal("add-new-budget-modal");
          }}
        />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        {!editBudet
          ? "Choose a category to set a spending budget. These categories can help you monitor spending."
          : "As your budgets change, feel free to update your spending limits."}
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={(e) => {
          e.preventDefault(); // prevent form default behavior, add custom frontend form handling
        }}
      >
        <ModalDropDownMenu
          label="Budget Category"
          content={categoryContent ?? []}
          initialValue={selectedBudgetCategory}
          toggleMenu={() => toggleMenu(0)}
        />

        <TextFormField
          name="maxSpend"
          label="Maximum Spend"
          type="number"
          value={maxSpending}
          placeholder="$ e.g. 200.00"
          onChange={(event) => {
            setMaxSpending(event.target.value);
          }}
        />

        <ModalDropDownMenu
          isColorTag={true}
          label="Color Tag"
          tagColor={selectedColorTag?.theme ?? ""}
          initialValue={selectedColorTag?.name ?? ""}
          content={colorTagContent ?? []}
          toggleMenu={() => toggleMenu(1)}
        />
      </form>

      <MainButton onTap={handleBudgetCard}>
        {!editBudet ? "Add Budget" : "Save Changes"}
      </MainButton>
    </div>
  );

  function handleBudgetCard() {
    if (isValidFormData()) {
      if (editBudet) {
        editExistingBudgetItem();
      } else {
        addNewBudgetItem();
      }

      // set budget card state to default values
      resetBudgetCardData();

      // find and close modal by setting display to none
      var modal = document.getElementById("add-new-budget-modal");

      modal!.style.display = "none";
    }
  }

  function addNewBudgetItem() {
    setBudgets((prevState: BudgetData[]) => {
      return [
        new Budget({
          category: selectedBudgetCategory,
          maximum: Number.parseFloat(maxSpending),
          theme: selectedColorTag!.theme,
          createdAt: formatDate(new Date().toLocaleString()),
          updatedAt: formatDate(new Date().toLocaleString()),
        }),
        ...prevState,
      ];
    });
  }

  function editExistingBudgetItem() {
    const indexOfItemToUpdate = budgets!.indexOf(budgetToEdit);

    const updatedBudget = new Budget({
      category: selectedBudgetCategory,
      maximum: Number.parseFloat(maxSpending),
      theme: selectedColorTag!.theme,
      createdAt: budgetToEdit.createdAt,
      updatedAt: formatDate(new Date().toLocaleString()),
    });

    budgets!.splice(indexOfItemToUpdate, 1, updatedBudget);

    // needs to be unpacked or the doughnut chart will not update
    setBudgets([...budgets!]);
  }

  function isValidFormData() {
    return (
      Number.parseFloat(maxSpending) > 0 && selectedBudgetCategory.length > 0
    );
  }

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".modal-drop-down-menu",
      ".modal-drop-down-menu-content"
    );
  }
};
