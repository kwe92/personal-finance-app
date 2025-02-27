class ModalId {
  private constructor() {}

  static budgetModal = "budget-modal";

  static potModal = "pot-modal";

  static potTransactionModal = "pot-transaction-modal";

  static deletePotModal = "delete-pot-modal";

  static deleteBudgetModal = "delete-budget-modal";
}

class ModalClassName {
  private constructor() {}

  static cardDropDownMenu = ".card-drop-down-menu";

  static budgetCardDropDown = ".budget-card-dropdown";

  static potCardDropDown = ".pot-card-dropdown";
}

const sortByCategories: SortCategory[] = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const colorTagData = [
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

export { colorTagData, ModalId, ModalClassName, sortByCategories };
