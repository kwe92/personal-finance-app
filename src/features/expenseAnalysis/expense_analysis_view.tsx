import { Doughnut } from "react-chartjs-2";
import "./expense_analysis_view.css";
import { Divider } from "../shared/components/divider";
import { useExpenseTrackerData } from "./context/expense_analysis_context";

export const ExpenseAnalysisView = (): JSX.Element => {
  const { categoryTotals, topMerchants, spendingSplit } =
    useExpenseTrackerData();

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#000000",
          "#696868",
          "#B3B3B3",
          "#F2F3F7",
          "#D1D1D1",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <div className="expense-analysis-container">
      <div className="analysis-grid">
        {/* Left: Chart & Split */}
        <div className="analysis-card chart-section">
          <div className="doughnut-wrapper">
            <Doughnut data={chartData} options={options} />
            <div className="chart-center-text">
              <p className="tiny-label">Total</p>
              <p className="bold-amount">
                $
                {Object.values(categoryTotals)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(0)}
              </p>
            </div>
          </div>

          <div className="split-metrics">
            <div className="metric">
              <span>Needs</span>
              <p>${spendingSplit.needs.toFixed(2)}</p>
            </div>
            <div className="vertical-divider" />
            <div className="metric">
              <span>Wants</span>
              <p>${spendingSplit.wants.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Right: Top Merchants */}
        <div className="analysis-card merchants-section">
          <p className="summary-title">Top Spending</p>
          <div className="merchant-list">
            {topMerchants.map((merchant, i) => (
              <div key={i}>
                <div className="merchant-item">
                  <span className="merchant-name">{merchant.name}</span>
                  <span className="merchant-value">
                    ${merchant.value.toFixed(2)}
                  </span>
                </div>
                {i < topMerchants.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
