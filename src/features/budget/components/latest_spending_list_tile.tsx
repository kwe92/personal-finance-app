import "./css/latest_spending_list_tile.css";
import AvatarImage from "../../shared/components/avatar_image";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";
import { formatDate } from "../../shared/utility/functions";

export const LatestSpendingListTile = ({
  transaction,
}: {
  transaction: TransactionData;
}) => (
  <div className="latest-spending-list-tile-main">
    {/* avatar image circle */}
    <div id="left-side">
      <AvatarImage image={placeHolderAvatar} />
      <p>{transaction.name}</p>
    </div>
    {/* amount date section */}
    <div id="right-side">
      {/* TODO: ensure positive and negative amounts are the right color */}
      <p style={{}}>${transaction.amount.toFixed(2)}</p>
      <p style={{ fontWeight: "normal", color: "#696868" }}>
        {formatDate(transaction?.date ?? "", "dd MMM yyyy")}
      </p>
    </div>
  </div>
);
