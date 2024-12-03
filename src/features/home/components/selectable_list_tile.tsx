import { GapW16 } from "../../../app/constants/reusable";
import "./css/selectable_list_tile.css";

const SelectableListTile = (props: {
  icon: JSX.Element;
  content: string;
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div className="selectable-list-tile" tabIndex={1} onClick={props.onTap}>
      {props.icon}
      <GapW16 />
      <p>{props.content}</p>
    </div>
  );
};

export default SelectableListTile;
