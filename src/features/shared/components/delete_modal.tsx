import { CloseModalButton } from "./close_modal_button";

export const DeleteModal = ({
  itemToDelete,
  title,
  handleItemDeletion,
}: {
  itemToDelete: PotData | BudgetData;
  title: string;
  handleItemDeletion: Function;
}): JSX.Element => {
  return (
    <div className="base-modal">
      <div className="base-modal-header">
        <p>{`Delete '${title}'?`}</p>

        <CloseModalButton onTap={() => {}} />
      </div>
    </div>
  );
};
