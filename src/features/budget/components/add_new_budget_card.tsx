import "./css/add_new_budget_card.css";

import MainButton from "../../shared/components/main_button";
import TextFormField from "../../shared/components/text_form_field";
import caretDown from "../../../assets/images/icon-caret-down.svg";
import { toggleDropDownMenu } from "../../shared/utility/toggle_drop_down_menu";
import { useBudgetViewData } from "../context/budget_view_context";
import { useBudgetData } from "../../shared/context/budget_context";
import Budget from "../../shared/models/budget";
import { BudgetViewModel } from "../budget_view_model";
import { formatDate } from "../../shared/utility/functions";

// TODO: added validators to the card as to give the user a visual representation of any errors made while filling out the card

export const AddNewBudgetCard = (): JSX.Element => {
  const viewModel = BudgetViewModel.getInstance();

  const { setBudgets } = useBudgetData();

  const {
    categoryContent,
    colorTagContent,
    selectedBudgetCategory,
    resetBudgetCardData,
    selectedColorTag,
    maxSpending,
    setMaxSpending,
  } = useBudgetViewData();

  return (
    <div className="add-new-budget-card-main">
      <div className="add-new-budget-card-header">
        <p>Add New Budget</p>

        <CloseModalButton
          onTap={() => {
            resetBudgetCardData();
            viewModel.toogleAddNewBudgetModal();
          }}
        />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={(e) => {
          e.preventDefault(); // prevent form default behavior, add custom frontend form handling
        }}
      >
        <ModalDropDownMenu
          label="Budget Category"
          content={categoryContent ?? []}
          initialValue={selectedBudgetCategory}
          toggleMenu={() => toggleMenu(0)}
        />

        <TextFormField
          name="maxSpend"
          label="Maximum Spend"
          type="number"
          value={maxSpending}
          placeholder="$ e.g. 2000"
          onChange={(event) => {
            setMaxSpending(event.target.value);
          }}
        />

        <ModalDropDownMenu
          isColorTag={true}
          label="Color Tag"
          tagColor={selectedColorTag?.theme ?? ""}
          initialValue={selectedColorTag?.name ?? ""}
          content={colorTagContent ?? []}
          toggleMenu={() => toggleMenu(1)}
        />
      </form>

      <MainButton
        onTap={() => {
          // TODO: figure out a way to abstract the bellow business logic away | also the logic is temporary for testing only
          if (
            Number.parseFloat(maxSpending) > 0 &&
            selectedBudgetCategory.length > 0
          ) {
            setBudgets((prevState: BudgetData[]) => {
              return [
                new Budget({
                  category: selectedBudgetCategory,
                  maximum: Number.parseFloat(maxSpending),
                  theme: selectedColorTag!.theme,
                  createdAt: formatDate(new Date().toLocaleString()),
                  updatedAt: formatDate(new Date().toLocaleString()),
                }),
                ...prevState,
              ];
            });

            // set budget card state to default values
            resetBudgetCardData();

            // find and close modal by setting display to none
            var modal = document.getElementById("add-new-budget-modal");

            modal!.style.display = "none";
          }
        }}
      >
        Add Budget
      </MainButton>
    </div>
  );
};

function toggleMenu(index: number) {
  toggleDropDownMenu(
    index,
    ".modal-drop-down-menu",
    ".modal-drop-down-menu-content"
  );
}

const ModalDropDownMenu = ({
  label,
  content,
  initialValue,
  isColorTag = false,
  tagColor,
  toggleMenu,
}: {
  label: string;
  content: JSX.Element[];
  initialValue: string;
  isColorTag?: boolean;
  tagColor?: string;
  toggleMenu: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <div className="modal-drop-down-menu" onClick={toggleMenu}>
      <label>{label}</label>
      {/* dropdown selector*/}
      <div className="modal-drop-down-menu-selector">
        {isColorTag ? (
          <div className="modal-drop-down-menu-colored-tag-section">
            {/* circle */}
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "8px",
                backgroundColor: tagColor,
              }}
            />
            <p>{initialValue}</p>
          </div>
        ) : (
          <p>{initialValue}</p>
        )}

        <img src={caretDown} alt="caret down" />
      </div>
      {/* dropdown content*/}
      <div className="modal-drop-down-menu-content">{content}</div>
    </div>
  );
};

// TODO: move close modal button to feature shared folder
const CloseModalButton = ({
  onTap,
}: {
  onTap: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <svg
      id="close-modal-button"
      style={{
        width: "24px",
        height: "24px",
        fill: "#696868",
      }}
      onClick={onTap}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m17.53 9.53-3.47 3.47 3.47 3.47c.0737.0687.1328.1515.1738.2435s.063.1913.0648.292-.0168.2007-.0545.2941-.0938.1782-.1651.2494c-.0712.0713-.156.1274-.2494.1651s-.1934.0563-.2941.0545-.2-.0238-.292-.0648-.1748-.1001-.2435-.1738l-3.47-3.47-3.47 3.47c-.14217.1325-.33022.2046-.52452.2012-.1943-.0035-.37968-.0822-.5171-.2196-.13741-.1374-.21612-.3228-.21955-.5171s.0687-.3823.20118-.5245l3.46999-3.47-3.46999-3.47c-.13248-.14218-.20461-.33022-.20118-.52452s.08214-.37969.21955-.5171c.13742-.13741.3228-.21613.5171-.21956.1943-.00342.38235.0687.52452.20118l3.47 3.47 3.47-3.47c.1422-.13248.3302-.2046.5245-.20118.1943.00343.3797.08215.5171.21956s.2162.3228.2196.5171-.0687.38234-.2012.52452zm8.22 3.47c0 2.5217-.7478 4.9868-2.1488 7.0835-1.4009 2.0967-3.3922 3.7309-5.722 4.696-2.3297.965-4.8933 1.2175-7.3666.7255-2.47325-.4919-4.74509-1.7063-6.52821-3.4894s-2.997435-4.0549-3.489397-6.5282c-.49196108-2.4733-.239469-5.0369.725547-7.36661.96502-2.32976 2.59922-4.32104 4.69594-5.72203 2.09673-1.400986 4.56182-2.14876 7.08352-2.14876 3.3803.00397 6.621 1.34854 9.0112 3.73877 2.3903 2.39023 3.7348 5.63094 3.7388 9.01123zm-1.5 0c0-2.225-.6598-4.40011-1.896-6.25017-1.2361-1.85005-2.9931-3.29199-5.0488-4.14348-2.0557-.85148-4.3177-1.07427-6.5-.64018-2.18225.43408-4.18681 1.50554-5.76015 3.07888s-2.6448 3.5779-3.07888 5.76015c-.43408 2.1823-.2113 4.4443.64019 6.5s2.29343 3.8127 4.14348 5.0488c1.85005 1.2362 4.02516 1.896 6.25016 1.896 2.9827-.0033 5.8422-1.1896 7.9513-3.2987s3.2954-4.9686 3.2987-7.9513z" />
    </svg>
  );
};
