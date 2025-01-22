import { formatDate } from "../shared/utility/functions";

export class RecurringBillsViewModel {
  public constructor() {}

  static dueDate(bill: TransactionData): string {
    // returns the day omitting leading 0 e.g. 05-03-2025 returns 3
    const dateDay: NumberDaysOfMonth = formatDate(
      bill?.date ?? "",
      "d"
    ) as NumberDaysOfMonth;

    var dueDate: string = "";

    const parsedDay =
      dateDay !== "11" && dateDay.length > 1
        ? dateDay.substring(1, 2)
        : dateDay;

    switch (parsedDay) {
      case "1":
        dueDate = `Monthly-${dateDay}st`;
        break;
      case "2":
        dueDate = `Monthly-${dateDay}nd`;
        break;
      case "3":
        dueDate = `Monthly-${dateDay}rd`;
        break;
      default:
        dueDate = `Monthly-${dateDay}th`;
    }

    return dueDate;
  }
}
