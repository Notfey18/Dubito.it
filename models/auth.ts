import { ModelUser } from "./user";

export class ModelAuth {
  token: number;
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  constructor(referenceKeyUser: number) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random();
  }
}
