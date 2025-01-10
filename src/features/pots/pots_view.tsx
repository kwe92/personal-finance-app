import "../shared/css/view_container.css";
import "./pots_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { PotCard } from "./components/pot_card";
import { usePotData } from "../shared/context/pot_context";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { AddNewPotModal } from "./components/add_new_pot_modal";
import { ToastService } from "../shared/services/toast_service";
import { usePotViewData } from "./context/pot_view_context";
import { DeleteModal } from "../shared/components/delete_modal";

export const PotsView = (): JSX.Element => {
  const modalId = "add-new-pot-modal";

  const toastService = ToastService.getInstance();

  const { pots } = usePotData();

  const { resetPotModalData } = usePotViewData();

  var potCards: React.ReactNode[] = [];

  if (pots !== null) {
    potCards = pots.map((potData, i) => {
      return <PotCard pot={potData} />;
    });
  }

  return (
    <div className="view-container">
      <div className="budget-header-button-section">
        <h1 style={{ color: "#201F24" }}>Pots</h1>

        <AddNewButton
          label="Pot"
          onTap={() => {
            // TODO: may need to add reset modal content function to toogleModal
            toastService.toogleModal(modalId, resetPotModalData);
          }}
        />
      </div>

      <div className="pots-view-content">{potCards}</div>

      <ModalWrapper id={modalId} contentId={`${modalId}-content`}>
        <AddNewPotModal />
      </ModalWrapper>
    </div>
  );
};
