import { ModelUser } from "./user";

export class ModelAuth {
  token: string;
  primaryKey: string;
  referenceKeyUser: ModelUser["primaryKey"];
  constructor(referenceKeyUser: string) {
    this.primaryKey = Math.random().toString();
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random().toString();
  }
}
