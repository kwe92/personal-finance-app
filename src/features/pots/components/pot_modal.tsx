import { ModalId } from "../../../app/constants/constants";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import MainButton from "../../shared/components/main_button";
import { ModalDropDownMenu } from "../../shared/components/modal_drop_down_menu";
import TextFormField from "../../shared/components/text_form_field";
import { useFormErrorData } from "../../shared/context/form_error_context";
import { usePotData } from "../../shared/context/pot_context";
import { ToastService } from "../../shared/services/toast_service";
import { usePotViewData } from "../context/pot_view_context";
import { ColorTagDropdownItem } from "../../shared/components/color_tag_drop_down_item";
import { Divider } from "../../shared/components/divider";

export const PotModal = (): JSX.Element => {
  const toastService = ToastService.getInstance();

  const { addPotHandler, updatePotHandler } = usePotData();

  const {
    potName,
    potToEdit,
    setPotName,
    target,
    setTarget,
    selectedColorTag,
    setSelectedColorTag,
    potColorTags,
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

  const colorTagContent = potColorTags.map((colorTag, i) => (
    <div key={colorTag.theme || i}>
      <li
        style={{
          padding: "12px 0 12px 0",
          cursor: colorTag.isInUse ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (!colorTag.isInUse) setSelectedColorTag(colorTag);
        }}
      >
        <ColorTagDropdownItem
          name={colorTag.name}
          theme={colorTag.theme}
          isInUse={colorTag.isInUse}
        />
      </li>
      {potColorTags.length - 1 !== i && <Divider />}
    </div>
  ));

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
        onSubmit={(e) => e.preventDefault()}
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
          {potModalNameError && (
            <p className="error-text">Name field can not be empty</p>
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
          {potModalTargetError && (
            <p className="error-text">Set a valid target value</p>
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
          {potModalColorTagError && (
            <p className="error-text">Select a color tag</p>
          )}
        </div>
      </form>

      <MainButton onTap={handlePotModalSubmit} disabled={false}>
        {!editPot ? "Add Pot" : "Save Changes"}
      </MainButton>
    </div>
  );

  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".modal-drop-down-menu",
      ".modal-drop-down-menu-content",
    );
  }

  function isValidFormData(): boolean {
    const validName = potName.trim().length > 0;
    const validPotTarget = Number(target) > 0;
    const validColorTag =
      selectedColorTag.theme !== "transparent" && selectedColorTag.theme !== "";

    if (!validName) setPotModalNameError(true);
    if (!validPotTarget) setPotModalTargetError(true);
    if (!validColorTag) setPotModalColorTagError(true);

    return validName && validPotTarget && validColorTag;
  }

  async function handleAddNewPot() {
    try {
      await addPotHandler({
        name: potName,
        target: Number(target),
        total: 0,
        theme: selectedColorTag.theme,
      });
    } catch (error) {
      console.error("Failed to add pot:", error);
    }
  }

  async function handleEditPot() {
    const targetId = potToEdit?.id ?? potToEdit?.id;
    if (!targetId) return;

    try {
      await updatePotHandler(targetId, {
        name: potName,
        target: Number(target),
        total: potToEdit.total,
        theme: selectedColorTag.theme,
      });
    } catch (error) {
      console.error("Failed to update pot:", error);
    }
  }

  async function handlePotModalSubmit() {
    if (isValidFormData()) {
      if (editPot) {
        await handleEditPot();
      } else {
        await handleAddNewPot();
      }
      closeModal();
    }
  }

  function closeModal() {
    toastService.closeModal(ModalId.potModal);
    resetPotModalData();
  }
};
