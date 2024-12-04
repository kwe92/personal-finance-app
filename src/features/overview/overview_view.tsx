import * as gaps from "../../app/constants/reusable";
import OverviewFirstSection from "./components/overview_first_section";
import OverviewListTileRow from "./components/overview_list_tile_row";
import OverviewSecondSection from "./components/overview_second_section";

const OverviewView = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "32px 32px 32px 32px",
      }}
    >
      <h1 style={{ color: "#201F24" }}>Overview</h1>
      <gaps.GapH32 />

      <OverviewListTileRow />

      {/* lower section */}

      <div style={{ height: "3.5%" }} />

      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <OverviewFirstSection />
        <div style={{ width: "1.5%" }} />
        <OverviewSecondSection />
      </div>
    </div>
  );
};

export default OverviewView;
