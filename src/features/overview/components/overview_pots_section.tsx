import "./css/overview_pots_section.css";
import "./css/overview_view_shared_styles.css";

import * as gaps from "../../../app/constants/reusable";
import iconPots from "../../../assets/images/icon-pot.svg";
import OverviewSectionHeader from "./overview_section_header";

const OverviewPotsSection = (): JSX.Element => {
  return (
    <div className="overview-pots-section-main-container">
      <OverviewSectionHeader title="Pots" buttonLabel="See Details" />

      <div className="overview-pots-second-section">
        <OverviewPotsTotalSaved />

        <div className="overview-pots-section-grid-container">
          <PotsSectionListTile
            lineColor="#277C78"
            title="Savings"
            content="$159"
          />

          <PotsSectionListTile lineColor="#82C9D7" title="Gift" content="$40" />

          <PotsSectionListTile
            lineColor="#626070"
            title="Concert Ticket"
            content="$110"
          />

          <PotsSectionListTile
            lineColor="#F2CDAC"
            title="New Laptop"
            content="$10"
          />
        </div>
      </div>
    </div>
  );
};

const PotsSectionListTile = (props: {
  lineColor: string;
  title: string;
  content: string;
}): JSX.Element => {
  return (
    <div className="overview-pots-section-grid-item">
      <div
        className="overview-pots-list-tile-vertical-line"
        style={{ backgroundColor: props.lineColor }}
      />

      <div className="overview-pots-section-grid-item-content">
        <p style={{ color: "#696868" }}>{props.title}</p>
        <p style={{ fontWeight: "bold" }}>{props.content}</p>
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
