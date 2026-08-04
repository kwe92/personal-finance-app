import OverviewListTile from "./overview_list_tile";
import "./css/overview_list_tile_row.css";
import { useOverviewData } from "../context/overview_context";

const OverviewListTileRow = (): JSX.Element => {
  const { summary, isLoading } = useOverviewData();

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="overview-list-tile-row-container">
      <OverviewListTile
        title="Current Balance"
        content={isLoading ? "Loading..." : formatCurrency(summary.balance)}
        isInvertedColors={true}
      />

      <OverviewListTile
        title="Income"
        content={isLoading ? "Loading..." : formatCurrency(summary.income)}
      />

      <OverviewListTile
        title="Expenses"
        content={isLoading ? "Loading..." : formatCurrency(summary.expenses)}
      />
    </div>
  );
};

export default OverviewListTileRow;
