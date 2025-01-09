import "./css/pot_card.css";

import { CardHeader } from "../../shared/components/card_header";
import MainButton from "../../shared/components/main_button";
import { ToastService } from "../../shared/services/toast_service";
import { usePotData } from "../../shared/context/pot_context";
import { usePotViewData } from "../context/pot_view_context";
import { ModalWrapper } from "../../shared/components/modal_wrapper";
import { DeleteModal } from "../../shared/components/delete_modal";

export const PotCard = ({ pot }: { pot: PotData }): JSX.Element => {
  const headerDropdownClassName = "pot-card-dropdown";

  const toastService = ToastService.getInstance();

  const percentSaved = pctTotal(pot.total, pot.target);

  const { pots, setPots } = usePotData();

  const {
    setEditPot,
    setPotToEdit,
    setPotName,
    setTarget,
    setSelectedColorTag,
    potColorTags,
    resetPotModalData,
  } = usePotViewData();

  const buttonStyle = {
    backgroundColor: "#F8F4F0",
    border: "none",
    color: "black",
  };
  return (
    <div className="pot-card-main">
      {/* card header */}

      <CardHeader
        color={pot.theme}
        name={pot.name}
        dropdownText="Pot"
        dropdownClassName={headerDropdownClassName}
        onIconTap={handleIconTap}
        handleEditItem={handleEditPotCard}
        handleDeleteItem={handleDeletePotCard}
      />

      <div className="pot-card-total-saved">
        <p>Total Saved</p>
        <p>${pot.total.toFixed(2)}</p>
      </div>

      {/* progress bar / percent saved */}
      <div className="pot-card-progress">
        <PotProgressBar
          totalSaved={pot.total}
          target={pot.target}
          color={pot.theme}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>{percentSaved.toFixed(2)}%</p>

          <p>Target of ${pot.target.toFixed(2)}</p>
        </div>
      </div>

      {/* buttons */}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <MainButton style={buttonStyle}>+ Add Money</MainButton>
        <MainButton style={buttonStyle}>Withdraw</MainButton>
      </div>
    </div>

    // <ModalWrapper id={modalId}>
    // <DeleteModal />
    // </ModalWrapper>
  );

  function handleIconTap() {
    toastService.toggleDropDownMenu(
      pots!.indexOf(pot),
      `.${headerDropdownClassName}`,
      ".card-drop-down-menu"
    );
  }

  function handleEditPotCard() {
    setEditPot(true);
    setPotToEdit(pot);
    setPotName(pot.name);
    setTarget(pot.target);
    setSelectedColorTag(
      potColorTags.find((colorTag) => {
        return colorTag.theme === pot.theme;
      })
    );
    // TODO: we need to do something about all these hard coded values surrounding modals
    toastService.toogleModal("add-new-pot-modal", resetPotModalData);
  }

  //!! TODO: continue working on delete modal logic
  function handleDeletePotCard() {
    const toastService = ToastService.getInstance();

    toastService.toogleModal("delete-pot-modal");

    // const updatedPots = pots?.filter((currentPotItem) => {
    //   return currentPotItem !== pot;
    // });
    // setPots(updatedPots!);
  }
};

const PotProgressBar = ({
  totalSaved,
  target,
  color,
}: {
  totalSaved: number;
  target: number;
  color: string;
}): JSX.Element => {
  const percentSaved = pctTotal(totalSaved, target);
  return (
    <div
      style={{
        width: "100%",
        height: "12px",
        backgroundColor: "#F8F4F0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          width: `${percentSaved}%`,
          height: "inherit",
          backgroundColor: percentSaved < 100 ? color : "lightgreen",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

function pctTotal(amount: number, total: number): number {
  const percentOfTotal = (amount / total) * 100;

  return percentOfTotal;
}
