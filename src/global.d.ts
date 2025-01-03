interface TransactionData {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
  }

interface ColorTagDropDownItemData {
  name: string;
  theme: string;
  isInUse: boolean;
}

interface BudgetData {
  category: string;
  maximum: number;
  theme: string;
}

interface DateObject {
  date: string;
}
