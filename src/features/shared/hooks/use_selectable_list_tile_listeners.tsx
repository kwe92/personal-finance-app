import { useEffect } from "react";
import { useLocation } from "react-router";

// TODO: use some form of toLower() so it doesnt matter if the route is upper of lowercase

// TODO: will need to be updated when adding other routes with spaces | maybe parse element.textContent

const useAddSelectableListTileListeners = ({
  selector,
  selectedStyle,
}: {
  selector: string;
  selectedStyle: string;
}) => {
  const location = useLocation();

  useEffect(() => {
    // find all elements with a class name
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (location.pathname.includes(element.textContent!)) {
        element.classList.add(selectedStyle);
      } else {
        element.classList.remove(selectedStyle);
      }
    });
  });
};

export default useAddSelectableListTileListeners;
