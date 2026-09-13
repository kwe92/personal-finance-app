import "./overview_view.css";
import "../shared/css/view_container.css";
import signOutIcon from "../../assets/images/sign_out_icon.svg";
import settingsIcon from "../../assets/images/gear-icon.svg";

import OverviewPotsTransactionSection from "./components/overview_pots_transaction_section";
import OverviewListTileRow from "./components/overview_list_tile_row";
import OverviewBudgetBillsSection from "./components/overview-budget-bills-section";
import useWindowSize from "../shared/hooks/use_window_size";
import { IconButton } from "../shared/components/icon_button";
import { useAuth } from "../auth/context/auth_context";
import { useNavigate } from "react-router";

const OverviewView = (): JSX.Element => {
  const { windowWidth } = useWindowSize();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="view-container" style={{ overflowY: "scroll" }}>
      <div className="overview-view-header-section">
        <h1 style={{ color: "#201F24" }}>Overview</h1>
        {windowWidth <= 1200 ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <IconButton
              icon={settingsIcon}
              iconOnly={true}
              button_text=""
              onClick={(_) => {
                navigate("/home/Settings");
              }}
            />
            <IconButton
              icon={signOutIcon}
              iconOnly={true}
              button_text=""
              onClick={(_) => {
                logout();
                navigate("/auth/login");
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <OverviewListTileRow />
      <div className="overview-view-secondary">
        <OverviewPotsTransactionSection />
        <OverviewBudgetBillsSection />
      </div>
    </div>
  );
};

export default OverviewView;
