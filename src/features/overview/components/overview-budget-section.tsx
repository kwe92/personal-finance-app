import "./css/overview-budget-section.css";

import { Doughnut } from "react-chartjs-2";
import OverviewSectionHeader from "./overview_section_header";
import { ColoredLineListTile } from "./colored_line_list_tile";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router";
import { useBudgetData } from "../../shared/context/budget_context";
import { useDoughnutChartData } from "../../shared/context/doughnut_chart_context";

ChartJS.register([CategoryScale, ArcElement, Title, Tooltip]);

export const OverviewBudgetSection = (): JSX.Element => {
  const navigate = useNavigate();

  const { budgets } = useBudgetData();

  const { doughnutChartOptions, doughnutChartData } = useDoughnutChartData();

  const coloredLineListTiles = budgets
    ?.slice(0, 4)
    .map((budget) => (
      <ColoredLineListTile
        lineColor={budget.theme}
        title={budget.category}
        content={budget.maximum.toFixed(2)}
        style={{ flex: 1 }}
      />
    ));

  return (
    <div className="overview-budget-section">
      <OverviewSectionHeader
        title="Budget"
        buttonLabel="See Details"
        onTap={() => {
          navigate("/home/Budgets");
        }}
      />

      <div className="overview-budget-section-content">
        <div className="overview-budget-section-dougnut">
          <Doughnut
            options={doughnutChartOptions}
            // data={mockData}
            data={doughnutChartData}
          />
        </div>

        <div className="overview-budget-section-dougnut-labels">
          {coloredLineListTiles}
        </div>
      </div>
    </div>
  );
};
