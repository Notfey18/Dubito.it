import { ModelUser } from "./user";
import { ModelAd } from "./ad";
export class ModelFavorite {
  primaryKey: string;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  constructor(referenceKeyUser: string, referenceKeyAd: string) {
    this.primaryKey = Math.random().toString(16).slice(2);
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
  }
}
