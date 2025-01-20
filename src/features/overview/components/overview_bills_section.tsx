import { useNavigate } from "react-router";
import "./css/overview_bills_section.css";

import OverviewSectionHeader from "./overview_section_header";
import { useTransactionData } from "../../shared/context/transaction_context";
import { billsByCategory, sumOfBills } from "../../shared/utility/functions";

// NOTE: note styles are for 1440px!!!!! medium laptop

export const OverviewBillsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const { transactions } = useTransactionData();

  var recurringBills: TransactionData[] = [];

  if (transactions !== null) {
    recurringBills = transactions!.filter((trnasaction) => {
      return trnasaction.recurring === true;
    });
  }

  const paidBills = billsByCategory(recurringBills, "paid");

  const upcomingBills = billsByCategory(recurringBills, "upcoming");

  const dueSoonBills = billsByCategory(recurringBills, "due");

  const sumOfBillsPaid = sumOfBills(paidBills);

  const sumOfBillsUpcoming = sumOfBills(upcomingBills);

  const sumOfBillsDueSoon = sumOfBills(dueSoonBills);

  return (
    <div className="overview-bills-section-container">
      <OverviewSectionHeader
        title="Recurring Bills"
        buttonLabel="See Details"
        onTap={() => {
          navigate("/home/Recurring Bills");
        }}
      />
      <div className="overview-bills-section-content">
        <OverviewRecurringBillsListTile
          name="Paid Bills"
          amount={sumOfBillsPaid}
          tabColor="#277C78"
        />

        <OverviewRecurringBillsListTile
          name="Total Upcoming"
          amount={sumOfBillsUpcoming}
          tabColor="#F2CDAC"
        />

        <OverviewRecurringBillsListTile
          name="Due Soon"
          amount={sumOfBillsDueSoon}
          tabColor="#82C9D7"
        />
      </div>
    </div>
  );
};

const OverviewRecurringBillsListTile = ({
  name,
  amount,
  tabColor,
}: {
  name: string;
  amount: number;
  tabColor: string;
}): JSX.Element => {
  return (
    <div
      className="overview-recurring-bills-list-tile"
      style={{ backgroundColor: tabColor }}
    >
      <div className="overview-recurring-bills-list-tile-content">
        <p style={{ fontSize: "14px", color: "#696868" }}>{name}</p>
        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{`$${amount.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
};
