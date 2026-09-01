declare module "*.css";

declare module "*.svg";

declare module "*.png";

declare module "*.jpg";

declare module "*.jpeg";

// Interfaces

interface OverviewSummary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
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


// Transaction Interfaces

interface TransactionData {
  id: string;
  avatar?: string; // Optional client-side avatar/icon path
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  type: "expense" | "income" | "transfer";
  frequency?: "weekly" | "biweekly" | "semi_monthly" | "monthly" | "yearly";
  nextDate?: string;
  status?: RecurringBillCategory;
  daysUntilDue?: number;
}
interface TransactionsResponse {
  transactions: TransactionData[];
  summary?: OverviewSummary;
}

// Budget Interfaces
type BudgetPeriod = "weekly" | "biweekly" | "monthly";

interface BudgetData {
  id?: string;
  category: string;
  maximum: number;
  theme: string;
  period: BudgetPeriod;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
  createdAt?: string;
  updatedAt?: string;
}

interface BudgetPayload {
  category: string;
  maximum: number;
  theme: string;
  period: BudgetPeriod;
  startDate: string;
}
// Pot Interfaces
interface PotData {
  id?: string;
  name: string;
  target: number;
  total: number;
  theme: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PotPayload {
  name: string;
  target: number;
  total: number;
  theme: string;
}


interface DateObject {
  date: string;
}

// Preference interfaces
interface UserPreferencesData {
  monthlySpendingTarget: number;
  updatedAt?: string;
}

interface UserPreferencesPayload {
  monthlySpendingTarget: number;
}

// Types as ENUMS
type RecurringBillCategory = "paid" | "upcoming" | "due_soon" | "past_due" | "unknown";

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

type DateRangeOption =
  | "30 Days"
  | "Current Month"
  | "14 days"
  | "7 days"
  | "Custom";


