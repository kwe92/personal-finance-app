import * as gaps from "../../app/constants/reusable";
import iconCaretRight from "../../assets/images/icon-caret-right.svg";

//!! TODO: iconCaretRight should be its own component as to be able to dymanically change its color

const OverviewView = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "32px 32px 32px 32px",
      }}
    >
      <h1>Overview</h1>
      <gaps.GapH32 />

      <OverviewListTileRow />

      {/* lower section */}

      <div style={{ height: "3.5%" }} />

      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <LeftSection />
        <div style={{ width: "1.5%" }} />
        <RightSection />
      </div>
    </div>
  );
};

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

const OverviewListTile = ({
  title,
  content,
  isInvertedColors = false,
}: {
  title: string;
  content: string;
  isInvertedColors?: boolean;
}): JSX.Element => {
  const backgroundCOlor = !isInvertedColors ? "white" : "#201F24";

  const contentColor = !isInvertedColors ? "#201F24" : "white";

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: backgroundCOlor,
        borderRadius: "12px",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", padding: "24px" }}
      >
        <p style={{ fontSize: "14px", color: contentColor }}>{title}</p>
        <gaps.GapH12 />
        <p
          style={{ fontSize: "32px", fontWeight: "bold", color: contentColor }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

const LeftSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        height: "100%",
        // backgroundColor: "lightsalmon",
      }}
    >
      <PotsSection />

      <div style={{ height: "5%" }} />

      <TransactionsSection />
    </div>
  );
};

const RightSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        height: "100%",
        backgroundColor: "lightblue",
      }}
    ></div>
  );
};

const PotsSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "40%",
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Pots</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "20px",
          }}
        >
          <p>See Details</p>
          <gaps.GapW8 />
          <img
            src={iconCaretRight}
            style={{ width: "10px", height: "10px" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const TransactionsSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "lightgreen",
      }}
    ></div>
  );
};

export default OverviewView;
