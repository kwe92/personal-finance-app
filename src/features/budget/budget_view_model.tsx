export class BudgetViewModel {
  private static instance: BudgetViewModel;
  // private constructor to ensure the class can not be instantiated from the outside
  private constructor() {}

  // returns the same instance of BudgetViewModel whenever called
  static getInstance(): BudgetViewModel {
    if (!BudgetViewModel.instance) {
      BudgetViewModel.instance = new BudgetViewModel();
    }
    return BudgetViewModel.instance;
  }

  // TODO: may need to put toogleAddNewBudgetModal function in a ToastService singleton for reusability

  toogleAddNewBudgetModal() {
    // find new modal with proper id that was passed in as an argument to ModalWrapper
    var modal = document.getElementById("add-new-budget-modal");

    // find modal content, required to ensure the modal does not dismiss when clicking inside the modal content
    var modalContent = document.getElementById("modal-content");

    // find the close modal button to close the modal when tapped
    var closeModalButton = document.getElementById("close-modal-button");

    modal!.style.display = "flex";

    // detect where a user clicks and react to the click
    document.addEventListener("click", function (event: any) {
      // if the user clicks son the close modal button dismiss the modal
      if (closeModalButton!.contains(event.target)) {
        modal!.style.display = "none";
      }
      // if user clicks on the modal content do nothing
      if (modalContent!.contains(event.target)) {
        return;
      }
      // if user clicks on the modal background dismiss the modal
      if (modal!.contains(event.target)) {
        modal!.style.display = "none";
      }
    });
  }
}
