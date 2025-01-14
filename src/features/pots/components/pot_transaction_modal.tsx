import { useEffect } from "react";
import { ModalId } from "../../../app/constants/constants";
import { CloseModalButton } from "../../shared/components/close_modal_button";
import TextFormField from "../../shared/components/text_form_field";
import { ToastService } from "../../shared/services/toast_service";
import { usePotViewData } from "../context/pot_view_context";
import { pctTotal } from "../../shared/utility/functions";
import MainButton from "../../shared/components/main_button";
import { usePotData } from "../../shared/context/pot_context";
import { Pot } from "../../shared/models/pot";

// TODO: abstract business logic away into functions

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

      <TextFormField
        name="widthdrawAmount"
        label="Amount to Withdraw"
        type="number"
        value={transactionAmount}
        placeholder="$ e.g. 200.00"
        onChange={(event) => {
          // TODO: continue working on as the numbers are rounding up, if the user types 25.799 it will be rounded up to 25.80 implicitly
          const amount = Number(Number(event.target.value).toFixed(2));

          if (isWithdrawal) {
            if (amount <= potToEdit.total) {
              setTransactionAmount(amount.toString());

              const updatedAmount = potToEdit.total - amount;

              setTotal(updatedAmount.toFixed(2));
            }
          } else {
            const updatedAmount = potToEdit.total + amount;

            if (updatedAmount <= potToEdit.target) {
              setTransactionAmount(event.target.value);

              setTotal(updatedAmount.toFixed(2));
            }
          }
        }}
      />

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
            {percentSaved.toFixed(2)}%
          </p>

          <p>Target of ${potToEdit.target.toFixed(2)}</p>
        </div>
      </div>

      <MainButton onTap={handleEditPot}>
        {isWithdrawal ? "Confirm Withdrawal" : "Confirm Addition"}
      </MainButton>
    </div>
  );

  function handleEditPot() {
    const indexOfItemToUpdate = pots!.indexOf(potToEdit);

    const updatedPot = new Pot({
      name: potToEdit.name,
      target: potToEdit.target,
      total: Number(Number(total).toFixed(2)),
      theme: potToEdit.theme,
      // TODO: may need to add created and updated dates in the future
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

const PotTransactionProgressBar = ({
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "12px",
        backgroundColor: "#F8F4F0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: isWithdrawal ? `${percentSaved}%` : `${basePercentSaved}%`,
          height: "inherit",
          backgroundColor: percentSaved < 100 ? color : "lightgreen",
          borderRadius: "8px",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: isWithdrawal ? `${basePercentSaved}%` : `${percentSaved}%`,
          height: "inherit",
          backgroundColor: isWithdrawal ? "#C94736" : "#277C78",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

// TODO: continue working of parsing logic
function parseStringToFixed2(str: string) {
  const parsedString = str.split(".");

  if (parsedString.length > 1) {
    const remainder = parsedString[1];

    const r = remainder.substring(0, 2);

    return parsedString[0] + "." + r;
  }

  return parsedString[0];
}
