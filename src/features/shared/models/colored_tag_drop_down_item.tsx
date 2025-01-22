export class ColorTagDropDownItem {
  name: string;
  theme: string;
  isInUse: boolean;

  constructor(data: ColorTagDropDownItemData) {
    this.name = data.name;
    this.theme = data.theme;
    this.isInUse = data.isInUse;
  }

  static fromJSON(json: Map<string, any>): ColorTagDropDownItem {
    return new ColorTagDropDownItem({
      name: json.get("name"),
      theme: json.get("theme"),
      isInUse: false,
    });
  }
}
