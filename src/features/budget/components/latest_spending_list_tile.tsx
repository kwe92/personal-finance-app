import AvatarImage from "../../shared/components/avatar_image";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";

// TODO: remove inline css

export const LatestSpendingListTile = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      {/* avatar image circle */}
      <AvatarImage image={placeHolderAvatar} />
      <p style={{ fontSize: "14px", fontWeight: "bold" }}>Transaction Name</p>
      {/* amount date section */}
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: "4px",
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: "bold" }}>-$5.00</p>
      <p style={{ fontSize: "14px", color: "#696868" }}>11 Aug 2024</p>
    </div>
  </div>
);
