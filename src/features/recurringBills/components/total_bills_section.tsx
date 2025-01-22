import "./css/total_bills_section.css";
import recurringBillIcon from "../../../assets/images/icon-recurring-bills.svg";
import { useRecurringBillsViewData } from "../context/recurring_bills_context";
import { sumOfBills } from "../../shared/utility/functions";

export const TotalBills = (): JSX.Element => {
  const { recurringBills } = useRecurringBillsViewData();

  const totalBills = sumOfBills(recurringBills);

  return (
    <div className="total-bills-card">
      <img src={recurringBillIcon} />
      <div className="total-bills-card-content">
        <p>total Bills</p>
        <p>${totalBills.toFixed(2)}</p>
      </div>
    </div>
  );
};
