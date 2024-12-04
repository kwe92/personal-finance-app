import OverviewListTile from "./overview_list_tile";

import * as gaps from "../../../app/constants/reusable";

const OverviewListTileRow = (): JSX.Element => {
  return (
    <div style={{ display: "flex", width: "100%", height: "118px" }}>
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
