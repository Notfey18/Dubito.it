import { ModelUser } from "./user";

export class ModelAuth {
  token: string;
  primaryKey: string;
  referenceKeyUser: ModelUser["primaryKey"];
  constructor(referenceKeyUser: string) {
    this.primaryKey = Math.random().toString(16).slice(2);
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random().toString(16).slice(2);
  }
}
