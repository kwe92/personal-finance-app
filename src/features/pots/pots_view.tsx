import "../shared/css/view_container.css";
import "./pots_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { PotCard } from "./components/pot_card";

export const PotsView = (): JSX.Element => {
  return (
    <div className="view-container">
      <div className="budget-header-button-section">
        <h1 style={{ color: "#201F24" }}>Pots</h1>

        <AddNewButton
          label="Pot"
          onTap={() => {
            // TODO: implement, see Budget View for details
          }}
        />
      </div>

      <div className="pots-view-content">
        <PotCard totalSaved={200} target={2000} color={"blue"} />
        <PotCard totalSaved={200} target={2000} color={"blue"} />
        <PotCard totalSaved={200} target={2000} color={"blue"} />
      </div>
    </div>
  );
};
