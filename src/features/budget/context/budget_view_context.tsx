import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import { ColorTagDropDownItem } from "../../shared/models/colored_tag_drop_down_item";
import { useBudgetData } from "../../shared/context/budget_context";
import { colorTagData } from "../../../app/constants/constants";
import { useFormErrorData } from "../../shared/context/form_error_context";

interface BudgetViewContextInterface {
  selectedBudgetCategory: string;
  selectedBudgetPeriod: BudgetPeriod;
  startDate: string;
  maxSpending: string;
  selectedColorTag: ColorTagDropDownItem;
  editBudget: boolean;
  budgetToEdit: BudgetData;
  budgetToDelete: BudgetData;
  filteredCategoryList: string[];
  budgetColorTags: ColorTagDropDownItem[];
  setSelectedBudgetCategory: (category: string) => void;
  setSelectedBudgetPeriod: (period: BudgetPeriod) => void;
  setStartDate: (date: string) => void;
  setMaxSpending: (spending: string) => void;
  setSelectedColorTag: (colorTag: ColorTagDropDownItem) => void;
  setEditBudget: (isEdit: boolean) => void;
  setBudgetToEdit: (budget: BudgetData) => void;
  setBudgetToDelete: (budget: BudgetData) => void;
  resetBudgetModalData: () => void;
  populateEditForm: (budget: BudgetData) => void;
}

const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0];
};

const defaultColorTag = new ColorTagDropDownItem({
  name: "",
  theme: "transparent",
  isInUse: false,
});

const defaultBudget: BudgetData = {
  category: "",
  maximum: 0,
  theme: "",
  period: "monthly",
  startDate: getTodayString(),
  endDate: getTodayString(),
  createdAt: "",
  updatedAt: "",
};

// Pure helper: Extract available categories not currently budgeted
const getFilteredCategories = (
  budgets: BudgetData[] = [],
  transactions: TransactionData[] = [],
): string[] => {
  const currentBudgetCategories = new Set(
    budgets.map((budget) => budget.category),
  );
  const uniqueCategoryList = Array.from(
    new Set(transactions.map((transaction) => transaction.category) ?? []),
  );

  return uniqueCategoryList
    .filter((category) => !currentBudgetCategories.has(category))
    .sort((a, b) => a.localeCompare(b));
};

// Pure helper: Extract and format available budget color tags
const getBudgetColorTags = (
  budgets: BudgetData[] = [],
): ColorTagDropDownItem[] => {
  const alreadyUsedColorTags = new Set(budgets.map((budget) => budget.theme));

  return colorTagData
    .map((json) => {
      const item = ColorTagDropDownItem.fromJSON(json);
      if (alreadyUsedColorTags.has(item.theme)) {
        item.isInUse = true;
      }
      return item;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

const BudgetViewContext = createContext<BudgetViewContextInterface>({
  selectedBudgetCategory: "",
  selectedBudgetPeriod: "monthly",
  startDate: getTodayString(),
  maxSpending: "",
  selectedColorTag: defaultColorTag,
  editBudget: false,
  budgetToEdit: defaultBudget,
  budgetToDelete: defaultBudget,
  filteredCategoryList: [],
  budgetColorTags: [],
  setSelectedBudgetCategory: () => {},
  setSelectedBudgetPeriod: () => {},
  setStartDate: () => {},
  setMaxSpending: () => {},
  setSelectedColorTag: () => {},
  setEditBudget: () => {},
  setBudgetToEdit: () => {},
  setBudgetToDelete: () => {},
  resetBudgetModalData: () => {},
  populateEditForm: () => {},
});

const BudgetViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();
  const { budgets } = useBudgetData();
  const { resetBudgetModalErrors } = useFormErrorData();

  const [selectedBudgetCategory, setSelectedBudgetCategory] =
    useState<string>("");
  const [selectedBudgetPeriod, setSelectedBudgetPeriod] =
    useState<BudgetPeriod>("monthly");
  const [startDate, setStartDate] = useState<string>(getTodayString());
  const [maxSpending, setMaxSpending] = useState<string>("");
  const [selectedColorTag, setSelectedColorTag] =
    useState<ColorTagDropDownItem>(defaultColorTag);
  const [editBudget, setEditBudget] = useState<boolean>(false);
  const [budgetToEdit, setBudgetToEdit] = useState<BudgetData>(defaultBudget);
  const [budgetToDelete, setBudgetToDelete] =
    useState<BudgetData>(defaultBudget);

  // Clean derived state calculations
  const filteredCategoryList = useMemo(
    () => getFilteredCategories(budgets, transactions),
    [budgets, transactions],
  );

  const budgetColorTags = useMemo(() => getBudgetColorTags(budgets), [budgets]);

  const resetBudgetModalData = () => {
    setSelectedBudgetCategory("");
    setSelectedBudgetPeriod("monthly");
    setStartDate(getTodayString());
    setSelectedColorTag(defaultColorTag);
    setMaxSpending("");
    setBudgetToEdit(defaultBudget);
    setBudgetToDelete(defaultBudget);
    setEditBudget(false);
    resetBudgetModalErrors();
  };

  const populateEditForm = (budget: BudgetData) => {
    setEditBudget(true);
    setBudgetToEdit(budget);
    setSelectedBudgetCategory(budget.category);
    setSelectedBudgetPeriod(budget.period ?? "monthly");
    setStartDate(budget.startDate ?? getTodayString());
    setMaxSpending(budget.maximum.toString());
    const matchingTag = budgetColorTags.find(
      (colorTag) => colorTag.theme === budget.theme,
    );
    setSelectedColorTag(matchingTag ?? defaultColorTag);
  };

  useEffect(() => {
    resetBudgetModalData();
  }, []);

  const value = useMemo(
    () => ({
      selectedBudgetCategory,
      selectedBudgetPeriod,
      startDate,
      maxSpending,
      selectedColorTag,
      editBudget,
      budgetToEdit,
      budgetToDelete,
      filteredCategoryList,
      budgetColorTags,
      setSelectedBudgetCategory,
      setSelectedBudgetPeriod,
      setStartDate,
      setMaxSpending,
      setSelectedColorTag,
      setEditBudget,
      setBudgetToEdit,
      setBudgetToDelete,
      resetBudgetModalData,
      populateEditForm,
    }),
    [
      selectedBudgetCategory,
      selectedBudgetPeriod,
      startDate,
      maxSpending,
      selectedColorTag,
      editBudget,
      budgetToEdit,
      budgetToDelete,
      filteredCategoryList,
      budgetColorTags,
    ],
  );

  return (
    <BudgetViewContext.Provider value={value}>
      {children}
    </BudgetViewContext.Provider>
  );
};

const useBudgetViewData = () => useContext(BudgetViewContext);

export { BudgetViewProvider, useBudgetViewData };
