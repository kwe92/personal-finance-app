import "./overview_view.css";
import "../shared/css/view_container.css";
import OverviewPotsTransactionSection from "./components/overview_pots_transaction_section";
import OverviewListTileRow from "./components/overview_list_tile_row";
import OverviewBudgetBillsSection from "./components/overview-budget-bills-section";
import { SignOutButton } from "../shared/components/sign_out_button";
import useWindowSize from "../shared/hooks/use_window_size";

const OverviewView = (): JSX.Element => {
  const { windowWidth } = useWindowSize();
  return (
    <div className="view-container" style={{ overflowY: "scroll" }}>
      <div className="overview-view-header-section">
        <h1 style={{ color: "#201F24" }}>Overview</h1>
        {windowWidth <= 1200 ? <SignOutButton /> : <></>}
      </div>
      <OverviewListTileRow />
      <div className="overview-view-secondary">
        <OverviewPotsTransactionSection />
        <OverviewBudgetBillsSection />
      </div>
    </div>
  );
};

export default OverviewView;
