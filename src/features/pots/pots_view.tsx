import "../shared/css/view_container.css";
import "../shared/css/button_header_section.css";
import "./pots_view.css";
import { AddNewButton } from "../shared/components/add_new_button";
import { PotCard } from "./components/pot_card";
import { usePotData } from "../shared/context/pot_context";
import { ModalWrapper } from "../shared/components/modal_wrapper";
import { PotModal } from "./components/pot_modal";
import { ToastService } from "../shared/services/toast_service";
import { usePotViewData } from "./context/pot_view_context";
import { DeleteModal } from "../shared/components/delete_modal";
import { ModalId } from "../../app/constants/constants";
import { PotsTransactionModal } from "./components/pot_transaction_modal";

export const PotsView = (): JSX.Element => {
  const modalId = ModalId.potModal;

  const toastService = ToastService.getInstance();

  const { pots, setPots } = usePotData();

  const { resetPotModalData, potToDelete } = usePotViewData();

  var potCards: React.ReactNode[] = [];

  potCards = pots.map((potData, i) => {
    return <PotCard pot={potData} />;
  });

  return (
    <div className="view-container" style={{ overflowY: "scroll" }}>
      <div className="button-header-section">
        <h1 style={{ color: "#201F24" }}>Pots</h1>

        <AddNewButton
          label="Pot"
          onTap={() => {
            toastService.toogleModal(modalId, resetPotModalData);
          }}
        />
      </div>

      <div className="pots-view-content">{potCards}</div>

      <ModalWrapper id={modalId}>
        <PotModal />
      </ModalWrapper>

      <ModalWrapper id={ModalId.deletePotModal}>
        <DeleteModal
          modalId={ModalId.deletePotModal}
          isPot={true}
          title={potToDelete.name}
          handleItemDeletion={handleDeletePot}
        />
      </ModalWrapper>

      <ModalWrapper id={ModalId.potTransactionModal}>
        <PotsTransactionModal />
      </ModalWrapper>
    </div>
  );

  function handleDeletePot() {
    const updatedPots = pots?.filter((currentPotItem) => {
      return currentPotItem !== potToDelete;
    });
    setPots(updatedPots!);
  }
};
