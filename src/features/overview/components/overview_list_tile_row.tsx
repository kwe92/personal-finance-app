import OverviewListTile from "./overview_list_tile";
import "./css/overview_list_tile_row.css";
import { useOverviewData } from "../context/overview_context";
import { usePotData } from "../../shared/context/pot_context";
import Skeleton from "../../shared/components/skeleton";

const OverviewListTileRow = (): JSX.Element => {
  const { summary, isLoading: isSummaryLoading } = useOverviewData();
  const { pots, isLoading: isPotsLoading } = usePotData();

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  // Calculate total amount allocated across all pots
  const totalPotsSaved = pots?.reduce((acc, pot) => acc + pot.total, 0) ?? 0;

  // Subtract pots total from raw bank balance to get available unallocated balance
  const availableBalance = summary.balance - totalPotsSaved;

  const isDataLoading = isSummaryLoading || isPotsLoading;

  return (
    <div className="overview-list-tile-row-container">
      <OverviewListTile
        title="Current Balance"
        content={
          isDataLoading ? (
            <Skeleton width={"60%"} />
          ) : (
            formatCurrency(availableBalance)
          )
        }
        isInvertedColors={true}
      />

      <OverviewListTile
        title="Income"
        content={
          isSummaryLoading ? (
            <Skeleton width={"60%"} />
          ) : (
            formatCurrency(summary.income)
          )
        }
      />

      <OverviewListTile
        title="Expenses"
        content={
          isSummaryLoading ? (
            <Skeleton width={"60%"} />
          ) : (
            formatCurrency(summary.expenses)
          )
        }
      />
    </div>
  );
};

export default OverviewListTileRow;
