import "./css/transaction_list_tile.css";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";
import AvatarImage from "../../shared/components/avatar_image";
import { formatDate, isPositive } from "../../shared/utility/functions";

export const TransactionListTile = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  const isPositiveAmount = isPositive(transaction?.amount ?? 0.0);

  const transactionAmount = Math.abs(transaction?.amount ?? 0.0).toFixed(2);
  return (
    <div className="transaction-list-tile-container">
      <AvatarImage image={placeHolderAvatar} />
      <div className="transaction-list-tile-content">
        <div className="tltc-left">
          <p
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#201F24",
            }}
          >
            {transaction?.name}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#696868",
            }}
          >
            {transaction?.category}
          </p>
        </div>
        <div className="tltc-right">
          <p
            style={{
              color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {isPositiveAmount
              ? `+$${transactionAmount}`
              : `-$${transactionAmount}`}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#696868",
            }}
          >
            {formatDate(transaction?.date ?? "")}
            {/* 29 Aug 2024 */}
          </p>
        </div>
      </div>
    </div>
  );
};
