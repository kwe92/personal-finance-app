import { GapH24 } from "../../../app/constants/reusable";
// TODO: move to feature/shared folder along with associated css
import { ColoredLineListTile } from "../../overview/components/colored_line_list_tile";
import { LatestSpendingCard } from "./latest_spending_card";
import { ProgressBar } from "./progress_bar";

export //!! NOTE: the sizing is a bit different as I am diverting from the figma design

// TODO: remove inline css

const BudgetCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // height: "520px",
        height: "568px",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "32px",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#82C9D7",
            borderRadius: "16px",
          }}
        />
        <h1>Bills</h1>
      </div>
      {/* temporary gap and should use gap css property */}
      <GapH24 />

      {/* should use when using number parameter .toFixed(2) */}
      <p style={{ color: "#696868", fontSize: "18px" }}>Maximum of $750.00</p>

      {/* temporary gap and should use gap css property */}
      <GapH24 />

      <ProgressBar maxAmount={750} expendedAmount={150} />

      <GapH24 />

      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <ColoredLineListTile
          lineColor="#82C9D7"
          title="Spent"
          content="$150.00"
          style={{ flex: 1 }}
        />

        <ColoredLineListTile
          lineColor="#F8F4F0"
          title="Remaining"
          content="$600.00"
          style={{ flex: 1 }}
        />
      </div>

      <GapH24 />

      <LatestSpendingCard />
    </div>
  );
};
