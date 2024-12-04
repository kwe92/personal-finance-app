import { useEffect } from "react";
import { useLocation } from "react-router";

//!! TODO: will need to be updated when adding other routes with spaces | maybe parse element.textContent

const useAddSelectableListTileListeners = () => {
  const location = useLocation();

  useEffect(() => {
    // find all elements with a class name
    const elements = document.querySelectorAll(".selectable-list-tile");

    elements.forEach((element) => {
      if (location.pathname.includes(element.textContent!)) {
        element.classList.add("selected-selectable-list-tile");
      } else {
        element.classList.remove("selected-selectable-list-tile");
      }
    });
  });
};

export default useAddSelectableListTileListeners;
