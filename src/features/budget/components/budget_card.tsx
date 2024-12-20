import "./css/budget_card.css";

import { GapH24 } from "../../../app/constants/reusable";
// TODO: move to feature/shared folder along with associated css
import { ColoredLineListTile } from "../../overview/components/colored_line_list_tile";
import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";

export const BudgetCard = () => {
  return (
    <div className="budget-card-main">
      {/* header */}
      <div className="budget-card-header">
        <div className="budget-card-header-circle" />
        <h1>Bills</h1>
      </div>
      {/* temporary gap and should use gap css property */}
      <GapH24 />

      {/* should use when using number parameter .toFixed(2) */}
      <p style={{ color: "#696868", fontSize: "18px" }}>Maximum of $750.00</p>

      {/* temporary gap and should use gap css property */}
      <GapH24 />

      <ProgressBar maxAmount={750} expendedAmount={150} />

      <GapH24 />

      <div className="budget-card-list-tile-section">
        <ColoredLineListTile
          lineColor="#82C9D7"
          title="Spent"
          content="$150.00"
          style={{ flex: 1 }}
        />

        <ColoredLineListTile
          lineColor="#F8F4F0"
          title="Remaining"
          content="$600.00"
          style={{ flex: 1 }}
        />
      </div>

      <GapH24 />

      <LatestSpendingCard />
    </div>
  );
};
