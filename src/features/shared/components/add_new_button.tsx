import "./css/add_new_button.css";
export const AddNewButton = ({
  label,
  onTap,
}: {
  label: string;
  onTap: React.MouseEventHandler;
}): JSX.Element => (
  <div className="add-new-button" onClick={onTap}>
    <p>+ Add New {label}</p>
  </div>
);
