import "./css/side_nav_bar.css";
import React, { useState } from "react";
import logo from "../../../assets/images/logo-large.svg";
import caretLeft from "../../../assets/images/icon-caret-left.svg";
import caretRight from "../../../assets/images/icon-caret-right.svg";

import { GapH6 } from "../../../app/constants/reusable";
import useAddSelectableListTileListeners from "../hooks/use_selectable_list_tile_listeners";
import * as navIcons from "./nav_bar_icons";
import SelectableListTile from "./selectable_list_tile";
import { useNavigate } from "react-router";
import { SignOutButton } from "./sign_out_button";

const SideNavBar = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isShrinking, setIsShrinking] = useState<boolean>(false);

  useAddSelectableListTileListeners({
    selector: ".selectable-list-tile",
    selectedStyle: "selected-selectable-list-tile",
  });

  const navigate = useNavigate();

  const handleCollapse = () => {
    setIsShrinking(true);
    // Wait 500ms for width transition (20% -> 5%) to finish before showing collapsed view
    setTimeout(() => {
      setIsShrinking(false);
      setIsCollapsed(true);
    }, 500);
  };

  const handleExpand = () => {
    setIsCollapsed(false);
  };

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
        <React.Fragment key={navListTileItemsKey}>
          <SelectableListTile
            tabKey={navListTileItemsKey}
            icon={key}
            content={value}
            onTap={() => {
              navigate("/home/" + value);
            }}
          />
          <GapH6 />
        </React.Fragment>
      );
    },
  );

  return isCollapsed ? (
    <div className="side-nav-bar-collapsed">
      <img
        src={caretRight}
        style={{
          width: "4vw",
          height: "1.5vh",
          cursor: "pointer",
        }}
        onClick={handleExpand}
      />
    </div>
  ) : (
    <div className={`side-nav-bar ${isShrinking ? "collapsed" : ""}`}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={logo}
            style={{
              width: "8vw",
              height: "3vh",
              paddingLeft: "32px",
            }}
          />
          <img
            src={caretLeft}
            style={{
              width: "4vw",
              height: "1.5vh",
              cursor: "pointer",
            }}
            onClick={handleCollapse}
          />
        </div>
        <div style={{ height: "32px" }} />
        {navListTileItems}
      </div>
      <SignOutButton />
    </div>
  );
};

export default SideNavBar;
