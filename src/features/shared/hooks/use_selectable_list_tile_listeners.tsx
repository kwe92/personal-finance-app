import { useEffect } from "react";
import { useLocation } from "react-router";

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
      const splitPath = location.pathname.split("%20");

      const path = splitPath.join(" ");

      if (path.toLowerCase().includes(element.textContent!.toLowerCase())) {
        element.classList.add(selectedStyle);
      } else {
        element.classList.remove(selectedStyle);
      }
    });
  });
};

export default useAddSelectableListTileListeners;
