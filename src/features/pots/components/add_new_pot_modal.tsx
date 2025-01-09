import { CloseModalButton } from "../../shared/components/close_modal_button";
import MainButton from "../../shared/components/main_button";
import { ModalDropDownMenu } from "../../shared/components/modal_drop_down_menu";
import TextFormField from "../../shared/components/text_form_field";
import { ToastService } from "../../shared/services/toast_service";
import { usePotViewData } from "../context/pot_view_context";

export const AddNewPotModal = () => {
  const toastService = ToastService.getInstance();

  const { colorTagContent } = usePotViewData();
  return (
    <div className="base-modal">
      <div className="base-modal-header">
        {/* <p>{!editBudet ? "Add New Budget" : "Edit Budget"}</p> */}

        <p>Add New Pot</p>

        <CloseModalButton
          onTap={() => {
            // resetBudgetCardData();
            // viewModel.toogleAddNewBudgetModal();
          }}
        />
      </div>

      <p style={{ fontSize: "14px", color: "#696868" }}>
        {
          "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          // !editBudet
          //   ? "Choose a category to set a spending budget. These categories can help you monitor spending."
          //   : "As your budgets change, feel free to update your spending limits."
        }
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
        <TextFormField
          name="potName"
          label="Pot Name"
          type="text"
          value={""}
          placeholder="$ e.g. Rainy Days"
          onChange={(event) => {
            // TODO: implement
          }}
        />

        <TextFormField
          name="target"
          label="Target"
          type="number"
          value={""}
          placeholder="$ e.g. 200.00"
          onChange={(event) => {
            // TODO: implement
          }}
        />

        <ModalDropDownMenu
          isColorTag={true}
          label="Color Tag"
          tagColor={"green"}
          initialValue={""}
          content={colorTagContent}
          toggleMenu={() => toggleMenu(0)}
        />
      </form>

      <MainButton
        onTap={() => {
          // TODO: implement
        }}
      >
        Add Pot
        {/* {!editBudet ? "Add Budget" : "Save Changes"} */}
      </MainButton>
    </div>
  );

  // TODO: could be refactored to be in the Toast Service as we call this function multiple times in different parts of the app
  function toggleMenu(index: number) {
    toastService.toggleDropDownMenu(
      index,
      ".modal-drop-down-menu",
      ".modal-drop-down-menu-content"
    );
  }
};
