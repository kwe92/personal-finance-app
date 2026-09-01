import "../../shared/css/base_modal.css";
import "../../shared/css/form-theme.css";
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
import { ColorTagDropdownItem } from "../../shared/components/color_tag_drop_down_item";
import { Divider } from "../../shared/components/divider";

const periodOptions: { label: string; value: BudgetPeriod }[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Biweekly", value: "biweekly" },
  { label: "Monthly", value: "monthly" },
];

export const BudgetModal = (): JSX.Element => {
  const toastService = ToastService.getInstance();
  const { addBudgetHandler, updateBudgetHandler } = useBudgetData();

  const {
    filteredCategoryList,
    budgetColorTags,
    selectedBudgetCategory,
    setSelectedBudgetCategory,
    selectedBudgetPeriod,
    setSelectedBudgetPeriod,
    startDate,
    setStartDate,
    selectedColorTag,
    setSelectedColorTag,
    maxSpending,
    setMaxSpending,
    editBudget,
    budgetToEdit,
    resetBudgetModalData,
  } = useBudgetViewData();

  const {
    budgetModalBudgetCategoryError,
    budgetModalMaxSpendingError,
    budgetModalColorTagError,
    setBudgetModalBudgetCategoryError,
    setBudgetModalMaxSpendingError,
    setBudgetModalColorTagError,
  } = useFormErrorData();

  const categoryContent = filteredCategoryList.map((category, i) => (
    <div key={category}>
      <li
        style={{
          padding: "12px 0 12px 0",
          fontWeight: selectedBudgetCategory === category ? "bold" : "normal",
          cursor: "pointer",
        }}
        onClick={() => setSelectedBudgetCategory(category)}
      >
        {category}
      </li>
      {filteredCategoryList.length - 1 !== i && <Divider />}
    </div>
  ));

  const periodContent = periodOptions.map((option, i) => (
    <div key={option.value}>
      <li
        style={{
          padding: "12px 0 12px 0",
          fontWeight: selectedBudgetPeriod === option.value ? "bold" : "normal",
          cursor: "pointer",
        }}
        onClick={() => setSelectedBudgetPeriod(option.value)}
      >
        {option.label}
      </li>
      {periodOptions.length - 1 !== i && <Divider />}
    </div>
  ));

  const colorTagContent = budgetColorTags.map((colorTag, i) => (
    <div key={colorTag.theme || i}>
      <li
        style={{
          padding: "12px 0 12px 0",
          cursor: colorTag.isInUse ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (!colorTag.isInUse) setSelectedColorTag(colorTag);
        }}
      >
        <ColorTagDropdownItem
          name={colorTag.name}
          theme={colorTag.theme}
          isInUse={colorTag.isInUse}
        />
      </li>
      {budgetColorTags.length - 1 !== i && <Divider />}
    </div>
  ));

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

  function isValidFormData() {
    const validMaxSpending = Number(maxSpending) > 0;
    const validBudgetCategory = selectedBudgetCategory.length > 0;
    const validColorTag =
      selectedColorTag.theme !== "transparent" && selectedColorTag.theme !== "";

    if (!validBudgetCategory) setBudgetModalBudgetCategoryError(true);
    if (!validMaxSpending) setBudgetModalMaxSpendingError(true);
    if (!validColorTag) setBudgetModalColorTagError(true);

    return validMaxSpending && validBudgetCategory && validColorTag;
  }

  async function addNewBudgetItem() {
    try {
      await addBudgetHandler({
        category: selectedBudgetCategory,
        maximum: Number(maxSpending),
        theme: selectedColorTag.theme,
        period: selectedBudgetPeriod,
        startDate: startDate,
      });
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
        theme: selectedColorTag.theme,
        period: selectedBudgetPeriod,
        startDate: startDate,
      });
    } catch (err) {
      console.error("Failed to update budget item:", err);
    }
  }

  async function handleBudgetCard() {
    if (isValidFormData()) {
      if (editBudget) {
        await editExistingBudgetItem();
      } else {
        await addNewBudgetItem();
      }
      closeModal();
    }
  }

  const currentPeriodLabel =
    periodOptions.find((p) => p.value === selectedBudgetPeriod)?.label ??
    "Monthly";

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{!editBudget ? "Add New Budget" : "Edit Budget"}</p>
        <CloseModalButton onTap={closeModal} />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        {!editBudget
          ? "Choose a category, period, and start date to set a spending budget."
          : "As your budgets change, feel free to update your spending limits."}
      </p>

      <form className="form-theme" onSubmit={(e) => e.preventDefault()}>
        <div>
          <ModalDropDownMenu
            label="Budget Category"
            content={categoryContent}
            initialValue={selectedBudgetCategory}
            toggleMenu={() => {
              setBudgetModalBudgetCategoryError(false);
              toggleMenu(0);
            }}
          />
          {budgetModalBudgetCategoryError && (
            <p className="error-text">Select a budget category</p>
          )}
        </div>

        <div>
          <ModalDropDownMenu
            label="Budget Period"
            content={periodContent}
            initialValue={currentPeriodLabel}
            toggleMenu={() => toggleMenu(1)}
          />
        </div>

        <div>
          <TextFormField
            name="startDate"
            label="Start Date"
            type="date"
            value={startDate}
            placeholder="YYYY-MM-DD"
            onChange={(event) => setStartDate(event.target.value)}
          />
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
          {budgetModalMaxSpendingError && (
            <p className="error-text">Set maximum spending amount</p>
          )}
        </div>

        <div>
          <ModalDropDownMenu
            isColorTag={true}
            label="Color Tag"
            tagColor={selectedColorTag?.theme ?? ""}
            initialValue={selectedColorTag?.name ?? ""}
            content={colorTagContent}
            toggleMenu={() => {
              setBudgetModalColorTagError(false);
              toggleMenu(2);
            }}
          />
          {budgetModalColorTagError && (
            <p className="error-text">Select a color tag</p>
          )}
        </div>
      </form>

      <MainButton onTap={handleBudgetCard} disabled={false}>
        {!editBudget ? "Add Budget" : "Save Changes"}
      </MainButton>
    </div>
  );
};
