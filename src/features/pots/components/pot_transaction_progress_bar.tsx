import "./css/pot_transaction_progress_bar.css";
import { pctTotal } from "../../shared/utility/functions";
import { usePotViewData } from "../context/pot_view_context";

export const PotTransactionProgressBar = ({
  basePercentSaved,
  totalSaved,
  target,
  color,
}: {
  basePercentSaved: number;
  totalSaved: number;
  target: number;
  color: string;
}): JSX.Element => {
  const { isWithdrawal } = usePotViewData();

  const percentSaved = pctTotal(totalSaved, target);

  return (
    <div className="pot-transaction-progress-bar-main">
      <div
        className="pot-transaction-top-progress-bar"
        style={{
          width: isWithdrawal ? `${percentSaved}%` : `${basePercentSaved}%`,
          backgroundColor: percentSaved < 100 ? color : "lightgreen",
        }}
      />

      <div
        className="pot-transaction-bottom-progress-bar"
        style={{
          width: isWithdrawal ? `${basePercentSaved}%` : `${percentSaved}%`,
          backgroundColor: isWithdrawal ? "#C94736" : "#277C78",
        }}
      />
    </div>
  );
};
