import { ModelUser } from "./user";

export class ModelAd {
  title: string;
  status: string;
  urlPhoto: string;
  description: string;
  category: string;
  price: number;
  address: string;
  phone: string;
  idOwner: ModelUser["primaryKey"];
  referenceKeyUserPurchased: ModelUser["primaryKey"];
  date: Date;
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"] | undefined;
  constructor(
    title: string,
    status: string,
    urlPhoto: string,
    description: string,
    category: string,
    price: number,
    address: string,
    phone: string
  ) {
    this.primaryKey = Math.random();
    this.idOwner = this["primaryKey"];
    this.title = title;
    this.status = status;
    this.urlPhoto = urlPhoto;
    this.description = description;
    this.category = category;
    this.price = price;
    this.address = address;
    this.referenceKeyUser = 0;
    this.referenceKeyUserPurchased = 0;
    this.phone = phone;
    this.date = new Date();
  }
}
