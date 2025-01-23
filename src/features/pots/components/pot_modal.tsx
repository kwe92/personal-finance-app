import { ModalId } from "../../../app/constants/constants";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import MainButton from "../../shared/components/main_button";
import { ModalDropDownMenu } from "../../shared/components/modal_drop_down_menu";
import TextFormField from "../../shared/components/text_form_field";
import { useFormErrorData } from "../../shared/context/form_error_context";
import { usePotData } from "../../shared/context/pot_context";
import { Pot } from "../../shared/models/pot";
import { ToastService } from "../../shared/services/toast_service";
import { usePotViewData } from "../context/pot_view_context";

export const PotModal = () => {
  const toastService = ToastService.getInstance();

  const { pots, setPots } = usePotData();

  const {
    potName,
    potToEdit,
    setPotName,
    target,
    setTarget,
    selectedColorTag,
    colorTagContent,
    resetPotModalData,
    editPot,
  } = usePotViewData();

  const {
    potModalNameError,
    potModalTargetError,
    potModalColorTagError,
    setPotModalNameError,
    setPotModalTargetError,
    setPotModalColorTagError,
  } = useFormErrorData();

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{!editPot ? "Add New Pot" : "Edit Pot"}</p>

        <CloseModalButton onTap={closeModal} />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        {!editPot
          ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          : "If your saving targets change, feel free to update your pots."}
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={(e) => {
          e.preventDefault(); // prevent form default behavior, add custom frontend form handling
        }}
      >
        <div>
          <TextFormField
            name="potName"
            label="Pot Name"
            type="text"
            value={potName}
            placeholder="$ e.g. Rainy Days"
            onChange={(event) => {
              setPotModalNameError(false);
              setPotName(event.target.value);
            }}
          />
          {potModalNameError ? (
            <p className="error-text">Name field can not be empty.</p>
          ) : (
            <></>
          )}
        </div>

        <div>
          <TextFormField
            name="target"
            label="Target"
            type="number"
            value={target}
            placeholder="$ e.g. 200.00"
            onChange={(event) => {
              setPotModalTargetError(false);
              setTarget(event.target.value);
            }}
          />
          {potModalTargetError ? (
            <p className="error-text">Set a valid target value.</p>
          ) : (
            <></>
          )}
        </div>

        <div>
          <ModalDropDownMenu
            isColorTag={true}
            label="Color Tag"
            tagColor={selectedColorTag.theme}
            initialValue={selectedColorTag.name}
            content={colorTagContent}
            toggleMenu={() => {
              setPotModalColorTagError(false);
              toggleMenu(0);
            }}
          />
          {potModalColorTagError ? (
            <p className="error-text">Select a color tag.</p>
          ) : (
            <></>
          )}
        </div>
      </form>

      <MainButton onTap={handlePotModalSubmit}>
        {!editPot ? "Add Pot" : "Save Changes"}
      </MainButton>
    </div>
  );

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".modal-drop-down-menu",
      ".modal-drop-down-menu-content"
    );
  }

  function handlePotModalSubmit() {
    if (isValidFormData()) {
      if (editPot) {
        handleEditPot();
      } else {
        handleAddNewPot();
      }
      closeModal();
    }
  }

  function isValidFormData(): boolean {
    const validName = potName.length > 0;

    const validPotTarget = Number(target) > 0;

    const validColorTag = selectedColorTag.theme !== "transparent";

    if (!validName) {
      setPotModalNameError(true);
    }
    if (!validPotTarget) {
      setPotModalTargetError(true);
    }
    if (!validColorTag) {
      setPotModalColorTagError(true);
    }
    return validName && validPotTarget && validColorTag;
  }

  function handleAddNewPot() {
    setPots((previousPots) => {
      return [
        new Pot({
          name: potName,
          target: Number(Number(target).toFixed(2)),
          total: 0,
          theme: selectedColorTag.theme,
        }),
        ...(previousPots ?? []),
      ];
    });
  }

  function handleEditPot() {
    const indexOfItemToUpdate = pots!.indexOf(potToEdit);

    const updatedPot = new Pot({
      name: potName,
      target: Number(Number(target).toFixed(2)),
      total:
        Number(Number(target).toFixed(2)) > potToEdit.total
          ? potToEdit.total
          : 0,
      theme: selectedColorTag.theme,
      // may need to add created and updated dates in the future
      // createdAt: potToEdit.createdAt,
      // updatedAt: formatDate(new Date().toLocaleString()),
    });

    pots!.splice(indexOfItemToUpdate, 1, updatedPot);

    // needs to be unpacked or the doughnut chart will not update
    setPots([...pots!]);
  }

  function closeModal() {
    toastService.closeModal(ModalId.potModal);
    resetPotModalData();
  }
};
