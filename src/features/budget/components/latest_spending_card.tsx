import "./css/latest_spending_card.css";
import OverviewSectionHeader from "../../overview/components/overview_section_header";
import { Divider } from "../../shared/components/divider";
import { LatestSpendingListTile } from "./latest_spending_list_tile";

export const LatestSpendingCard = ({
  transactions,
}: {
  transactions: TransactionData[];
}): JSX.Element => {
  // grab up to the latest three transactions but may contain less than three and should always contain atleast one
  const latestThreeTransactions = transactions.slice(0, 3);

  const latestSpendingListTiles = latestThreeTransactions.map(
    (transaction, i) => (
      <>
        <LatestSpendingListTile transaction={transaction} />
        {latestThreeTransactions.length - 1 !== i ? (
          <Divider style={{ backgroundColor: "#cac7c7" }} />
        ) : (
          <></>
        )}
      </>
    )
  );
  return (
    <div className="latest-spending-card-main">
      <OverviewSectionHeader
        title="Latest Spending"
        buttonLabel="See All"
        onTap={() => {
          // TODO: implement the ability to navigate to the transactions view with the transactions filtered based on the category type
        }}
      />

      {/* List tile section */}
      <div className="latest-spending-card-list-tile-section">
        {latestSpendingListTiles}
      </div>
    </div>
  );
};
