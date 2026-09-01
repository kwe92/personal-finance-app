import "../../shared/css/base_modal.css";
import "../../shared/css/form-theme.css";
import MainButton from "../../shared/components/main_button";
import TextFormField from "../../shared/components/text_form_field";
import { useUserPreferencesData } from "../../shared/context/user_preferences_context";
import { useState } from "react";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import { ToastService } from "../../shared/services/toast_service";
import { ModalId } from "../../../app/constants/constants";

export const GlobalTargetModal = (): JSX.Element => {
  const { preferences, updateSpendingTarget } = useUserPreferencesData();
  const [value, setValue] = useState(
    preferences?.monthlySpendingTarget.toString() ?? "0",
  );
  const toastService = ToastService.getInstance();

  function closeModal() {
    toastService.closeModal(ModalId.globalTargetModal);
  }

  async function handleSave() {
    await updateSpendingTarget(Number(value));
    closeModal();
  }

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>Edit Monthly Limit</p>
        <CloseModalButton onTap={closeModal} />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        Set a global spending limit to track your total outgoings across all
        categories.
      </p>

      <form className="form-theme" onSubmit={(e) => e.preventDefault()}>
        <TextFormField
          name="globalTarget"
          label="Monthly Spending Target"
          type="number"
          value={value}
          placeholder="$ e.g. 2000.00"
          onChange={(event) => setValue(event.target.value)}
        />
      </form>

      <MainButton onTap={handleSave} disabled={false}>
        Save Target
      </MainButton>
    </div>
  );
};
