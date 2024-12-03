import { useEffect } from "react";

const useAddSelectableListTileListeners = () => {
  useEffect(() => {
    // find all elements with a class name
    const elements = document.querySelectorAll(".selectable-list-tile");

    // track what element was selected
    let selectedElement: Element | null = null;

    console.log(elements);

    elements.forEach((element) => {
      element.addEventListener("click", () => {
        console.log("div clicked!!");
        // Remove 'selected' class from previously clicked element
        if (selectedElement) {
          console.log("selectedDiv!");

          selectedElement.classList.remove("selected-selectable-list-tile");
        }

        // Add 'selected' class to clicked element
        element.classList.add("selected-selectable-list-tile");

        // reassign the most recently clicked element to selected element
        selectedElement = element;
      });
    });

    // TODO: figure out if the bellow is required
    // document.addEventListener("click", (event) => {
    // Check if the click was outside the container
    //   if (!(event.target as HTMLElement).closest("#myDivs")) {
    //Do nothing, maintain the currently selected div.
    //   }
    // });
  }, []);
};

export default useAddSelectableListTileListeners;
