export class ToastService {
  // singleton
  private static instance: ToastService;

  // ensure class can not be instantiated
  private constructor() {}

  // static method to retrieve the singleton
  static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }

    return ToastService.instance;
  }

  toogleModal(modalId: string, resetModalData?: Function) {
    // find modal id passed in as an argument to ModalWrapper
    var modal = document.getElementById(modalId);

    // find modal content, required to ensure the modal does not dismiss when clicking inside the modal content
    var modalContent = document.getElementById(`${modalId}-content`);

    // find the close modal button to close the modal when tapped
    var closeModalButton = document.getElementById("close-modal-button");

    modal!.style.display = "flex";

    // detect where a user clicks and react to the click
    document.addEventListener("click", function (event: any) {
      // if the user clicks on the close modal button dismiss the modal
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
        resetModalData?.();
      }
    });
  }

  /// Toggles the display of a drop dowm menu.

  toggleDropDownMenu(
    index: number,
    dropDownContainerClassName: string,
    dropDownContentClassName: string
  ) {
    // select drop down menu container by index
    const dropdownContainer = document.querySelectorAll(
      dropDownContainerClassName
    )[index];

    // select drop down menu content by index
    const dropdownContent = document.querySelectorAll(dropDownContentClassName)[
      index
    ];

    // toggle .show class of drop down menu content
    dropdownContent!.classList.toggle("show");

    // add event listener to determine when the drop down menu closes
    document.addEventListener("click", function (event: any) {
      // if you do not click within the drop down menu container or within its contents close the drop down menu
      if (
        !dropdownContainer!.contains(event.target) &&
        !dropdownContent!.contains(event.target)
      ) {
        dropdownContent!.classList.remove("show");
      }
    });
  }
}
