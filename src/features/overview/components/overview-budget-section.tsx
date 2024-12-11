import "./css/overview-budget-section.css";

import { Doughnut } from "react-chartjs-2";
import OverviewSectionHeader from "./overview_section_header";
import { ColoredLineListTile } from "./colored_line_list_tile";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

export const OverviewBudgetSection = (): JSX.Element => {
  const options = {};

  const mockData = {
    datasets: [
      {
        data: [40, 750, 75, 100],

        backgroundColor: ["#277C78", "#82C9D7", "#F2CDAC", "#626070"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="overview-budget-section">
      <OverviewSectionHeader title="Budget" buttonLabel="See Details" />

      <div className="overview-budget-section-content">
        <div className="overview-budget-section-dougnut">
          <Doughnut options={options} data={mockData} />
        </div>

        <div className="overview-budget-section-dougnut-labels">
          <ColoredLineListTile
            lineColor="#277C78"
            title="Entertainment"
            content="$40.00"
            style={{ flex: 1 }}
          />
          <ColoredLineListTile
            lineColor="#82C9D7"
            title="Bills"
            content="$750.00"
            style={{ flex: 1 }}
          />
          <ColoredLineListTile
            lineColor="#F2CDAC"
            title="Dining Out"
            content="$75.00"
            style={{ flex: 1 }}
          />
          <ColoredLineListTile
            lineColor="#626070"
            title="Personal Care"
            content="$100.00"
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};
