import "./css/overview_pots_section.css";
import "./css/overview_view_shared_styles.css";

import iconPots from "../../../assets/images/icon-pot.svg";
import OverviewSectionHeader from "./overview_section_header";
import { useNavigate } from "react-router";
import { usePotData } from "../../shared/context/pot_context";
import { ColoredLineListTile } from "../../shared/components/colored_line_list_tile";

const OverviewPotsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const { pots } = usePotData();

  const latestPots = pots.slice(0, 4);

  const potListTiles = latestPotsListTiles(latestPots);

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

        <div className="overview-pots-section-listtile-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            {potListTiles.slice(0, 2)}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {potListTiles.slice(2, 4)}
          </div>
        </div>
      </div>
    </div>
  );
};

function latestPotsListTiles(latestPots: PotData[]) {
  return latestPots.map((potData, i) => {
    return (
      <ColoredLineListTile
        style={{ flex: 1 }}
        lineColor={potData.theme}
        title={potData.name}
        content={`$${potData.total.toFixed(2)}`}
      />
    );
  });
}

const OverviewPotsTotalSaved = (): JSX.Element => {
  const { pots } = usePotData();

  var totalPotsSaved: number;

  totalPotsSaved = pots.reduce((accumulator, pot) => {
    return (accumulator += pot.total);
  }, 0);

  return (
    <div className="overview-pots-total-saved">
      <img src={iconPots} alt="pots" />

      <div>
        <p id="overview-pots-total-saved-title">Total Saved</p>

        <p id="overview-pots-total-saved-content">
          ${totalPotsSaved.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OverviewPotsSection;
