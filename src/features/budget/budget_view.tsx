import "./budget_view.css";
import { Divider } from "../shared/components/divider";

import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import * as gaps from "../../app/constants/reusable";

//!! NOTE: view is styled for screens larger than 1440px at the moment
import { BudgetCard } from "./components/budget_component";

// TODO: remove hard coded values

// TODO: remove inline css

export const BudgetView = (): JSX.Element => {
  return (
    <div className="budget-view-main">
      <div className="budget-header-button-section">
        <h1 style={{ color: "#201F24" }}>Budgets</h1>

        <AddNewButton label="Budget" />
      </div>
      <BudgetSummary />

      <BudgetCard />

      <BudgetCard />

      <BudgetCard />
    </div>
  );
};
