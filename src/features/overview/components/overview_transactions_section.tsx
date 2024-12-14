import "./css/overview_transactions_section.css";
import "./css/overview_view_shared_styles.css";
import placeHolderAvatar from "../../../assets/images/avatars/green-plate-eatery.jpg";
import * as gaps from "../../../app/constants/reusable";
import OverviewSectionHeader from "./overview_section_header";
import AvatarImage from "../../shared/components/avatar_image";
import useWindowSize from "../../shared/hooks/use_window_size";
import { useTransactionData } from "../../shared/context/transactionContext";
import { useNavigate } from "react-router";
import { Divider } from "../../shared/components/divider";
import { isPositive } from "../../shared/utility/functions";

// TODO: create a dart parser function for transaction date e.g.: 19 Aug 2024

const OverviewTransactionsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const { windowWidth, windowHeight } = useWindowSize();

  const { transactions, isLoading, error } = useTransactionData();

  var transactionListTiles: JSX.Element[];

  if (transactions !== null) {
    transactionListTiles = transactions.map((transaction, i) => {
      return <OverviewTransactionListTile transaction={transaction} />;
    });
  }
  return (
    <>
      {isLoading ? (
        // TODO:ensure loading looks good on any screen | will use shimmer loading effects
        <div
          style={{
            width: "100%",
            height: "100%",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          <h1>testing loading state...</h1>
        </div>
      ) : (
        <div className="overview-transaction-section-main-container">
          <OverviewSectionHeader
            title="Transactions"
            buttonLabel="View All"
            onTap={() => {
              navigate("/home/Transactions");
            }}
          />

          <gaps.GapH8 />

          {transactionListTiles!.at(0)}

          <Divider />

          {transactionListTiles!.at(1)}

          <Divider />

          {transactionListTiles!.at(2)}

          <Divider />

          {transactionListTiles!.at(3)}

          {windowHeight > 930 ? (
            <>
              <Divider />
              {transactionListTiles!.at(4)}
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

const OverviewTransactionListTile = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  const isPositiveAmount = isPositive(transaction?.amount ?? 0.0);

  const transactionAmount = Math.abs(transaction?.amount ?? 0.0).toFixed(2);

  return (
    <div className="overview-transaction-list-tile">
      {/* left side */}
      <div id="otlt-left-side">
        {/* avatar image */}
        <AvatarImage image={placeHolderAvatar} />

        {/* transaction name */}
        <p id="entity">{transaction?.name ?? "Unknown"}</p>
      </div>

      {/* right side */}

      <div id="otlt-right-side">
        <p
          id="amount"
          style={{
            color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
          }}
        >
          {isPositiveAmount
            ? `+$${transactionAmount}`
            : `-$${transactionAmount}`}
        </p>
        <p id="date">19 Aug 2024</p>
      </div>
    </div>
  );
};

export default OverviewTransactionsSection;
