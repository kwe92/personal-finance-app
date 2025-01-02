/// Toggles the display of a drop dowm menu.

export function toggleDropDownMenu(
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
