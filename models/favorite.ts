import { ModelUser } from "./user";
import { ModelAd } from "./ad";
export class ModelFavorite {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  constructor(referenceKeyUser: number, referenceKeyAd: number) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
  }
}
