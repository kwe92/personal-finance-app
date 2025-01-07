import "../shared/css/view_container.css";
import { AddNewButton } from "../shared/components/add_new_button";

export const PotsView = (): JSX.Element => {
  return (
    // TODO: move shared CSS to shared folder: budget-view-main, budget-header-button-section
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
    </div>
  );
};
