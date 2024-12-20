import "./css/add_new_button.css";
export const AddNewButton = ({ label }: { label: string }): JSX.Element => (
  <div className="add-new-button">
    <p>+ Add New {label}</p>
  </div>
);
