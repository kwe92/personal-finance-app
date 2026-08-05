declare module "*.css";

declare module "*.svg";

declare module "*.png";

declare module "*.jpg";

declare module "*.jpeg";

// Interfaces

interface TransactionData {
  id?: string;
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  type: "expense" | "income" | "transfer";
  frequency?: "monthly" | "weekly" | "yearly";
  nextDate?: string;
  status?: "paid" | "upcoming" | "due";
}

interface OverviewSummary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
}

interface TransactionsResponse {
  transactions: TransactionData[];
  summary?: OverviewSummary;
}

interface RecurringBillsResponse {
  recurringBills: TransactionData[];
  summary?: OverviewSummary;
}

interface ColorTagDropDownItemData {
  name: string;
  theme: string;
  isInUse: boolean;
}

interface BudgetData {
  id?: string;
  category: string;
  maximum: number;
  theme: string;
  createdAt: string;
  updatedAt: string;
}

interface DateObject {
  date: string;
}

interface PotData {
  name: string;
  target: number;
  total: number;
  theme: string;
}

// Types

type RecurringBillCategory = "paid" | "upcoming" | "due";

type SortCategory =
  | "Latest"
  | "Oldest"
  | "A to Z"
  | "Z to A"
  | "Highest"
  | "Lowest";

type NumberDaysOfMonth =
| "1"
| "2"
| "3"
| "4"
| "5"
| "6"
| "7"
| "8"
| "9"
| "10"
| "11"
| "12"
| "13"
| "14"
| "15"
| "16"
| "17"
| "18"
| "19"
| "20"
| "21"
| "22"
| "23"
| "24"
| "25"
| "26"
| "27"
| "28"
| "29"
| "30"
| "31";

type ArithmeticOperator = "add" | "addition" | "sub" | "subtraction";


