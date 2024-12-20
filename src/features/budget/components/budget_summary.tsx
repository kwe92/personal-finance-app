import "./css/budget_summary.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { SpendingSummaryListTile } from "./spending_summary_list_tile";
import { Divider } from "../../shared/components/divider";

ChartJS.register(...registerables);

export const BudgetSummary = (): JSX.Element => {
  const options = {
    layout: {
      autoPadding: false,
      padding: 0,
      margin: 0,
    },
  };

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
    // Budget summary main container
    <div className="budget-summary-main">
      {/* Doughnut Chart */}

      <div className="budget-summary-chart-container">
        <Doughnut
          options={options}
          data={mockData}
          style={{ padding: "0px", marginBottom: "10px" }}
        />
      </div>

      {/* spending summary section */}
      <div className="budget-spending-summary">
        <h2>Spending Summary</h2>
        <SpendingSummaryListTile
          label="Bills"
          maxAmount={750}
          expendedAmount={150}
          lineColor="#82C9D7"
        />
        <Divider />
        <SpendingSummaryListTile
          label="Dining Out"
          expendedAmount={133}
          maxAmount={75}
          lineColor="#F2CDAC"
        />

        <Divider />
        <SpendingSummaryListTile
          label="Personal Care"
          expendedAmount={40}
          maxAmount={100}
          lineColor="#626070"
        />

        <Divider />
        <SpendingSummaryListTile
          label="Entertainment"
          expendedAmount={15}
          maxAmount={50}
          lineColor="#277C78"
        />
      </div>
    </div>
  );
};
