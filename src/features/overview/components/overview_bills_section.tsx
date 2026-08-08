import React from "react";
import { useNavigate } from "react-router";
import "./css/overview_bills_section.css";

import OverviewSectionHeader from "./overview_section_header";
import { sumOfBills } from "../../shared/utility/functions";
import Skeleton from "../../shared/components/skeleton";
import { useRecurringBills } from "../../recurringBills/context/recurring_bills_context";

export const OverviewBillsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { paidBills, upcomingBills, dueSoonBills, pastDueBills, isLoading } =
    useRecurringBills();

  const sumOfBillsPaid = sumOfBills(paidBills);
  const sumOfBillsUpcoming = sumOfBills(upcomingBills);
  const sumOfBillsDueSoon = sumOfBills(dueSoonBills);
  const sumOfBillsPastDue = sumOfBills(pastDueBills);

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
          amount={isLoading ? <Skeleton /> : sumOfBillsPaid}
          tabColor="#277C78"
        />

        <OverviewRecurringBillsListTile
          name="Total Upcoming"
          amount={isLoading ? <Skeleton /> : sumOfBillsUpcoming}
          tabColor="#F2CDAC"
        />

        <OverviewRecurringBillsListTile
          name="Due Soon"
          amount={isLoading ? <Skeleton /> : sumOfBillsDueSoon}
          tabColor="#82C9D7"
        />

        {sumOfBillsPastDue > 0 && (
          <OverviewRecurringBillsListTile
            name="Past Due"
            amount={isLoading ? <Skeleton /> : sumOfBillsPastDue}
            tabColor="#e03b1d"
          />
        )}
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
  amount: React.ReactNode;
  tabColor: string;
}): JSX.Element => {
  return (
    <div
      className="overview-recurring-bills-list-tile"
      style={{ backgroundColor: tabColor }}
    >
      <div className="overview-recurring-bills-list-tile-content">
        <p style={{ fontSize: "14px", color: "#696868" }}>{name}</p>
        <p className="overview-recurring-bills-list-tile-amount">
          {typeof amount === "number" ? `$${amount.toFixed(2)}` : amount}
        </p>
      </div>
    </div>
  );
};
