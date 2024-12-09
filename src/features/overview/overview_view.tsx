import "./overview_view.css";
import OverviewPotsTransactionSection from "./components/overview_pots_transaction_section";
import OverviewListTileRow from "./components/overview_list_tile_row";
import OverviewBudgetBillsSection from "./components/overview-budget-bills-section";
import { GapH64 } from "../../app/constants/reusable";

const OverviewView = (): JSX.Element => {
  return (
    <div className="overview-view-main">
      <h1 style={{ color: "#201F24" }}>Overview</h1>

      <OverviewListTileRow />

      <div className="overview-view-secondary">
        <OverviewPotsTransactionSection />

        <OverviewBudgetBillsSection />
      </div>
    </div>
  );
};

export default OverviewView;
