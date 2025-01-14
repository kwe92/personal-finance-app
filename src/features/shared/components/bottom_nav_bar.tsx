import "./css/bottom_nav_bar.css";

import { useNavigate } from "react-router";
import useAddSelectableListTileListeners from "../hooks/use_selectable_list_tile_listeners";
import * as navIcons from "./nav_bar_icons";

const BottomNavBar = (): JSX.Element => {
  useAddSelectableListTileListeners({
    selector: ".selectable-bottom-nav-list-tile",
    selectedStyle: "selected-selectable-bottom-nav-list-tile",
  });

  const navigate = useNavigate();

  const navListTileData = new Map([
    [<navIcons.NavOverviewIcon />, "Overview"],
    [<navIcons.NavTransactionIcon />, "Transactions"],
    [<navIcons.NavBudgetIcon />, "Budgets"],
    [<navIcons.NavPotsIcon />, "Pots"],
    [<navIcons.NavRecurringBillsIcon />, "Recurring Bills"],
  ]);

  let navListTileItemsKey = 0;

  const navListTileItems = Array.from(navListTileData.entries()).map(
    ([key, value]) => {
      navListTileItemsKey++;

      return (
        <>
          <BottomNavIcon
            key={navListTileItemsKey}
            tabKey={navListTileItemsKey}
            icon={key}
            content={value}
            onTap={() => {
              navigate("/home/" + value);
            }}
          />
        </>
      );
    }
  );

  return <div className="bottom-nav-bar">{navListTileItems}</div>;
};

const BottomNavIcon = (props: {
  icon: JSX.Element;
  content: string;
  tabKey: number;
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div
      className="selectable-bottom-nav-list-tile"
      tabIndex={props.tabKey}
      onClick={props.onTap}
    >
      {props.icon}
      <p>{props.content}</p>
      <div className="horizontal-navbar-highlight" />
    </div>
  );
};

export default BottomNavBar;
