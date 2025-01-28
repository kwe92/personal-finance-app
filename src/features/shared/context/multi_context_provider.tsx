import { AuthValidationProvider } from "../../auth/context/auth_validation_context";
import { BudgetProvider } from "./budget_context";
import { DoughnutChartProvider } from "./doughnut_chart_context";
import { FormErrorProvider } from "./form_error_context";
import { PotProvider } from "./pot_context";
import { TransactionProvider } from "./transaction_context";
import { TransactionFilterProvider } from "./transaction_filter_context";

export const MultiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <AuthValidationProvider>
        <FormErrorProvider>
          <TransactionProvider>
            <TransactionFilterProvider>
              <BudgetProvider>
                <PotProvider>
                  <DoughnutChartProvider>{children}</DoughnutChartProvider>
                </PotProvider>
              </BudgetProvider>
            </TransactionFilterProvider>
          </TransactionProvider>
        </FormErrorProvider>
      </AuthValidationProvider>
    </>
  );
};
