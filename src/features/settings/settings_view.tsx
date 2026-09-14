import "../shared/css/view_container.css";
import "./settings_view.css";
import TabsForm from "./components/tabs_form";

export const SettingsView = (): JSX.Element => {
  return (
    <div className="view-container">
      <h1>Settings</h1>
      <div className="settings-view-content">
        <TabsForm />
      </div>
    </div>
  );
};
