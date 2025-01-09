import { CloseModalButton } from "./close_modal_button";

export const DeleteModal = ({
  itemToDelete,
  handleItemDeletion,
}: {
  itemToDelete?: PotData | BudgetData;
  handleItemDeletion: Function;
}): JSX.Element => {
  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>Delete</p>

        <CloseModalButton onTap={() => {}} />
      </div>
    </div>
  );
};
