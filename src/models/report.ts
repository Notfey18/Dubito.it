import { ModelAd } from "./ad";
import { ModelUser } from "./user";
export class ModelReport {
  primaryKey: string;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  title: string;
  description: string;
  constructor(
    referenceKeyAd: string,
    referenceKeyUser: string,
    title: string,
    description: string
  ) {
    this.primaryKey = Math.random().toString();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
  }
}
