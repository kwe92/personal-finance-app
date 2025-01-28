import { useEffect } from "react";
import { ModalId } from "../../../app/constants/constants";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import TextFormField from "../../shared/components/text_form_field";
import { ToastService } from "../../shared/services/toast_service";
import { usePotViewData } from "../context/pot_view_context";
import {
  currencyArithmetic,
  parseStringToCurrency,
  pctTotal,
} from "../../shared/utility/functions";
import MainButton from "../../shared/components/main_button";
import { usePotData } from "../../shared/context/pot_context";
import { Pot } from "../../shared/models/pot";
import { PotTransactionProgressBar } from "./pot_transaction_progress_bar";
import { useFormErrorData } from "../../shared/context/form_error_context";
import { AmountErrorText } from "./amount_error_text";

export const PotsTransactionModal = (): JSX.Element => {
  const { pots, setPots } = usePotData();

  const {
    potToEdit,
    transactionAmount,
    setTransactionAmount,
    total,
    setTotal,
    isWithdrawal,
    resetPotModalData,
  } = usePotViewData();

  const {
    potTransactionModalAmountError,
    potTransactionModalWithdrawalError,
    potTransactionModalDepositError,
    setPotTransactionModalAmountError,
    setPotTransactionModalWithdrawalError,
    setPotTransactionModalDepositError,
  } = useFormErrorData();

  const percentSaved = pctTotal(Number(total), potToEdit.target);

  const basePercentSaved = pctTotal(potToEdit.total, potToEdit.target);

  useEffect(() => {
    setTotal(potToEdit.total.toFixed(2));
  }, [potToEdit]);

  return (
    <div className="base-modal">
      <div className="base-modal-header">
        {/* title */}
        <p>
          {isWithdrawal
            ? `Withdraw from '${potToEdit.name}'`
            : `Add to '${potToEdit.name}'`}
        </p>
        <CloseModalButton onTap={closeModal} />
      </div>
      <p
        style={{
          fontSize: "14px",
          color: "#696868",
        }}
      >
        {isWithdrawal
          ? "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
          : "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."}
      </p>

      <div className="pot-card-total-saved">
        <p>New Amount</p>
        <p>${Number(total).toFixed(2)}</p>
      </div>

      <div>
        <TextFormField
          name="widthdrawAmount"
          label={`Amount to ${isWithdrawal ? "Withdraw" : "Add"}`}
          type="number"
          value={transactionAmount}
          placeholder="$ e.g. 200.00"
          onChange={(event) => {
            if (potTransactionModalAmountError) {
              setPotTransactionModalAmountError(false);
            }

            handleAmountChange(event);
          }}
        />

        <AmountErrorText />
      </div>

      <div className="pot-card-progress">
        <PotTransactionProgressBar
          basePercentSaved={basePercentSaved}
          totalSaved={Number(total)}
          target={potToEdit.target}
          color={potToEdit.theme}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: isWithdrawal
                ? `${percentSaved < basePercentSaved ? "#C94736" : ""}`
                : `${percentSaved > basePercentSaved ? "#277C78" : ""}`,
            }}
          >
            {percentSaved.toFixed(3)}%
          </p>

          <p>Target of ${potToEdit.target.toFixed(2)}</p>
        </div>
      </div>

      <MainButton onTap={handleEditPot}>
        {isWithdrawal ? "Confirm Withdrawal" : "Confirm Addition"}
      </MainButton>
    </div>
  );

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const amount = Number(parseStringToCurrency(event.target.value));

    if (isWithdrawal) {
      if (amount > potToEdit.total) {
        setPotTransactionModalWithdrawalError(true);
      } else {
        if (potTransactionModalWithdrawalError) {
          setPotTransactionModalWithdrawalError(false);
        }

        setTransactionAmount(amount.toString());

        const updatedAmount = currencyArithmetic(
          potToEdit.total,
          amount,
          "sub"
        );

        setTotal(updatedAmount.toString());
      }
      return;
    }
    const updatedAmount = currencyArithmetic(potToEdit.total, amount, "add");

    if (updatedAmount <= potToEdit.target) {
      if (potTransactionModalDepositError) {
        setPotTransactionModalDepositError(false);
      }
      setTransactionAmount(amount.toString());

      setTotal(updatedAmount.toString());
    } else {
      setPotTransactionModalDepositError(true);
    }
  }

  function handleEditPot() {
    if (Number(transactionAmount) <= 0) {
      setPotTransactionModalAmountError(true);
      return;
    }
    const indexOfItemToUpdate = pots!.indexOf(potToEdit);

    const updatedPot = new Pot({
      name: potToEdit.name,
      target: potToEdit.target,
      total: Number(total),
      theme: potToEdit.theme,
      // may need to add created and updated dates in the future
      // createdAt: potToEdit.createdAt,
      // updatedAt: formatDate(new Date().toLocaleString()),
    });

    pots!.splice(indexOfItemToUpdate, 1, updatedPot);

    // needs to be unpacked or the doughnut chart will not update
    setPots([...pots!]);

    closeModal();
  }

  function closeModal() {
    const toastService = ToastService.getInstance();
    toastService.closeModal(ModalId.potTransactionModal);
    resetPotModalData();
  }
};
