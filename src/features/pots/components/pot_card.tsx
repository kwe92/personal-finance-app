import "./css/pot_card.css";

import { CardHeader } from "../../shared/components/card_header";
import MainButton from "../../shared/components/main_button";
import { ToastService } from "../../shared/services/toast_service";
import { usePotData } from "../../shared/context/pot_context";
import { usePotViewData } from "../context/pot_view_context";
import { ModalClassName, ModalId } from "../../../app/constants/constants";
import { pctTotal } from "../../shared/utility/functions";

export const PotCard = ({ pot }: { pot: PotData }): JSX.Element => {
  const toastService = ToastService.getInstance();

  const percentSaved = pctTotal(pot.total, pot.target);

  const { pots } = usePotData();

  const {
    setEditPot,
    setPotToEdit,
    setPotName,
    setTarget,
    setSelectedColorTag,
    potColorTags,
    resetPotModalData,
    setPotToDelete,
    setIsWithdrawal,
  } = usePotViewData();

  const buttonStyle = {
    backgroundColor: "#F8F4F0",
    border: "none",
    color: "black",
  };
  return (
    <>
      <div className="pot-card-main">
        {/* card header */}

        <CardHeader
          color={pot.theme}
          name={pot.name}
          dropdownText="Pot"
          dropdownClassName="pot-card-dropdown"
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
            <p>{percentSaved.toFixed(3)}%</p>

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
          <MainButton style={buttonStyle} onTap={handlePotAdd}>
            + Add Money
          </MainButton>
          <MainButton style={buttonStyle} onTap={handlePotWithdrawal}>
            Withdraw
          </MainButton>
        </div>
      </div>
    </>
  );

  function handleIconTap() {
    toastService.toggleDropDownMenu(
      pots!.indexOf(pot),
      ModalClassName.potCardDropDown,
      ModalClassName.cardDropDownMenu
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

    closeMenu();

    toastService.toogleModal(ModalId.potModal, resetPotModalData);
  }

  function handleDeletePotCard() {
    setPotToDelete(pot);

    const toastService = ToastService.getInstance();

    closeMenu();

    toastService.toogleModal(ModalId.deletePotModal, resetPotModalData);
  }

  function handlePotAdd() {
    setPotToEdit(pot);

    toastService.toogleModal(ModalId.potTransactionModal, resetPotModalData);
  }
  function handlePotWithdrawal() {
    setIsWithdrawal(true);
    setPotToEdit(pot);

    toastService.toogleModal(ModalId.potTransactionModal, resetPotModalData);
  }

  function closeMenu() {
    const dropdownContent = document.querySelectorAll(
      ModalClassName.cardDropDownMenu
    )[pots!.indexOf(pot)];

    dropdownContent!.classList.toggle("show");
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
