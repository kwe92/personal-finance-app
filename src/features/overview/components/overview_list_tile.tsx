import * as gaps from "../../../app/constants/reusable";

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

export default OverviewListTile;
