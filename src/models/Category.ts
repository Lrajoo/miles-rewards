import { Reward } from "../models/Reward";
import { observable } from "mobx";

export class Category {
  id: string;
  name: string;
  @observable rewards: Reward[];

  constructor(id: string = "", name: string = "", rewards: Reward[] = []) {
    this.id = id;
    this.name = name;
    this.rewards = [];
  }

  public static fromData(id: string, name: string, rewards: Reward[]) {
    return new Category(id, name, rewards);
  }
}
