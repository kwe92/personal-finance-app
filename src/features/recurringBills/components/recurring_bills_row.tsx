import AvatarImage from "../../shared/components/avatar_image";
import billPaidIcon from "../../../assets/images/icon-bill-paid.svg";
import billDueIcon from "../../../assets/images/icon-bill-due.svg";

import { formatDate, isPositive } from "../../shared/utility/functions";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";

// TODO: move inline css to css module for this component

export const RecurringBillsRow = ({
  bill,
  billStatus,
}: {
  bill?: TransactionData;
  billStatus: RecurringBillCategory;
}): JSX.Element => {
  const dateDay = formatDate(bill?.date ?? "", "d");

  const isPositiveAmount = isPositive(bill?.amount ?? 0.0);

  const transactionAmount = Math.abs(bill?.amount ?? 0.0).toFixed(2);

  var dueDate: string = "";

  switch (dateDay) {
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

  return (
    <tr>
      <td className="transaction-avatar-name">
        <AvatarImage image={placeHolderAvatar} />

        {bill?.name}
      </td>

      <td>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "100%",
            fontSize: "16px",
            color: "#277C78",
            gap: "8px",
            // backgroundColor: "orange",
          }}
        >
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
      </td>

      <td
        style={{
          textAlign: "end",
          fontSize: "14px",
          fontWeight: "bold",
          color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
        }}
      >
        {isPositiveAmount ? `+$${transactionAmount}` : `-$${transactionAmount}`}
      </td>
    </tr>
  );
};
