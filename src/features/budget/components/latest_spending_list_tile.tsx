import "./css/latest_spending_list_tile.css";
import AvatarImage from "../../shared/components/avatar_image";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";

export const LatestSpendingListTile = () => (
  <div className="latest-spending-list-tile-main">
    {/* avatar image circle */}
    <div id="left-side">
      <AvatarImage image={placeHolderAvatar} />
      <p>Transaction Name</p>
    </div>
    {/* amount date section */}
    <div id="right-side">
      <p style={{}}>-$5.00</p>
      <p style={{ fontWeight: "normal", color: "#696868" }}>11 Aug 2024</p>
    </div>
  </div>
);
