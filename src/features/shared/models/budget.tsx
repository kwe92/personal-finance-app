class Budget {
  category: string;
  maximum: number;
  theme: string;
  constructor(data: BudgetData) {
    this.category = data.category;
    this.maximum = data.maximum;
    this.theme = data.theme;
  }

  static fromJSON(json: Map<string, any>) {
    return new Budget({
      category: json.get("category") as string,
      maximum: json.get("maximum") as number,
      theme: json.get("theme") as string,
    });
  }
}

export default Budget;
