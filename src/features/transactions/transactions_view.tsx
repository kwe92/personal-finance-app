import "./transactions_view.css";
import placeHolderAvatar from "../../assets/images/avatars/green-plate-eatery.jpg";
import documentIcon from "../../assets/images/icon-sort-mobile.svg";
import filterIcon from "../../assets/images/icon-filter-mobile.svg";
import { SearchBar } from "../shared/components/search_bar";
import { DropDownMenu } from "../shared/components/drop_down_menu";
import * as gaps from "../../app/constants/reusable";
import AvatarImage from "../shared/components/avatar_image";
import { useTransactionData } from "../shared/context/transactionContext";
import { isPositive } from "../shared/utility/functions";
import useWindowSize from "../shared/hooks/use_window_size";
import { Divider } from "../shared/components/divider";

const TransactionsView = (): JSX.Element => {
  const { transactions, isLoading, error } = useTransactionData();
  var transactionListTiles: JSX.Element[];

  if (transactions !== null) {
    transactionListTiles = transactions.map((transaction, i) => {
      return (
        <>
          <TransactionListTile transaction={transaction} />
          {transactions.length - 1 !== i ? (
            <Divider style={{ margin: "16px 0 16px 0" }} />
          ) : (
            <></>
          )}
        </>
      );
    });
  }

  const { windowWidth, windowHeight } = useWindowSize();
  return (
    <div className="transaction-view-main">
      <h1>Transactions</h1>

      <div className="transaction-view-content">
        <div className="transaction-filters-container">
          <SearchBar placeholder="Search transactions" />

          <div className="transaction-drop-down-container">
            {windowWidth > 700 ? (
              <>
                <DropDownMenu
                  title="Sort by"
                  label="Latest"
                  onTap={() => {
                    // TODO: implement
                  }}
                />
                <DropDownMenu
                  title="Category"
                  label="All Transactions"
                  onTap={() => {
                    // TODO: implement
                  }}
                />
              </>
            ) : (
              <>
                <img src={documentIcon} alt="document-icon" />
                <img src={filterIcon} alt="filter-icon" />
              </>
            )}
          </div>
        </div>

        {windowWidth > 600 ? (
          <TransactionTable />
        ) : (
          <div className="transaction-list-tile-wrapper">
            {transactionListTiles!}
          </div>
        )}
      </div>
    </div>
  );
};

const TransactionListTile = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  const isPositiveAmount = isPositive(transaction?.amount ?? 0.0);

  const transactionAmount = Math.abs(transaction?.amount ?? 0.0).toFixed(2);
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 0 0 0",
      }}
    >
      <AvatarImage image={placeHolderAvatar} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          // backgroundColor: "lightgrey",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#201F24",
            }}
          >
            {transaction?.name}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#696868",
            }}
          >
            {transaction?.category}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: `${isPositiveAmount ? "#277C78" : "#201F24"}`,
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {isPositiveAmount
              ? `+$${transactionAmount}`
              : `-$${transactionAmount}`}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#696868",
            }}
          >
            29 Aug 2024
          </p>
        </div>
      </div>
    </div>
  );
};

const TransactionTable = (): JSX.Element => {
  const { transactions, isLoading, error } = useTransactionData();
  const { windowWidth, windowHeight } = useWindowSize();

  var transactionRowItems: JSX.Element[];

  if (transactions !== null) {
    transactionRowItems = transactions.map((transaction, i) => {
      return <TansactionRow transaction={transaction} />;
    });
  }

  return (
    <div className="transaction-table-wrapper">
      <table>
        <tr>
          <th style={{ textAlign: "start" }}>Recipient / Sender</th>
          <th style={{ textAlign: "start" }}>Category</th>
          <th style={{ textAlign: "start" }}>Transaction Date</th>
          <th style={{ textAlign: "end" }}>Amount</th>
        </tr>
        {windowWidth > 1200 ? <gaps.GapH24 /> : <gaps.GapH16 />}
        <tbody>{transactionRowItems!}</tbody>
      </table>
    </div>
  );
};

const TansactionRow = ({
  transaction,
}: {
  transaction?: TransactionData;
}): JSX.Element => {
  // TODO: add the bellow commented code when you start to take a transaction as an argument to TansactionRow
  const isPositiveAmount = isPositive(transaction?.amount ?? 0.0);

  const transactionAmount = Math.abs(transaction?.amount ?? 0.0).toFixed(2);

  return (
    <tr>
      <td
        className="transaction-avatar-name"
        // style={{ padding: "12px 0px 12px 0px" }}
      >
        {/* avatar */}
        <AvatarImage image={placeHolderAvatar} />

        {transaction?.name}
      </td>
      <td style={{ fontSize: "12px", color: "#696868" }}>
        {transaction?.category}
      </td>
      <td style={{ fontSize: "12px", color: "#696868" }}>29 Aug 2024, 21:45</td>
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

export default TransactionsView;
