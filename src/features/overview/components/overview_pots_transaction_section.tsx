import "./css/overview_pots_transaction_section.css";
import OverviewPotsSection from "./overview_pots_section";
import OverviewTransactionsSection from "./overview_transactions_section";

const OverviewPotsTransactionSection = (): JSX.Element => {
  return (
    <div className="overview-pots-transaction-section-container">
      <OverviewPotsSection />

      <OverviewTransactionsSection />
    </div>
  );
};

export default OverviewPotsTransactionSection;
