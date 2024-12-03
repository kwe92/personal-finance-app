import * as gaps from "../../../app/constants/reusable";
import "./css/selectable_list_tile.css";

const SelectableListTile = (props: {
  icon: JSX.Element;
  content: string;
  tabKey: number;
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div
      className="selectable-list-tile"
      tabIndex={props.tabKey}
      onClick={props.onTap}
    >
      {props.icon}
      <gaps.GapW8 />
      <p>{props.content}</p>
    </div>
  );
};

export default SelectableListTile;
