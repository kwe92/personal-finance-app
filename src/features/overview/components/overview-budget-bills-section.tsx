import "./css/overview-budget-bills-section.css";
import { OverviewBudgetSection } from "./overview-budget-section";

const OverviewBudgetBillsSection = (): JSX.Element => {
  return (
    <div className="overview-budget-bills-section">
      <OverviewBudgetSection />

      <OverviewBillsSection />
    </div>
  );
};

const OverviewBillsSection = (): JSX.Element => {
  return (
    <div
      style={{
        width: "100%",
        height: "45%",
        backgroundColor: "lightsteelblue",
      }}
    ></div>
  );
};

export default OverviewBudgetBillsSection;
