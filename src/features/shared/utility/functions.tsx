import { format as dateFormater } from "date-fns";

function isPositive(number: number) {
  return number > 0;
}

type SortOrder = "ascending" | "descending" | "asc" | "desc";

function formatDate(date: string, format?: string): string {
  const formatedDate = dateFormater(Date.parse(date), format ?? "dd-MMM-yyyy");
  return formatedDate;
}

function sortByDate(
  a: DateObject,
  b: DateObject,
  order: SortOrder = "desc"
): number {
  const aDate = new Date(a.date);

  const bDate = new Date(b.date);

  switch (order) {
    case "ascending":
    case "asc":
      if (aDate < bDate) {
        return -1;
      }
      return 1;

    case "descending":
    case "desc":
      if (aDate > bDate) {
        return -1;
      }
      return 1;
  }
}

function pctTotal(amount: number, total: number): number {
  // const percentOfTotal = (amount / total) * 100;

  const percentOfTotal = ((amount * 100) / (total * 100)) * 100;

  return percentOfTotal;
}

/**
 *
 * @param date1
 *
 * @param date2
 *
 * @returns The difference in days between date1 and date2.
 *
 * A positive return value indicates date1 will be n number of days ahead of date2.
 *
 * A negative return value indicates date2 will be n number of days ahead of date1.
 *
 * Note: only the day, month, and year will be considered.
 *
 */
function getDaysDifference(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

  // ensure dates are in the same format
  date1 = new Date(date1.toDateString());

  date2 = new Date(date2.toDateString());

  // convert dates to milliseconds
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  // calculate the difference in milliseconds
  const differenceMs = date1Ms - date2Ms;

  const differenceInDays = Math.round(differenceMs / oneDay);

  return differenceInDays;
}

function sortTransactions(
  filteredTransactions: TransactionData[],
  sortBy: SortCategory
) {
  switch (sortBy) {
    case "Latest":
      return filteredTransactions.sort((a, b) => sortByDate(a, b));

    case "Oldest":
      return filteredTransactions.sort((a, b) => sortByDate(a, b, "asc"));

    case "A to Z":
      return filteredTransactions?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    case "Z to A":
      return filteredTransactions?.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

    case "Highest":
      return filteredTransactions?.sort((a, b) => {
        if (a.amount > b.amount) {
          return -1;
        }
        return 1;
      });

    case "Lowest":
      return filteredTransactions?.sort((a, b) => {
        if (a.amount < b.amount) {
          return -1;
        }
        return 1;
      });

    default:
      return filteredTransactions ?? [];
  }
}

function getBillCategory(bill: TransactionData): RecurringBillCategory {
  const now = new Date(Date.now());

  const billDate = new Date(bill.date);

  const differenceInDays = getDaysDifference(now, billDate);

  if (differenceInDays > -8 && differenceInDays <= 0) {
    return "due";
  }

  if (differenceInDays < -8) {
    return "upcoming";
  }

  return "paid";
}

function billsByCategory(
  recurringBills: TransactionData[],
  recurringBillCategory: RecurringBillCategory
): TransactionData[] {
  return recurringBills.filter((bill) => {
    const now = new Date(Date.now());

    const billDate = new Date(bill.date);

    const differenceInDays = getDaysDifference(now, billDate);

    switch (recurringBillCategory) {
      case "paid":
        return differenceInDays > 0;

      case "upcoming":
        return differenceInDays < -8;

      case "due":
        return differenceInDays > -8 && differenceInDays <= 0;
    }
  });
}

function sumOfBills(bills: TransactionData[]): number {
  return Math.abs(
    bills.reduce((accumulator, bill) => {
      return accumulator + bill.amount;
    }, 0)
  );
}

/**
 *
 * @param value1 the first operand.
 * @param value2 the second operand.
 * @param operator the addition or subtraction operator.
 * @returns value1 plus or minus value2 depending on the chosen arithmatic operator.
 */

function currencyArithmetic(
  value1: number,
  value2: number,
  operator: ArithmeticOperator
): number {
  const shiftedValue1 = value1 * 100;

  const shiftedValue2 = value2 * 100;

  var result: number;

  switch (operator) {
    case "add":
      result = (shiftedValue1 + shiftedValue2) / 100;
      return result;

    case "addition":
      result = (shiftedValue1 + shiftedValue2) / 100;
      return result;

    case "sub":
      result = (shiftedValue1 - shiftedValue2) / 100;
      return result;

    case "subtraction":
      result = (shiftedValue1 - shiftedValue2) / 100;
      return result;

    default:
      return -1;
  }
}

function parseStringToCurrency(amount: string) {
  const splitAmount = amount.split(".");

  const dollars = splitAmount[0];

  var cents: string = "";

  var total: string = "";

  if (splitAmount.length > 1) {
    cents = splitAmount[1]?.substring(0, 2);

    total = `${dollars}.${cents}`;
  } else {
    total = dollars;
  }

  return total;
}

export {
  isPositive,
  formatDate,
  sortByDate,
  pctTotal,
  getDaysDifference,
  sortTransactions,
  getBillCategory,
  billsByCategory,
  sumOfBills,
  currencyArithmetic,
  parseStringToCurrency,
};
