import "./css/latest_spending_card.css";
import OverviewSectionHeader from "../../overview/components/overview_section_header";
import { Divider } from "../../shared/components/divider";
import { LatestSpendingListTile } from "./latest_spending_list_tile";

export const LatestSpendingCard = ({
  transactions,
}: {
  transactions: TransactionData[];
}): JSX.Element => (
  <div className="latest-spending-card-main">
    <OverviewSectionHeader
      title="Latest Spending"
      buttonLabel="See All"
      onTap={() => {
        // TODO: implement
      }}
    />

    {/* List tile section */}
    <div className="latest-spending-card-list-tile-section">
      <LatestSpendingListTile transaction={transactions.at(0)!} />

      {/* may want to use a lighter line color */}

      <Divider style={{ backgroundColor: "#cac7c7" }} />

      <LatestSpendingListTile transaction={transactions.at(1)!} />

      <Divider style={{ backgroundColor: "#cac7c7" }} />

      <LatestSpendingListTile transaction={transactions.at(2)!} />
    </div>
  </div>
);
