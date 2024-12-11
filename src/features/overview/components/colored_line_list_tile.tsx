import "./css/overview_view_shared_styles.css";

export const ColoredLineListTile = (props: {
  lineColor: string;
  title: string;
  content: string;
  style?: React.CSSProperties;
}): JSX.Element => {
  return (
    <div className="colored-line-list-tile" style={props.style}>
      <div
        className="colored-line-list-tile-vertical-line"
        style={{ backgroundColor: props.lineColor }}
      />

      <div className="colored-line-list-tile-content">
        <p style={{ color: "#696868" }}>{props.title}</p>
        <p style={{ fontWeight: "bold" }}>{props.content}</p>
      </div>
    </div>
  );
};
