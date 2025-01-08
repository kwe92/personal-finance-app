import "./css/pot_card.css";

import { CardHeader } from "../../shared/components/card_header";
import MainButton from "../../shared/components/main_button";

// TODO: props should eventually be a single Model / DTO
export const PotCard = ({ potData }: { potData: PotData }): JSX.Element => {
  const percentSaved = pctTotal(potData.total, potData.target);

  const buttonStyle = {
    backgroundColor: "#F8F4F0",
    border: "none",
    color: "black",
  };
  return (
    <div className="pot-card-main">
      {/* card header */}

      <CardHeader
        color={potData.theme}
        name={potData.name}
        dropdownText="Pot"
        dropdownClassName="pot-card-dropdown"
        onIconTap={() => {
          // TODO: implement
        }}
        handleEditItem={() => {
          // TODO: implement
        }}
        handleDeleteItem={() => {
          // TODO: implement
        }}
      />

      <div className="pot-card-total-saved">
        <p>Total Saved</p>
        <p>${potData.total.toFixed(2)}</p>
      </div>

      {/* progress bar / percent saved */}
      <div className="pot-card-progress">
        <PotProgressBar
          totalSaved={potData.total}
          target={potData.target}
          color={potData.theme}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>{percentSaved.toFixed(2)}%</p>

          <p>Target of ${potData.target.toFixed(2)}</p>
        </div>
      </div>

      {/* buttons */}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <MainButton style={buttonStyle}>+ Add Money</MainButton>
        <MainButton style={buttonStyle}>Withdraw</MainButton>
      </div>
    </div>
  );
};

const PotProgressBar = ({
  totalSaved,
  target,
  color,
}: {
  totalSaved: number;
  target: number;
  color: string;
}): JSX.Element => {
  const percentSaved = pctTotal(totalSaved, target);
  return (
    <div
      style={{
        width: "100%",
        height: "12px",
        backgroundColor: "#F8F4F0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          width: `${percentSaved}%`,
          height: "inherit",
          backgroundColor: percentSaved < 100 ? color : "lightgreen",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

function pctTotal(amount: number, total: number): number {
  const percentOfTotal = (amount / total) * 100;

  return percentOfTotal;
}
