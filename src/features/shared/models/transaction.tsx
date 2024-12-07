import { data } from "react-router";

//!! TODO: define in global type / interface module in root of project
interface TransactionData {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

class Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;

  constructor(data: TransactionData) {
    this.avatar = data.avatar;
    this.name = data.name;
    this.category = data.category;
    this.date = data.date;
    this.amount = data.amount;
    this.recurring = data.recurring;
  }

  static fromJSON(json: Map<String, any>) {
    return new Transaction({
      avatar: json.get("avatar") as string,
      name: json.get("name") as string,
      category: json.get("category") as string,
      date: json.get("date") as string,
      amount: json.get("amount") as number,
      recurring: json.get("recurring") as boolean,
    });
  }
}

export default Transaction;

export type { TransactionData };
