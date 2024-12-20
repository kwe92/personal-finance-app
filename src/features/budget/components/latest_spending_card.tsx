import OverviewSectionHeader from "../../overview/components/overview_section_header";
import { Divider } from "../../shared/components/divider";
import { LatestSpendingListTile } from "./latest_spending_list_tile";

// TODO: move to feature/shared folder along with associated css

// TODO: remove inline css

export const LatestSpendingCard = (): JSX.Element => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      padding: "24px",
      borderRadius: "16px",
      backgroundColor: "#F8F4F0",
      gap: "16px",
    }}
  >
    <OverviewSectionHeader
      title="Latest Spending"
      buttonLabel="See All"
      onTap={() => {
        // TODO: implement
      }}
    />

    {/* List tile section */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <LatestSpendingListTile />

      {/* may want to use a lighter line color */}

      <Divider style={{ backgroundColor: "#cac7c7" }} />

      <LatestSpendingListTile />

      <Divider style={{ backgroundColor: "#cac7c7" }} />

      <LatestSpendingListTile />
    </div>
  </div>
);
