import { useNavigate } from "react-router";
import MainButton from "../../shared/components/main_button";

const WelcomeView = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="welcome-screen-container">
      <div className="welcome-screen-card">
        <h1>Welcome to Personal Finance</h1>
        <p>
          To continue, please connect your bank account with Plaid so we can
          show your latest transactions and budgets.
        </p>
        <MainButton
          disabled={false}
          type="button"
          onTap={() => {
            navigate("/home/Overview");
          }}
        >
          Start Plaid Setup
        </MainButton>
      </div>
    </div>
  );
};

export default WelcomeView;
