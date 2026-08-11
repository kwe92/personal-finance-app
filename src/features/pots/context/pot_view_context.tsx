import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ColorTagDropDownItem } from "../../shared/models/colored_tag_drop_down_item";
import { usePotData } from "../../shared/context/pot_context";
import { colorTagData } from "../../../app/constants/constants";
import { useFormErrorData } from "../../shared/context/form_error_context";

interface PotViewContextInterface {
  potName: string;
  target: string;
  total: string;
  selectedColorTag: ColorTagDropDownItem;
  editPot: boolean;
  isWithdrawal: boolean;
  potToEdit: PotData;
  potToDelete: PotData;
  potColorTags: ColorTagDropDownItem[];
  transactionAmount: string;
  setPotName: (name: string) => void;
  setTarget: (target: string) => void;
  setTotal: (total: string) => void;
  setSelectedColorTag: (colorTag: ColorTagDropDownItem) => void;
  setEditPot: (edit: boolean) => void;
  setIsWithdrawal: (isWithdrawal: boolean) => void;
  setPotToEdit: (pot: PotData) => void;
  setPotToDelete: (pot: PotData) => void;
  setTransactionAmount: (amount: string) => void;
  resetPotModalData: () => void;
  populateEditForm: (pot: PotData) => void;
}

const defaultColorTag = new ColorTagDropDownItem({
  name: "",
  theme: "transparent",
  isInUse: false,
});

const defaultPot: PotData = {
  name: "",
  target: 0,
  total: 0,
  theme: "transparent",
};

const PotViewContext = createContext<PotViewContextInterface>({
  potName: "",
  target: "",
  total: "",
  selectedColorTag: defaultColorTag,
  editPot: false,
  isWithdrawal: false,
  potToEdit: defaultPot,
  potToDelete: defaultPot,
  potColorTags: [],
  transactionAmount: "",
  setPotName: () => {},
  setTarget: () => {},
  setTotal: () => {},
  setSelectedColorTag: () => {},
  setEditPot: () => {},
  setIsWithdrawal: () => {},
  setPotToEdit: () => {},
  setPotToDelete: () => {},
  setTransactionAmount: () => {},
  resetPotModalData: () => {},
  populateEditForm: () => {},
});

const PotViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { pots } = usePotData();
  const { resetPotModalErrors } = useFormErrorData();

  const [potName, setPotName] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [selectedColorTag, setSelectedColorTag] =
    useState<ColorTagDropDownItem>(defaultColorTag);
  const [editPot, setEditPot] = useState<boolean>(false);
  const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);
  const [potToEdit, setPotToEdit] = useState<PotData>(defaultPot);
  const [potToDelete, setPotToDelete] = useState<PotData>(defaultPot);
  const [transactionAmount, setTransactionAmount] = useState<string>("");

  // Derived color tags list (without direct mutations)
  const potColorTags = useMemo(() => {
    const alreadyUsedColorTags = new Set(pots?.map((pot) => pot.theme));

    return colorTagData
      .map((json) => {
        const item = ColorTagDropDownItem.fromJSON(json);
        if (alreadyUsedColorTags.has(item.theme)) {
          item.isInUse = true;
        }
        return item;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [pots]);

  const resetPotModalData = () => {
    setEditPot(false);
    setIsWithdrawal(false);
    setPotToEdit(defaultPot);
    setPotToDelete(defaultPot);
    setPotName("");
    setSelectedColorTag(defaultColorTag);
    setTarget("");
    setTotal("");
    setTransactionAmount("");
    resetPotModalErrors();
  };

  const populateEditForm = (pot: PotData) => {
    setEditPot(true);
    setPotToEdit(pot);
    setPotName(pot.name);
    setTarget(pot.target.toString());
    setTotal(pot.total.toString());

    const matchingTag = potColorTags.find(
      (colorTag) => colorTag.theme === pot.theme,
    );
    setSelectedColorTag(matchingTag ?? defaultColorTag);
  };

  useEffect(() => {
    resetPotModalData();
  }, []);

  const value = useMemo(
    () => ({
      potName,
      target,
      total,
      selectedColorTag,
      editPot,
      isWithdrawal,
      potToEdit,
      potToDelete,
      potColorTags,
      transactionAmount,
      setPotName,
      setTarget,
      setTotal,
      setSelectedColorTag,
      setEditPot,
      setIsWithdrawal,
      setPotToEdit,
      setPotToDelete,
      setTransactionAmount,
      resetPotModalData,
      populateEditForm,
    }),
    [
      potName,
      target,
      total,
      selectedColorTag,
      editPot,
      isWithdrawal,
      potToEdit,
      potToDelete,
      potColorTags,
      transactionAmount,
    ],
  );

  return (
    <PotViewContext.Provider value={value}>{children}</PotViewContext.Provider>
  );
};

const usePotViewData = () => useContext(PotViewContext);

export { PotViewProvider, usePotViewData };
