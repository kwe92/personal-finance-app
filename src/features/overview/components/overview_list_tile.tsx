import "./css/overview_list_tile.css";

const OverviewListTile = ({
  title,
  content,
  isInvertedColors = false,
}: {
  title: string;
  content: string;
  isInvertedColors?: boolean;
}): JSX.Element => {
  const backgroundColor = !isInvertedColors ? "white" : "#201F24";

  const contentColor = !isInvertedColors ? "#201F24" : "white";

  return (
    <div
      className="overview-list-tile-container"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <p id="overview-list-tile-title" style={{ color: contentColor }}>
        {title}
      </p>
      <p
        id="overview-list-tile-content"
        style={{ fontWeight: "bold", color: contentColor }}
      >
        {content}
      </p>
    </div>
  );
};

export default OverviewListTile;
