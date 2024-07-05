import { ModelAd } from "./ad";
import { ModelUser } from "./user";

export class ModelReview {
  title: string;
  description: string;
  primaryKey: number;
  referenceKeyAd: ModelAd["primaryKey"];
  referenceKeyUser: ModelUser["primaryKey"];
  rating: number;
  date: Date;
  constructor(
    title: string,
    description: string,
    referenceKeyAd: number,
    referenceKeyUser: number,
    rating: number
  ) {
    this.title = title;
    this.description = description;
    this.primaryKey = Math.random();
    this.referenceKeyAd = referenceKeyAd;
    this.referenceKeyUser = referenceKeyUser;
    this.rating = rating;
    this.date = new Date();
  }
}
