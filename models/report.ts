import { ModelAd } from "./ad";
import { ModelUser } from "./user";
export class ModelReport {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  title: string;
  description: string;
  constructor(
    referenceKeyAd: number,
    referenceKeyUser: number,
    title: string,
    description: string
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
  }
}
