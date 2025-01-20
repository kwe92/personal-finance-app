import "./css/recurring_bills_table.css";
import * as gaps from "../../../app/constants/reusable";
import useWindowSize from "../../shared/hooks/use_window_size";
import { useRecurringBillsViewData } from "../context/recurring_bills_context";
import { RecurringBillsRow } from "./recurring_bills_row";
import {
  getBillCategory,
  getDaysDifference,
} from "../../shared/utility/functions";

export const RecurringBillsTable = (): JSX.Element => {
  const { windowWidth } = useWindowSize();

  const { recurringBills } = useRecurringBillsViewData();

  const recurringBillsRowItems = recurringBills.map((bill, i) => {
    return <RecurringBillsRow bill={bill} billStatus={getBillCategory(bill)} />;
  });

  return (
    <div className="transaction-table-wrapper">
      <table>
        <tr>
          <th style={{ textAlign: "start" }}>Bill Title</th>
          <th style={{ textAlign: "center" }}>Due Date</th>
          <th style={{ textAlign: "end" }}>Amount</th>
        </tr>
        {windowWidth > 1200 ? <gaps.GapH24 /> : <gaps.GapH16 />}
        <tbody>{recurringBillsRowItems}</tbody>
      </table>
    </div>
  );
};
