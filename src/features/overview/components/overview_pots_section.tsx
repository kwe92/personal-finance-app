import "./css/overview_pots_section.css";
import "./css/overview_view_shared_styles.css";

import iconPots from "../../../assets/images/icon-pot.svg";
import OverviewSectionHeader from "./overview_section_header";
import { ColoredLineListTile } from "./colored_line_list_tile";
import { useNavigate } from "react-router";
import { usePotData } from "../../shared/context/pot_context";

const OverviewPotsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const { pots } = usePotData();

  var potListTiles: React.ReactNode[] = [];

  if (pots !== null) {
    const latestPots = pots?.slice(0, 4);

    potListTiles = latestPots.map((potData, i) => {
      return (
        <ColoredLineListTile
          lineColor={potData.theme}
          title={potData.name}
          content={`$${potData.total.toFixed(2)}`}
        />
      );
    });
  }

  return (
    <div className="overview-pots-section-main-container">
      <OverviewSectionHeader
        title="Pots"
        buttonLabel="See Details"
        onTap={() => {
          navigate("/home/Pots");
        }}
      />

      <div className="overview-pots-second-section">
        <OverviewPotsTotalSaved />

        <div className="overview-pots-section-grid-container">
          {potListTiles}
        </div>
      </div>
    </div>
  );
};

const OverviewPotsTotalSaved = (): JSX.Element => {
  return (
    <div className="overview-pots-total-saved">
      <img src={iconPots} alt="pots" />

      <div>
        <p id="overview-pots-total-saved-title">Total Saved</p>

        <p id="overview-pots-total-saved-content">$850</p>
      </div>
    </div>
  );
};

export default OverviewPotsSection;
