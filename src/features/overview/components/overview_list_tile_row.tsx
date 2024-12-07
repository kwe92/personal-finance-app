import OverviewListTile from "./overview_list_tile";
import "./css/overview_list_tile_row.css";
import * as gaps from "../../../app/constants/reusable";

const OverviewListTileRow = (): JSX.Element => {
  return (
    <div className="overview-list-tile-row-container">
      <OverviewListTile
        title="Current Balance"
        content="$4,836.00"
        isInvertedColors={true}
      />
      <gaps.GapW16 />

      <OverviewListTile title="Income" content="$3.814.25" />
      <gaps.GapW16 />

      <OverviewListTile title="Expenses" content="$1,700.50" />
    </div>
  );
};

export default OverviewListTileRow;
