import { ModelAd } from "./ad";
import { ModelAuth } from "./auth";
import { ModelUser } from "./user";

export class ModelReview {
  title: string;
  description: string;
  primaryKey: string;
  referenceKeyAd: ModelAd["primaryKey"];
  referenceKeyUser: ModelUser["primaryKey"];
  rating: number;
  date: Date;
  token: ModelAuth["token"];
  constructor(
    title: string,
    description: string,
    referenceKeyAd: string,
    referenceKeyUser: string,
    rating: number,
    date: Date,
    token: ModelAuth["token"]
  ) {
    this.title = title;
    this.description = description;
    this.primaryKey = Math.random().toString(16).slice(2);
    this.referenceKeyAd = referenceKeyAd;
    this.referenceKeyUser = referenceKeyUser;
    this.rating = rating;
    this.date = new Date();
    this.token = token;
  }
}
