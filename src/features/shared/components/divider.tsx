import "./css/divider.css";

export const Divider = ({
  style,
}: {
  style?: React.CSSProperties;
}): JSX.Element => {
  return <div className="overview-transaction-divider" style={style} />;
};
