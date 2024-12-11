import "./css/overview-budget-bills-section.css";
import { OverviewBudgetSection } from "./overview-budget-section";
import { OverviewBillsSection } from "./overview_bills_section";

const OverviewBudgetBillsSection = (): JSX.Element => {
  return (
    <div className="overview-budget-bills-section">
      <OverviewBudgetSection />

      <OverviewBillsSection />
    </div>
  );
};

export default OverviewBudgetBillsSection;
