export class Pot {
  name: string;
  target: number;
  total: number;
  theme: string;

  constructor(data: PotData) {
    this.name = data.name;
    this.target = data.target;
    this.total = data.total;
    this.theme = data.theme;
  }

  static fromJSON(json: Map<string, any>): Pot {
    return new Pot({
      name: json.get("name"),
      target: json.get("target"),
      total: json.get("total"),
      theme: json.get("theme"),
    });
  }
}
