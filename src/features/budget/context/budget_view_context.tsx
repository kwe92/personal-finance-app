import { createContext, useContext, useEffect, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import { Divider } from "../../shared/components/divider";
import { ColorTagDropDownItem } from "../models/colored_tag_drop_down_item";
import { BudgetTagDropdownItem } from "../components/budget_tag_drop_down_item";
import { useBudgetData } from "../../shared/context/budget_context";
import Budget from "../../shared/models/budget";
import { BudgetViewModel } from "../budget_view_model";

interface BudgetViewContextInterface {
  selectedBudgetCategory: string;
  maxSpending: string;
  selectedColorTag: ColorTagDropDownItem;
  editBudet: boolean;
  budgetToEdit: BudgetData;
  categoryContent: JSX.Element[];
  colorTagContent: JSX.Element[];
  budgetColorTags: ColorTagDropDownItem[];
  setSelectedBudgetCategory: Function;
  setMaxSpending: Function;
  setSelectedColorTag: Function;
  setEditBudget: Function;
  setBudgetToEdit: Function;
  resetBudgetCardData: Function;
}

const defaultColorTag = new ColorTagDropDownItem({
  name: "",
  theme: "transparent",
  isInUse: false,
});

const defaultBudgetToEdit = new Budget({
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
  budgetToEdit: defaultBudgetToEdit,
  categoryContent: [],
  colorTagContent: [],
  budgetColorTags: [],
  setSelectedBudgetCategory: () => {},
  setMaxSpending: () => {},
  setSelectedColorTag: () => {},
  setEditBudget: () => {},
  setBudgetToEdit: () => {},
  resetBudgetCardData: () => {},
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

  const [budgetToEdit, setBudgetToEdit] =
    useState<BudgetData>(defaultBudgetToEdit);

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

  const budgetColorTags = budgetColorTagData.map((json) =>
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
      resetBudgetCardData(),
    []
  );

  /**
   * Set budget card data to default values.
   */
  function resetBudgetCardData() {
    setSelectedBudgetCategory("");
    setSelectedColorTag(defaultColorTag);
    setMaxSpending("");
    setBudgetToEdit(defaultBudgetToEdit);
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
        <BudgetTagDropdownItem
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
        categoryContent,
        colorTagContent,
        budgetColorTags,
        setSelectedBudgetCategory,
        setMaxSpending,
        setSelectedColorTag,
        setEditBudget,
        setBudgetToEdit,
        resetBudgetCardData,
      }}
    >
      {children}
    </BudgetViewContext.Provider>
  );
};

const useBudgetViewData = () => useContext(BudgetViewContext);

export { BudgetViewProvider, useBudgetViewData };

const budgetColorTagData = [
  new Map([
    ["name", "Green"],
    ["theme", "#277C78"],
  ]),
  new Map([
    ["name", "Yellow"],
    ["theme", "#F2CDAC"],
  ]),
  new Map([
    ["name", "Cyan"],
    ["theme", "#82C9D7"],
  ]),
  new Map([
    ["name", "Navy"],
    ["theme", "#201F24"],
  ]),
  new Map([
    ["name", "Red"],
    ["theme", "#C94736"],
  ]),
  new Map([
    ["name", "Purple"],
    ["theme", "#826CB0"],
  ]),
  new Map([
    ["name", "Turquoise"],
    ["theme", "#597C7C"],
  ]),
  new Map([
    ["name", "Brown"],
    ["theme", "#93674F"],
  ]),
  new Map([
    ["name", "Magenta"],
    ["theme", "#934F6F"],
  ]),
  new Map([
    ["name", "Blue"],
    ["theme", "#3F82B2"],
  ]),
  new Map([
    ["name", "Navy Grey"],
    ["theme", "#97A0AC"],
  ]),
  new Map([
    ["name", "Army Green"],
    ["theme", "#7F9161"],
  ]),
  new Map([
    ["name", "Pink"],
    ["theme", "#fb928e"],
  ]),
  new Map([
    ["name", "Gold"],
    ["theme", "#CAB361"],
  ]),
  new Map([
    ["name", "Orange"],
    ["theme", "#BE6C49"],
  ]),
];
