import { createContext, useContext, useEffect, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import { Divider } from "../../shared/components/divider";
import { ColorTagDropDownItem } from "../../shared/models/colored_tag_drop_down_item";
import { useBudgetData } from "../../shared/context/budget_context";
import Budget from "../../shared/models/budget";
import { colorTagData } from "../../../app/constants/constants";
import { ColorTagDropdownItem } from "../../shared/components/color_tag_drop_down_item";

interface BudgetViewContextInterface {
  selectedBudgetCategory: string;
  maxSpending: string;
  selectedColorTag: ColorTagDropDownItem;
  editBudet: boolean;
  budgetToEdit: BudgetData;
  budgetToDelete: BudgetData;
  categoryContent: JSX.Element[];
  colorTagContent: JSX.Element[];
  budgetColorTags: ColorTagDropDownItem[];
  setSelectedBudgetCategory: Function;
  setMaxSpending: Function;
  setSelectedColorTag: Function;
  setEditBudget: Function;
  setBudgetToEdit: Function;
  setBudgetToDelete: Function;
  resetBudgetModalData: Function;
}

const defaultColorTag = new ColorTagDropDownItem({
  name: "",
  theme: "transparent",
  isInUse: false,
});

const defaultBudget = new Budget({
  category: "",
  maximum: 0,
  theme: "",
  createdAt: "",
  updatedAt: "",
});

// create context with required default values
const BudgetViewContext = createContext<BudgetViewContextInterface>({
  selectedBudgetCategory: "",
  maxSpending: "",
  selectedColorTag: defaultColorTag,
  editBudet: false,
  budgetToEdit: defaultBudget,
  budgetToDelete: defaultBudget,
  categoryContent: [],
  colorTagContent: [],
  budgetColorTags: [],
  setSelectedBudgetCategory: () => {},
  setMaxSpending: () => {},
  setSelectedColorTag: () => {},
  setEditBudget: () => {},
  setBudgetToEdit: () => {},
  setBudgetToDelete: () => {},
  resetBudgetModalData: () => {},
});

const BudgetViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  // create state variables and their associated set state functions
  const [selectedBudgetCategory, setSelectedBudgetCategory] =
    useState<string>("");

  // TODO: maxSpending should be a number and not a string, may require parsing somewhere in the code
  const [maxSpending, setMaxSpending] = useState<string>("");

  const [selectedColorTag, setSelectedColorTag] =
    useState<ColorTagDropDownItem>(defaultColorTag);

  const { budgets } = useBudgetData();

  const [editBudet, setEditBudget] = useState<boolean>(false);

  const [budgetToEdit, setBudgetToEdit] = useState<BudgetData>(defaultBudget);

  const [budgetToDelete, setBudgetToDelete] =
    useState<BudgetData>(defaultBudget);

  // transaction categories that are already in use to budget
  const currentBudgetCategories = new Set(
    budgets?.map((budget) => budget.category)
  );

  // unique transaction categories
  const UniqueCategoryList = Array.from(
    new Set(transactions?.map((transaction) => transaction.category))
  );

  // filter out budget categories already in use
  const filteredCategoryList = UniqueCategoryList.filter(
    (category) => !currentBudgetCategories.has(category)
  );

  // sort categories alphabetically
  filteredCategoryList.sort((a, b) => a.localeCompare(b));

  const alreadyUsedColorTags = new Set(budgets?.map((budget) => budget.theme));

  const budgetColorTags = colorTagData.map((json) =>
    ColorTagDropDownItem.fromJSON(json)
  );

  // mark color as used if in the list of budgets
  budgetColorTags.forEach((colorTagItem) => {
    if (alreadyUsedColorTags?.has(colorTagItem.theme)) {
      colorTagItem.isInUse = true;
    }
  });

  budgetColorTags.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(
    () =>
      // set initial budget card data values
      resetBudgetModalData(),
    []
  );

  /**
   * Set budget card data to default values.
   */
  function resetBudgetModalData() {
    setSelectedBudgetCategory("");
    setSelectedColorTag(defaultColorTag);
    setMaxSpending("");
    setBudgetToEdit(defaultBudget);
    setBudgetToDelete(defaultBudget);
    setEditBudget(false);
  }

  const categoryContent = filteredCategoryList?.map((category, i) => (
    <div>
      <li
        key={i}
        style={{
          padding: "12px 0 12px 0",
          // TODO: figure out why selectedBudgetCategory === category messes up hovering over li element
          fontWeight: selectedBudgetCategory === category ? "bold" : "normal",
          cursor: "pointer",
        }}
        onClick={() => setSelectedBudgetCategory(category)}
      >
        {category}
      </li>
      {filteredCategoryList.length - 1 !== i ? <Divider /> : <></>}
    </div>
  ));

  const colorTagContent = budgetColorTags?.map((colorTag, i) => (
    <div>
      <li
        key={i}
        style={{
          padding: "12px 0 12px 0",
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
      {budgetColorTags.length - 1 !== i ? <Divider /> : <></>}
    </div>
  ));

  return (
    <BudgetViewContext.Provider
      // override default context default values
      value={{
        selectedBudgetCategory,
        maxSpending,
        selectedColorTag,
        editBudet,
        budgetToEdit,
        budgetToDelete,
        categoryContent,
        colorTagContent,
        budgetColorTags,
        setSelectedBudgetCategory,
        setMaxSpending,
        setSelectedColorTag,
        setEditBudget,
        setBudgetToEdit,
        setBudgetToDelete,
        resetBudgetModalData,
      }}
    >
      {children}
    </BudgetViewContext.Provider>
  );
};

const useBudgetViewData = () => useContext(BudgetViewContext);

export { BudgetViewProvider, useBudgetViewData };
