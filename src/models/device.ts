import { ModelUser } from "./user";

export class ModelDevice {
  primaryKey: string;
  referenceKeyUser: ModelUser["primaryKey"];
  idDevice: string;
  deviceName: string;

  constructor(
    referenceKeyUser: ModelUser["primaryKey"],
    IdDevice: string,
    deviceName: string
  ) {
    this.primaryKey = Math.random().toString();
    this.referenceKeyUser = referenceKeyUser;
    this.idDevice = IdDevice;
    this.deviceName = deviceName;
  }
}
