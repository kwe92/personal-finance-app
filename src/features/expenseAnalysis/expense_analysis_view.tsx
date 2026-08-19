import { Doughnut } from "react-chartjs-2";
import "./expense_analysis_view.css";
import { Divider } from "../shared/components/divider";
import { useExpenseTrackerData } from "./context/expense_analysis_context";

// ! TODO: Refactor into reusable Widgets

export const ExpenseAnalysisView = (): JSX.Element => {
  const { categoryTotals, topMerchants, spendingSplit } =
    useExpenseTrackerData();

  const totalExpenses = Object.values(categoryTotals).reduce(
    (a, b) => a + b,
    0,
  );
  const chartColors = ["#000000", "#696868", "#B3B3B3", "#CCCCCC", "#D1D1D1"];

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: chartColors,
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
      {/* SECTION 1: Categorization */}
      <div className="analysis-card categorization-section">
        <p className="summary-title">Spending Breakdown</p>

        <div className="macro-content">
          <div className="doughnut-wrapper">
            <Doughnut data={chartData} options={options} />
            <div className="chart-center-text">
              <p className="tiny-label">Total</p>
              <p className="bold-amount">${totalExpenses.toFixed(0)}</p>
            </div>
          </div>

          <div className="category-legend">
            {Object.entries(categoryTotals).map(([category, value], i) => {
              const percentage = ((value / totalExpenses) * 100).toFixed(0);
              return (
                <div key={category} className="legend-item">
                  <div className="legend-left">
                    <span
                      className="color-dot"
                      style={{
                        backgroundColor: chartColors[i % chartColors.length],
                      }}
                    />
                    <span className="category-name">{category}</span>
                  </div>
                  <div className="legend-right">
                    <span className="category-percent">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        <div className="split-metrics">
          <div className="metric">
            <p className="metric-label">Needs</p>
            <p className="metric-value">${spendingSplit.needs.toFixed(2)}</p>
          </div>
          <div className="vertical-divider" />
          <div className="metric">
            <p className="metric-label">Wants</p>
            <p className="metric-value">${spendingSplit.wants.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="analysis-card">
        <p className="summary-title">Top Spending</p>
        {topMerchants.map((merchant, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "20%",
              // backgroundColor: "orange",
            }}
          >
            <div className="merchant-item">
              <span className="expense-name">{merchant.name}</span>
              <span className="expense-value">
                ${merchant.value.toFixed(2)}
              </span>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};
