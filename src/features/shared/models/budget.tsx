class Budget {
  category: string;
  maximum: number;
  theme: string;
  createdAt: string;
  updatedAt: string;
  constructor(data: BudgetData) {
    this.category = data.category;
    this.maximum = data.maximum;
    this.theme = data.theme;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static fromJSON(json: Map<string, any>) {
    return new Budget({
      category: json.get("category") as string,
      maximum: json.get("maximum") as number,
      theme: json.get("theme") as string,
      createdAt: json.get("created_at") as string,
      updatedAt: json.get("updated_at") as string,
    });
  }
}

export default Budget;
