import * as gaps from "../../../app/constants/reusable";

import iconCaretRight from "../../../assets/images/icon-caret-right.svg";

const OverviewPotsSection = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "40%",
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Pots</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "20px",
          }}
        >
          <p>See Details</p>
          <gaps.GapW8 />
          <img
            src={iconCaretRight}
            style={{ width: "10px", height: "10px" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewPotsSection;
