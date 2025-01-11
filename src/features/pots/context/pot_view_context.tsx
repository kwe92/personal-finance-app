import { createContext, useContext, useState } from "react";
import { Pot } from "../../shared/models/pot";
import { ColorTagDropDownItem } from "../../shared/models/colored_tag_drop_down_item";
import { usePotData } from "../../shared/context/pot_context";
import { colorTagData } from "../../../app/constants/constants";
import { ColorTagDropdownItem } from "../../shared/components/color_tag_drop_down_item";
import { Divider } from "../../shared/components/divider";

interface potViewContextInterface {
  potName: string;
  target: string;
  selectedColorTag: ColorTagDropDownItemData;
  editPot: boolean;
  potToEdit: PotData;
  potToDelete: PotData;
  colorTagContent: JSX.Element[];
  potColorTags: ColorTagDropDownItem[];
  setPotName: Function;
  setTarget: Function;
  setSelectedColorTag: Function;
  setEditPot: Function;
  setPotToEdit: Function;
  setPotToDelete: Function;
  resetPotModalData: Function;
}

const defaultColorTag = new ColorTagDropDownItem({
  name: "",
  theme: "transparent",
  isInUse: false,
});

const defaultPot = new Pot({
  name: "",
  target: 0,
  total: 0,
  theme: "transparent",
});
const PotViewContext = createContext<potViewContextInterface>({
  potName: "",
  target: "",
  selectedColorTag: defaultColorTag,
  editPot: false,
  potToEdit: defaultPot,
  potToDelete: defaultPot,
  colorTagContent: [],
  potColorTags: [],
  setPotName: () => {},
  setTarget: () => {},
  setSelectedColorTag: () => {},
  setEditPot: () => {},
  setPotToEdit: () => {},
  setPotToDelete: () => {},
  resetPotModalData: () => {},
});

const PotViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [potName, setPotName] = useState<string>("");

  const [target, setTarget] = useState<string>("");

  const [selectedColorTag, setSelectedColorTag] =
    useState<ColorTagDropDownItemData>(defaultColorTag);

  const [editPot, setEditPot] = useState<boolean>(false);

  const [potToEdit, setPotToEdit] = useState<PotData>(defaultPot);

  const [potToDelete, setPotToDelete] = useState<PotData>(defaultPot);

  const { pots } = usePotData();

  const alreadyUsedColorTags = new Set(pots?.map((pot) => pot.theme));

  const potColorTags = colorTagData.map((json) =>
    ColorTagDropDownItem.fromJSON(json)
  );

  // mark color as used if in the list of budgets
  potColorTags.forEach((colorTagItem) => {
    if (alreadyUsedColorTags?.has(colorTagItem.theme)) {
      colorTagItem.isInUse = true;
    }
  });

  potColorTags.sort((a, b) => a.name.localeCompare(b.name));

  const colorTagContent = potColorTags?.map((colorTag, i) => (
    <div>
      <li
        key={i}
        style={{
          padding: "12px 0 12px 0",
        }}
        onClick={() => {
          if (!colorTag.isInUse) setSelectedColorTag(colorTag);
        }}
      >
        <ColorTagDropdownItem
          name={colorTag.name}
          theme={colorTag.theme}
          isInUse={colorTag.isInUse}
        />
      </li>
      {potColorTags.length - 1 !== i ? <Divider /> : <></>}
    </div>
  ));

  return (
    <PotViewContext.Provider
      value={{
        potName,
        target,
        selectedColorTag,
        editPot,
        potToEdit,
        potToDelete,
        colorTagContent,
        potColorTags,
        setPotName,
        setTarget,
        setSelectedColorTag,
        setEditPot,
        setPotToEdit,
        setPotToDelete,
        resetPotModalData,
      }}
    >
      {children}
    </PotViewContext.Provider>
  );

  function resetPotModalData() {
    setEditPot(false);
    setPotToEdit(defaultPot);
    setPotToDelete(defaultPot);
    setPotName("");
    setSelectedColorTag(defaultColorTag);
    setTarget("");
  }
};

const usePotViewData = () => useContext(PotViewContext);

export { PotViewProvider, usePotViewData };
