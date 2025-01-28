import { useFormErrorData } from "../../shared/context/form_error_context";
import { usePotViewData } from "../context/pot_view_context";

export const AmountErrorText = (): JSX.Element => {
  const { potToEdit } = usePotViewData();

  const {
    potTransactionModalAmountError,
    potTransactionModalWithdrawalError,
    potTransactionModalDepositError,
  } = useFormErrorData();

  return (
    <>
      {potTransactionModalAmountError ? (
        <p className="error-text">Set a valid amount value</p>
      ) : (
        <></>
      )}

      {potTransactionModalWithdrawalError ? (
        <p className="error-text">
          You can not withdraw more than the deposited amount of $
          {potToEdit.total.toFixed(2)}
        </p>
      ) : (
        <></>
      )}

      {potTransactionModalDepositError ? (
        <p className="error-text">
          You can deposit more than the target amount of $
          {potToEdit.target.toFixed(2)}
        </p>
      ) : (
        <></>
      )}
    </>
  );
};
