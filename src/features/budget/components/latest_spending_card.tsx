import "./css/latest_spending_card.css";
import OverviewSectionHeader from "../../overview/components/overview_section_header";
import { Divider } from "../../shared/components/divider";
import { LatestSpendingListTile } from "./latest_spending_list_tile";
import { useNavigate } from "react-router";
import { useTransactionFilterData } from "../../shared/context/transaction_filter_context";

export const LatestSpendingCard = ({
  transactions,
}: {
  transactions: TransactionData[];
}): JSX.Element => {
  const navigate = useNavigate();

  const { setCategory } = useTransactionFilterData();

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
          if (transactions.length > 0) {
            setCategory(transactions[0].category);
            navigate("/home/Transactions");
          } else {
            navigate("/home/Transactions");
          }
        }}
      />

      {/* List tile section */}
      <div className="latest-spending-card-list-tile-section">
        {latestSpendingListTiles}
      </div>
    </div>
  );
};
