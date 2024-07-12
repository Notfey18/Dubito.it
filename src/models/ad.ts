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
  referenceKeyUserPurchased: ModelUser["primaryKey"];
  date: Date;
  primaryKey: ModelUser["primaryKey"];
  referenceKeyUser: ModelUser["primaryKey"];

  constructor(
    title: string,
    status: string,
    urlPhoto: string,
    description: string,
    category: string,
    price: number,
    address: string,
    phone: string,
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyUserPurchased: ModelUser["primaryKey"]
  ) {
    this.primaryKey = Math.random().toString(16).slice(2);
    this.title = title;
    this.status = status;
    this.urlPhoto = urlPhoto;
    this.description = description;
    this.category = category;
    this.price = price;
    this.address = address;
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyUserPurchased = referenceKeyUserPurchased;
    this.phone = phone;
    this.date = new Date();
  }
}
