import OverviewPotsSection from "./overview_pots_section";
import OverviewTransactionsSection from "./overview_transactions_section";

const OverviewFirstSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        height: "100%",
      }}
    >
      <OverviewPotsSection />

      <div style={{ height: "5%" }} />

      <OverviewTransactionsSection />
    </div>
  );
};

export default OverviewFirstSection;
