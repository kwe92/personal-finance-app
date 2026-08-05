import "../../shared/css/base_modal.css";

import MainButton from "../../shared/components/main_button";
import TextFormField from "../../shared/components/text_form_field";
import { useBudgetViewData } from "../context/budget_view_context";
import { useBudgetData } from "../../shared/context/budget_context";
import { parseStringToCurrency } from "../../shared/utility/functions";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import { ModalDropDownMenu } from "../../shared/components/modal_drop_down_menu";
import { ToastService } from "../../shared/services/toast_service";
import { ModalId } from "../../../app/constants/constants";
import { useFormErrorData } from "../../shared/context/form_error_context";

export const BudgetModal = (): JSX.Element => {
  const toastService = ToastService.getInstance();

  const { addBudgetHandler, updateBudgetHandler } = useBudgetData();

  const {
    categoryContent,
    colorTagContent,
    selectedBudgetCategory,
    resetBudgetModalData,
    selectedColorTag,
    maxSpending,
    setMaxSpending,
    editBudet,
    budgetToEdit,
  } = useBudgetViewData();

  const {
    budgetModalBudgetCategoryError,
    budgetModalMaxSpendingError,
    budgetModalColorTagError,
    setBudgetModalBudgetCategoryError,
    setBudgetModalMaxSpendingError,
    setBudgetModalColorTagError,
  } = useFormErrorData();

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{!editBudet ? "Add New Budget" : "Edit Budget"}</p>

        <CloseModalButton onTap={closeModal} />
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
        <div>
          <ModalDropDownMenu
            label="Budget Category"
            content={categoryContent ?? []}
            initialValue={selectedBudgetCategory}
            toggleMenu={() => {
              setBudgetModalBudgetCategoryError(false);
              toggleMenu(0);
            }}
          />

          {budgetModalBudgetCategoryError ? (
            <p className="error-text">Select a budget category</p>
          ) : (
            <></>
          )}
        </div>

        <div>
          <TextFormField
            name="maxSpend"
            label="Maximum Spend"
            type="number"
            value={maxSpending}
            placeholder="$ e.g. 200.00"
            onChange={(event) => {
              setBudgetModalMaxSpendingError(false);
              setMaxSpending(parseStringToCurrency(event.target.value));
            }}
          />

          {budgetModalMaxSpendingError ? (
            <p className="error-text">Set maximum spending amount</p>
          ) : (
            <></>
          )}
        </div>

        <div>
          <ModalDropDownMenu
            isColorTag={true}
            label="Color Tag"
            tagColor={selectedColorTag?.theme ?? ""}
            initialValue={selectedColorTag?.name ?? ""}
            content={colorTagContent ?? []}
            toggleMenu={() => {
              setBudgetModalColorTagError(false);
              toggleMenu(1);
            }}
          />

          {budgetModalColorTagError ? (
            <p className="error-text">Select a color tag</p>
          ) : (
            <></>
          )}
        </div>
      </form>

      <MainButton onTap={handleBudgetCard} disabled={false}>
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
      closeModal();
    }
  }

  async function addNewBudgetItem() {
    try {
      await addBudgetHandler({
        category: selectedBudgetCategory,
        maximum: Number(maxSpending),
        theme: selectedColorTag!.theme,
      });

      // (Optional) Reset form fields or close modal here
    } catch (error) {
      console.error("Failed to add budget item:", error);
    }
  }

  async function editExistingBudgetItem() {
    if (!budgetToEdit?.id) return;

    try {
      await updateBudgetHandler(budgetToEdit.id, {
        category: selectedBudgetCategory,
        maximum: Number(maxSpending),
        theme: selectedColorTag!.theme,
      });

      // Close modal or reset fields here
    } catch (err) {
      console.error("Failed to update budget item:", err);
    }
  }

  function isValidFormData() {
    const validMaxSpending = Number(maxSpending) > 0;

    const validBudgetCategory = selectedBudgetCategory.length > 0;

    const validColorTag = selectedColorTag.theme !== "transparent";

    if (!validBudgetCategory) {
      setBudgetModalBudgetCategoryError(true);
    }
    if (!validMaxSpending) {
      setBudgetModalMaxSpendingError(true);
    }
    if (!validColorTag) {
      setBudgetModalColorTagError(true);
    }
    return validMaxSpending && validBudgetCategory && validColorTag;
  }

  function closeModal() {
    toastService.closeModal(ModalId.budgetModal);
    resetBudgetModalData();
  }

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".modal-drop-down-menu",
      ".modal-drop-down-menu-content",
    );
  }
};
