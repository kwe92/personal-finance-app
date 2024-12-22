import "./budget_view.css";
import { Divider } from "../shared/components/divider";

import { AddNewButton } from "../shared/components/add_new_button";
import { BudgetSummary } from "./components/budget_summary";
import * as gaps from "../../app/constants/reusable";

import { BudgetCard } from "./components/budget_card";

// TODO: remove hard coded values

export const BudgetView = (): JSX.Element => {
  return (
    <div className="budget-view-main">
      <div className="budget-header-button-section">
        <h1 style={{ color: "#201F24" }}>Budgets</h1>

        <AddNewButton label="Budget" />
      </div>
      <BudgetSummary />

      <BudgetCard index={0} />

      <BudgetCard index={1} />

      <BudgetCard index={2} />
    </div>
  );
};
