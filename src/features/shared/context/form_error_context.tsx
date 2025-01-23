import { createContext, useContext, useState } from "react";

const FormErrorContext = createContext<{
  budgetModalBudgetCategoryError: boolean;
  budgetModalMaxSpendingError: boolean;
  budgetModalColorTagError: boolean;
  potModalNameError: boolean;
  potModalTargetError: boolean;
  potModalColorTagError: boolean;
  potTransactionModalAmountError: boolean;
  potTransactionModalWithdrawalError: boolean;
  potTransactionModalDepositError: boolean;
  setBudgetModalBudgetCategoryError: Function;
  setBudgetModalMaxSpendingError: Function;
  setBudgetModalColorTagError: Function;
  setPotModalNameError: Function;
  setPotModalTargetError: Function;
  setPotModalColorTagError: Function;
  setPotTransactionModalWithdrawalError: Function;
  setPotTransactionModalDepositError: Function;

  resetBudgetModalErrors: Function;
  resetPotModalErrors: Function;
  setPotTransactionModalAmountError: Function;
}>({
  budgetModalBudgetCategoryError: false,
  budgetModalMaxSpendingError: false,
  budgetModalColorTagError: false,
  potModalNameError: false,
  potModalTargetError: false,
  potModalColorTagError: false,
  potTransactionModalAmountError: false,
  potTransactionModalWithdrawalError: false,
  potTransactionModalDepositError: false,
  setBudgetModalBudgetCategoryError: () => {},
  setBudgetModalMaxSpendingError: () => {},
  setBudgetModalColorTagError: () => {},
  setPotModalNameError: () => {},
  setPotModalTargetError: () => {},
  setPotModalColorTagError: () => {},
  setPotTransactionModalAmountError: () => {},
  setPotTransactionModalWithdrawalError: () => {},
  setPotTransactionModalDepositError: () => {},
  resetBudgetModalErrors: () => {},
  resetPotModalErrors: () => {},
});

const FormErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [budgetModalBudgetCategoryError, setBudgetModalBudgetCategoryError] =
    useState<boolean>(false);

  const [budgetModalMaxSpendingError, setBudgetModalMaxSpendingError] =
    useState<boolean>(false);

  const [budgetModalColorTagError, setBudgetModalColorTagError] =
    useState<boolean>(false);

  const [potModalNameError, setPotModalNameError] = useState<boolean>(false);

  const [potModalTargetError, setPotModalTargetError] =
    useState<boolean>(false);

  const [potModalColorTagError, setPotModalColorTagError] =
    useState<boolean>(false);

  const [potTransactionModalAmountError, setPotTransactionModalAmountError] =
    useState<boolean>(false);

  const [potTransactionModalDepositError, setPotTransactionModalDepositError] =
    useState<boolean>(false);

  const [
    potTransactionModalWithdrawalError,
    setPotTransactionModalWithdrawalError,
  ] = useState<boolean>(false);

  function resetBudgetModalErrors() {
    setBudgetModalBudgetCategoryError(false);
    setBudgetModalMaxSpendingError(false);
    setBudgetModalColorTagError(false);
  }

  function resetPotModalErrors() {
    setPotModalNameError(false);
    setPotModalTargetError(false);
    setPotModalColorTagError(false);
    setPotTransactionModalAmountError(false);
    setPotTransactionModalDepositError(false);
    setPotTransactionModalWithdrawalError(false);
  }

  return (
    <FormErrorContext.Provider
      value={{
        budgetModalBudgetCategoryError,
        budgetModalMaxSpendingError,
        budgetModalColorTagError,
        potModalNameError,
        potModalTargetError,
        potModalColorTagError,
        potTransactionModalAmountError,
        potTransactionModalWithdrawalError,
        potTransactionModalDepositError,
        setBudgetModalBudgetCategoryError,
        setBudgetModalMaxSpendingError,
        setBudgetModalColorTagError,
        setPotModalNameError,
        setPotModalTargetError,
        setPotModalColorTagError,
        setPotTransactionModalAmountError,
        setPotTransactionModalWithdrawalError,
        setPotTransactionModalDepositError,
        resetBudgetModalErrors,
        resetPotModalErrors,
      }}
    >
      {children}
    </FormErrorContext.Provider>
  );
};

const useFormErrorData = () => useContext(FormErrorContext);

export { FormErrorProvider, useFormErrorData };
