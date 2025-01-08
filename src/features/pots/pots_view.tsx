import "../shared/css/view_container.css";
import "./pots_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { PotCard } from "./components/pot_card";
import { usePotData } from "../shared/context/pot_context";

//!! TODO: start working on pots modal to add and edit

export const PotsView = (): JSX.Element => {
  const { pots } = usePotData();

  var potCards: React.ReactNode[] = [];

  if (pots !== null) {
    potCards = pots.map((potData, i) => {
      return <PotCard potData={potData} />;
    });
  }

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

      <div className="pots-view-content">{potCards}</div>
    </div>
  );
};
