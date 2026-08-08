import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./css/overview_bills_section.css";

import OverviewSectionHeader from "./overview_section_header";
import { sumOfBills } from "../../shared/utility/functions";
import { getRecurringBills } from "../../shared/services/backend_service";
import Skeleton from "../../shared/components/skeleton";

export const OverviewBillsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [recurringBills, setRecurringBills] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //! TODO: Refactor: this should not be happening within the widget
  useEffect(() => {
    let isMounted = true;

    const fetchRecurringBills = async () => {
      setIsLoading(true);

      try {
        const response = await getRecurringBills();

        if (!isMounted) {
          return;
        }

        setRecurringBills(response.recurringBills ?? []);
      } catch (error) {
        if (isMounted) {
          setRecurringBills([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRecurringBills();

    return () => {
      isMounted = false;
    };
  }, []);

  const paidBills = recurringBills.filter((bill) => bill.status === "paid");
  const upcomingBills = recurringBills.filter(
    (bill) => bill.status === "upcoming",
  );
  const dueSoonBills = recurringBills.filter(
    (bill) => bill.status === "due_soon",
  );

  const pastDueBills = recurringBills.filter(
    (bill) => bill.status === "past_due",
  );

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
