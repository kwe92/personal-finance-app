import { format as dateFormater } from "date-fns";

function isPositive(number: number) {
  return number > 0;
}

function formatDate(date: string, format?: string): string {
  const formatedDate = dateFormater(Date.parse(date), format ?? "dd-MMM-yyyy");
  return formatedDate;
}

export { isPositive, formatDate };
