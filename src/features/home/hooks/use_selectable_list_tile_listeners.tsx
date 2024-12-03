import { useEffect } from "react";
import { useLocation } from "react-router";

//!! TODO: ensure you do not need the add listen functionality

const useAddSelectableListTileListeners = () => {
  const location = useLocation();

  useEffect(() => {
    // find all elements with a class name
    const elements = document.querySelectorAll(".selectable-list-tile");

    console.log(
      `useAddSelectableListTileListeners location path name: ${location.pathname}`
    );

    // track what element was selected
    //?? let selectedElement: Element | null = null;

    console.log("side nav bar items:", elements);

    elements.forEach((element) => {
      if (location.pathname.includes(element.textContent!)) {
        element.classList.add("selected-selectable-list-tile");
      } else {
        element.classList.remove("selected-selectable-list-tile");
      }

      //?? element.addEventListener("click", () => {
      //??   console.log("div clicked!!");

      //   // Remove 'selected' class from previously clicked element
      //??   if (selectedElement) {
      //??     console.log("selectedDiv!");
      //??     element.classList.remove("selected-selectable-list-tile");
      //??     selectedElement.classList.remove("selected-selectable-list-tile");
      //??   }

      //   // Add 'selected' class to clicked element
      //??   element.classList.add("selected-selectable-list-tile");

      //   // reassign the most recently clicked element to selected element
      //??   selectedElement = element;
      //?? });
    });

    // TODO: figure out if the bellow is required
    //?? document.addEventListener("click", (event) => {
    // // Check if the click was outside the container
    //??   if (!(event.target as HTMLElement).closest("#myDivs")) {
    // // Do nothing, maintain the currently selected div.
    //??   }
    //?? });
  });
};

export default useAddSelectableListTileListeners;
