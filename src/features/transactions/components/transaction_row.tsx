import AvatarImage from "../../shared/components/avatar_image";
import { formatDate, isPositive } from "../../shared/utility/functions";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";

export const TansactionRow = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  const isPositiveAmount = isPositive(transaction?.amount ?? 0.0);

  const transactionAmount = Math.abs(transaction?.amount ?? 0.0).toFixed(2);

  return (
    <tr>
      <td className="transaction-avatar-name">
        <AvatarImage image={placeHolderAvatar} />

        {transaction?.name}
      </td>

      <td style={{ fontSize: "12px", color: "#696868" }}>
        {transaction?.category}
      </td>

      <td style={{ fontSize: "12px", color: "#696868" }}>
        {formatDate(transaction?.date ?? "", "dd MMM yyyy, HH:ss")}
      </td>

      <td
        style={{
          color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
        }}
      >
        {isPositiveAmount ? `+$${transactionAmount}` : `-$${transactionAmount}`}
      </td>
    </tr>
  );
};
