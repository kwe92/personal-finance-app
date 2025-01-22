import "./css/recurring_bills_list_tile.css";

import AvatarImage from "../../shared/components/avatar_image";
import billPaidIcon from "../../../assets/images/icon-bill-paid.svg";
import billDueIcon from "../../../assets/images/icon-bill-due.svg";

import { isPositive } from "../../shared/utility/functions";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";
import { RecurringBillsViewModel } from "../recurring_bills_view_model";

export const RecurringBillsListTile = ({
  bill,
  billStatus,
}: {
  bill: TransactionData;
  billStatus: RecurringBillCategory;
}): JSX.Element => {
  const isPositiveAmount = isPositive(bill?.amount ?? 0.0);

  const transactionAmount = Math.abs(bill?.amount ?? 0.0).toFixed(2);

  const dueDate = RecurringBillsViewModel.dueDate(bill);

  return (
    <div className="recurring-bills-list-tile-main">
      <div className="transaction-avatar-name">
        <AvatarImage image={placeHolderAvatar} />
        <p
          style={{
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {bill?.name}
        </p>
      </div>

      <div className="recurring-bills-list-tile-date-amount-container">
        <div className="recurring-bills-list-tile-date">
          {dueDate}
          {billStatus === "paid" || billStatus === "due" ? (
            <img
              src={billStatus === "paid" ? billPaidIcon : billDueIcon}
              alt="billStatusIcon"
            />
          ) : (
            <></>
          )}
        </div>
        <div
          className="recurring-bills-list-tile-amount"
          style={{
            color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
          }}
        >
          {isPositiveAmount
            ? `+$${transactionAmount}`
            : `-$${transactionAmount}`}
        </div>
      </div>
    </div>
  );
};
