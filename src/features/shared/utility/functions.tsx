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

export { isPositive, formatDate, sortByDate };
