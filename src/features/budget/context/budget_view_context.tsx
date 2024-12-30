import { createContext, useContext, useEffect, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import { Divider } from "../../shared/components/divider";
import { ColorTagDropDownItem } from "../models/colored_tag_drop_down_item";
import { BudgetTagDropdownItem } from "../components/budget_tag_drop_down_item";
import { useBudgetData } from "../../shared/context/budget_context";

// TODO: add ability to submit data into a BudgetCard

const BudgetViewContext = createContext<{
  selectedBudgetCategory: string;
  maxSpending: string;
  selectedColorTag: ColorTagDropDownItem | undefined;
  categoryContent: JSX.Element[];
  colorTagContent: JSX.Element[];
  setSelectedBudgetCategory: Function;
  setMaxSpending: Function;
  setSelectedColorTag: Function;
}>({
  selectedBudgetCategory: "",
  maxSpending: "",
  selectedColorTag: undefined,
  categoryContent: [],
  colorTagContent: [],
  setSelectedBudgetCategory: () => {},
  setMaxSpending: () => {},
  setSelectedColorTag: () => {},
});

// TODO: continue working on the BudgetViewProvider
const BudgetViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  const [selectedBudgetCategory, setSelectedBudgetCategory] =
    useState<string>("");

  const [maxSpending, setMaxSpending] = useState<string>("");

  const [selectedColorTag, setSelectedColorTag] =
    useState<ColorTagDropDownItem>();

  const { budgets } = useBudgetData();

  var categoryList = Array.from(
    new Set(transactions?.map((transaction) => transaction.category))
  );

  // TODO: filter out budget categories in use already

  // categoryList = categoryList.filter(() =>
  //   budgets!.some((alreadyUsedCategory) =>
  //     categoryList?.some((availableCategory) => {
  //       if (availableCategory.includes(alreadyUsedCategory.category)) {
  //         return false;
  //       }
  //       return true;
  //     })
  //   )
  // );

  categoryList.sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    const initialColorTag: ColorTagDropDownItem | undefined =
      budgetColorTags.filter((budgetColorTag) => {
        return budgetColorTag.isInUse == false;
      })[0];

    // set initial value to be the first element in the list
    setSelectedBudgetCategory(categoryList[0]);

    // set initial value to be the first element in the list
    setSelectedColorTag(initialColorTag);
  }, []);

  const categoryContent = categoryList?.map((category, i) => (
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
      {categoryList.length - 1 !== i ? <Divider /> : <></>}
    </div>
  ));

  const alreadyUsedColorTags = budgets?.map((budget) => {
    return budget.theme;
  });

  const budgetColorTags = budgetColorTagData.map((json) =>
    ColorTagDropDownItem.fromJSON(json)
  );

  // mark color as used if in the list of budgets
  budgetColorTags.some((colorTag) =>
    alreadyUsedColorTags?.some((colorTagInUse) => {
      if (JSON.stringify(colorTag).includes(colorTagInUse)) {
        colorTag.isInUse = true;
      }
    })
  );

  budgetColorTags.sort((a, b) => a.name.localeCompare(b.name));

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
      value={{
        selectedBudgetCategory,
        maxSpending,
        selectedColorTag,
        categoryContent,
        colorTagContent,
        setSelectedBudgetCategory,
        setMaxSpending,
        setSelectedColorTag,
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

// function containsAnyString(strings: string[], objects: any[]): boolean {
//   return objects.some((obj) =>
//     strings.some((str) => JSON.stringify(obj).includes(str))
//   );
// }
