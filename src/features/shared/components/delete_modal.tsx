import { ToastService } from "../services/toast_service";
import { CloseModalButton } from "./close_modal_button";
import MainButton from "./main_button";
import TextButton from "./text_button";

export const DeleteModal = ({
  modalId,
  isPot,
  title,
  handleItemDeletion,
}: {
  modalId: string;
  isPot: boolean;
  title: string;
  handleItemDeletion: Function;
}): JSX.Element => {
  const toastService = ToastService.getInstance();

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{`Delete '${title}'?`}</p>
        <CloseModalButton onTap={closeModal} />
      </div>
      <p style={{ color: "#696868", fontSize: "14px" }}>
        Are you sure you want to delete this{" "}
        <span>{isPot ? "pot" : "budget"}</span>? This action cannot be reversed,
        and all the data inside it will be removed forever.
      </p>

      <MainButton
        style={{ backgroundColor: "#C94736", border: "none" }}
        onTap={() => {
          handleItemDeletion();
          closeModal();
        }}
      >
        Yes, Confirm Deletion
      </MainButton>

      <TextButton
        onTap={closeModal}
        style={{
          textDecoration: "none",
          color: "#696868",
          fontSize: "14px",
          fontWeight: "normal",
        }}
      >
        No, Go Back
      </TextButton>
    </div>
  );

  function closeModal() {
    toastService.closeModal(modalId);
  }
};
