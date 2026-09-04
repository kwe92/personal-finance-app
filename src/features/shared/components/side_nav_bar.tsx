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
import useWindowSize from "../hooks/use_window_size";

const SideNavBar = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isShrinking, setIsShrinking] = useState<boolean>(false);
  const [isExpanding, setIsExpanding] = useState<boolean>(true);
  const { windowWidth, windowHeight } = useWindowSize();

  useAddSelectableListTileListeners({
    selector: ".selectable-list-tile",
    selectedStyle: "selected-selectable-list-tile",
  });

  const navigate = useNavigate();

  const handleCollapse = () => {
    setIsShrinking(true);
    setIsExpanding(false);
    setTimeout(() => {
      setIsShrinking(false);
      setIsCollapsed(true);
    }, 300);
  };

  const handleExpand = () => {
    setIsCollapsed(false);
    setTimeout(() => {
      setIsExpanding(true);
    }, 150);
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

  const showContent = !isShrinking && isExpanding;

  return isCollapsed ? (
    <div className="side-nav-bar collapsed">
      <img src={caretRight} style={caretStyle} onClick={handleExpand} />
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
            className={`fade-content ${showContent ? "" : "hidden"}`}
            style={logoStyle}
          />
          {showContent && (
            <img src={caretLeft} style={caretStyle} onClick={handleCollapse} />
          )}
        </div>

        <div className={`fade-content ${showContent ? "" : "hidden"}`}>
          <div style={{ height: windowWidth > 1440 ? "32px" : "24px" }} />
          {navListTileItems}
        </div>
      </div>

      <div className={`fade-content ${showContent ? "" : "hidden"}`}>
        <SignOutButton />
      </div>
    </div>
  );
};

const caretStyle = {
  width: "4vw",
  height: "1.5vh",
  cursor: "pointer",
};

const logoStyle = {
  width: "8vw",
  height: "3vh",
  paddingLeft: "32px",
};

export default SideNavBar;
