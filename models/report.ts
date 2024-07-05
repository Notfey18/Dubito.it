import { ModelAd } from "./ad";
import { ModelUser } from "./user";
export class ModelReport {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  state: boolean;
  title: string;
  description: string;
  constructor(
    primaryKey: number,
    referenceKeyAd: number,
    referenceKeyUser: number,
    state: boolean,
    title: string,
    description: string
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.state = state;
    this.title = title;
    this.description = description;
  }
}
