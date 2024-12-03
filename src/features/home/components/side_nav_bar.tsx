import logo from "../../../assets/images/logo-large.svg";
import { GapH6 } from "../../../app/constants/reusable";
import useAddSelectableListTileListeners from "../hooks/use_selectable_list_tile_listeners";

import * as navIcons from "./side_nav_bar_icons";

import SelectableListTile from "./selectable_list_tile";

import "./css/side_nav_bar.css";
import { useNavigate } from "react-router";

const SideNavBar = (): JSX.Element => {
  useAddSelectableListTileListeners();

  const navigate = useNavigate();

  const navListTileData = new Map([
    [<navIcons.NavOverviewIcon />, "Overview"],
    [<navIcons.NavTransactionIcon />, "Transactions"],
    [<navIcons.NavBudgetIcon />, "Budgets"],
    [<navIcons.NavPotsIcon />, "Pots"],
    [<navIcons.NavRecurringBillsIcon />, "Recurring Bills"],
  ]);

  const navListTileItems = Array.from(navListTileData.entries()).map(
    ([key, value]) => (
      <>
        <SelectableListTile
          icon={key}
          content={value}
          onTap={() => {
            navigate(value);
          }}
        />
        <GapH6 />
      </>
    )
  );

  return (
    <div className="side-nav-bar">
      <img
        src={logo}
        style={{
          width: "8vw",
          height: "3vh",
          paddingLeft: "32px", //TODO: maybe responsive padding
        }}
      />
      <div style={{ height: "32px" }} />
      {navListTileItems}
    </div>
  );
};

export default SideNavBar;