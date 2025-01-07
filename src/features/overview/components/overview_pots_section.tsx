import "./css/overview_pots_section.css";
import "./css/overview_view_shared_styles.css";

import iconPots from "../../../assets/images/icon-pot.svg";
import OverviewSectionHeader from "./overview_section_header";
import { ColoredLineListTile } from "./colored_line_list_tile";
import { useNavigate } from "react-router";

const OverviewPotsSection = (): JSX.Element => {
  const navigate = useNavigate();
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
          <ColoredLineListTile
            lineColor="#277C78"
            title="Savings"
            content="$159"
          />

          <ColoredLineListTile lineColor="#82C9D7" title="Gift" content="$40" />

          <ColoredLineListTile
            lineColor="#626070"
            title="Concert Ticket"
            content="$110"
          />

          <ColoredLineListTile
            lineColor="#F2CDAC"
            title="New Laptop"
            content="$10"
          />
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
