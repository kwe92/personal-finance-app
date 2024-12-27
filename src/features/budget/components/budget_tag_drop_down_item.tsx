import { ColorTagDropDownItem } from "../models/colored_tag_drop_down_item";

export const BudgetTagDropdownItem = (
  item: ColorTagDropDownItem
): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        // backgroundColor: "orange",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "12px",
          // backgroundColor: "purple",
        }}
      >
        {/* circle  */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "8px",
            backgroundColor: item.theme,
          }}
        />
        <p>{item.name}</p>
      </div>
      {item.isInUse ? (
        <p
          style={{
            width: "100%",
            textAlign: "end",
            fontSize: "12px",
            color: "#696868",
          }}
        >
          Already used
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
