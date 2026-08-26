import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import "./expense_analysis_view.css";
import { Divider } from "../shared/components/divider";
import { useExpenseTrackerData } from "./context/expense_analysis_context";
import { Fragment } from "react";
ChartJS.register(Tooltip, ArcElement);

const CHART_COLORS = ["#277C78", "#122C34", "#82C9D7", "#F2CDAC", "#C94736"];

export const ExpenseAnalysisView = (): JSX.Element => {
  const { categoryTotals, topMerchants, spendingSplit, narrative, peakDay } =
    useExpenseTrackerData();

  return (
    <div className="expense-analysis-container">
      {/* SECTION 1: Categorization */}
      <div className="analysis-card categorization-section">
        <p className="summary-title">Spending Breakdown</p>
        <div className="macro-content">
          <div className="doughnut-wrapper">
            <Doughnut
              data={{
                labels: Object.keys(categoryTotals),
                datasets: [
                  {
                    data: Object.values(categoryTotals),
                    backgroundColor: CHART_COLORS,
                    borderWidth: 2,
                    borderColor: "#ffffff",
                  },
                ],
              }}
              options={{
                cutout: "75%",
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
              }}
            />
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
          <div className="category-legend">
            {Object.entries(categoryTotals).map(([cat, val], i) => (
              <div key={cat} className="legend-item">
                <div className="legend-left">
                  <span
                    className="color-dot"
                    style={{
                      backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                    }}
                  />
                  <span className="category-name">{cat}</span>
                </div>
                <span className="category-percent">
                  {(
                    (val /
                      (Object.values(categoryTotals).reduce(
                        (a, b) => a + b,
                        0,
                      ) || 1)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
            ))}
          </div>
        </div>
        <Divider style={{ margin: "16px 0" }} />
        <div className="split-metrics">
          <div className="metric">
            <p className="metric-label">Essentials</p>
            <p className="metric-value">${spendingSplit.needs.toFixed(0)}</p>
          </div>
          <div className="vertical-divider" />
          <div className="metric">
            <p className="metric-label">Lifestyle</p>
            <p className="metric-value">${spendingSplit.wants.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Narrative Insights */}
      <div className="temporal-insights-stack">
        <div className="analysis-card insight-tile">
          <p className="summary-title">{narrative.description}</p>
          <div className="insight-body">
            <h2 className="primary-metric">{narrative.primaryMetric}</h2>
            <div className={`status-badge ${narrative.status}`}>
              {narrative.secondaryMetric}
            </div>
          </div>
          <p className="tiny-label">{narrative.trendLabel}</p>
        </div>

        <div className="analysis-card insight-tile">
          <p className="summary-title">Peak Activity</p>
          {peakDay ? (
            <>
              <div className="insight-body">
                <h2 className="primary-metric">{peakDay.day}</h2>
                <div className="status-badge neutral">
                  ${peakDay.amount.toFixed(0)}
                </div>
              </div>
              <p className="tiny-label">
                Your highest spending day this period
              </p>
            </>
          ) : (
            <p className="tiny-label">No data for this period</p>
          )}
        </div>
      </div>

      {/* SECTION 3: Top Merchants */}
      <div className="analysis-card top-spending">
        <p className="summary-title">Top Merchants</p>
        <div className="merchant-list">
          {topMerchants.map((m, i) => (
            <Fragment key={m.name}>
              {i === 0 && <Divider />}
              <div>
                <div className="merchant-row">
                  <span className="expense-name">{m.name}</span>
                  <span className="expense-value">${m.value.toFixed(2)}</span>
                </div>
              </div>
              <Divider />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
