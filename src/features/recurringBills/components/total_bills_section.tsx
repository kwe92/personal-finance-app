import "./css/total_bills_section.css";
import recurringBillIcon from "../../../assets/images/icon-recurring-bills.svg";

export const TotalBills = (): JSX.Element => {
  // TODO: add mock data and remove hardcoded values
  return (
    <div className="total-bills-card">
      <img src={recurringBillIcon} />
      <div className="total-bills-card-content">
        <p>total Bills</p>
        <p>$384.98</p>
      </div>
    </div>
  );
};
