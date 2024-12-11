import "./css/overview_transactions_section.css";
import "./css/overview_view_shared_styles.css";
import appData from "../../../app/data.json";
import emmaAvatar from "../../../assets/images/avatars/emma-richardson.jpg";
import * as gaps from "../../../app/constants/reusable";
import { TransactionData } from "../../shared/models/transaction";
import OverviewSectionHeader from "./overview_section_header";
import AvatarImage from "../../shared/components/avatar_image";
import useWindowSize from "../../shared/hooks/use_window_size";

//!! TODO: create a dart parser function for transaction date e.g.: 19 Aug 2024

const OverviewTransactionsSection = (): JSX.Element => {
  const { windowWidth, windowHeight } = useWindowSize();

  console.log(`height: ${windowHeight}`);

  const transactions = appData.transactions.map((transaction, i) => {
    return <OverviewTransactionListTile transaction={transaction} />;
  });

  return (
    <div className="overview-transaction-section-main-container">
      <OverviewSectionHeader
        title="Transactions"
        buttonLabel="View All"
        onTap={() => {
          // TODO: implement
        }}
      />

      <gaps.GapH8 />

      {transactions.at(0)}

      <Divider />

      {transactions.at(1)}

      <Divider />

      {transactions.at(2)}

      <Divider />

      {transactions.at(3)}

      {windowHeight > 930 ? (
        <>
          <Divider />
          {transactions.at(4)}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const Divider = ({ style }: { style?: React.CSSProperties }): JSX.Element => {
  return <div className="overview-transaction-divider" style={style} />;
};

const OverviewTransactionListTile = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  return (
    <div className="overview-transaction-list-tile">
      {/* left side */}
      <div id="otlt-left-side">
        {/* avatar image */}
        <AvatarImage image={emmaAvatar} />

        {/* transaction name */}
        <p id="entity">{transaction?.name ?? "Unknown"}</p>
      </div>

      {/* right side */}

      <div id="otlt-right-side">
        <p
          id="amount"
          style={{
            color: `${
              isPositive(transaction?.amount ?? 0.0) ? "#277C78" : "#201F24"
            }`,
          }}
        >
          {`$${transaction?.amount.toFixed(2) ?? 0.0}`}
        </p>
        <p id="date" style={{ color: "#696868" }}>
          19 Aug 2024
        </p>
      </div>
    </div>
  );
};

function isPositive(number: number) {
  return number > 0;
}

export default OverviewTransactionsSection;
