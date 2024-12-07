import "./overview_view.css";
import * as gaps from "../../app/constants/reusable";
import OverviewPotsTransactionSection from "./components/overview_pots_transaction_section";
import OverviewListTileRow from "./components/overview_list_tile_row";
import OverviewSecondSection from "./components/overview_second_section";

const OverviewView = (): JSX.Element => {
  return (
    <div className="overview-view-main">
      <h1 style={{ color: "#201F24" }}>Overview</h1>

      <gaps.GapH32 />

      <OverviewListTileRow />

      {/* lower section */}

      <gaps.GapH32 />
      <div className="overview-view-secondary">
        <OverviewPotsTransactionSection />

        <gaps.GapW24 />

        <OverviewSecondSection />
      </div>
    </div>
  );
};

export default OverviewView;
