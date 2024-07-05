import { DocAPI } from "./models/DocAPI";
import { ModelAd } from "./models/ad";
import { ModelAuth } from "./models/auth";
import { ModelDevice } from "./models/device";
import { ModelFavorite } from "./models/favorite";
import { ModelReport } from "./models/report";
import { ModelReview } from "./models/reviews";
import { ModelUser } from "./models/user";

export class Marketplace {
  [x: string]: any;
  users: Array<ModelUser> = [];
  ads: Array<ModelAd> = [];
  reviews: Array<ModelReview> = [];
  auths: Array<ModelAuth> = [];
  reports: Array<ModelReport> = [];
  favorites: Array<ModelFavorite> = [];
  devices: Array<ModelDevice> = [];

  getUserByToken(token: ModelAuth["token"]) {
    const authsFound = this.auths.find(function (auth) {
      if (auth.token === token) {
        return true;
      } else return false;
    });
    if (!authsFound) return null;
    else return authsFound;
  }

  login(username: string, password: string) {
    const userFound = this.users.find(function (user) {
      if (user.username === username && user.password === password) {
        return true;
      } else return false;
    });
    if (!!userFound) {
      const auth = new ModelAuth(userFound.primaryKey);
      this.auths = [...this.auths, auth];
      console.log("Welcome");
      return auth.token;
    } else console.log("User not found");
  }

  logout(referenceKeyUser: ModelUser["primaryKey"], token: ModelAuth["token"]) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const userFound = this.users.find(function (user) {
        if (user.primaryKey === referenceKeyUser) return true;
        else return false;
      });
      if (!userFound) console.log("User not found");
      else {
        this.users = this.users.filter(function (user) {
          if (userFound.primaryKey !== user.primaryKey) return true;
          else return false;
        });
        console.log("Goodbye    " + userFound.username);
      }
    } else {
      console.log("Token not valid");
    }
  }

  register(
    username: ModelUser["username"],
    email: ModelUser["email"],
    password: ModelUser["password"]
  ) {
    const findUser = this.users.find(function (emails) {
      if (email === emails.email) return true;
      else return false;
    });
    if (!!findUser) {
      console.log("account already exist");
    } else {
      const newUser = new ModelUser(username, email, password);
      this.users = [...this.users, newUser];
      console.log(" Registration was successful");
    }
  }

  createAd(
    title: ModelAd["title"],
    status: ModelAd["status"],
    photo: ModelAd["urlPhoto"],
    description: ModelAd["description"],
    category: ModelAd["category"],
    price: ModelAd["price"],
    address: ModelAd["address"],
    phone: ModelAd["phone"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const newAd = new ModelAd(
        title,
        status,
        photo,
        description,
        category,
        price,
        address,
        phone
      );
      this.ads = [...this.ads, newAd];
      console.log("Ad successfully created!");
    } else {
      console.log("Token not valid");
    }
  }

  updateAd(
    referenceKeyAds: ModelAd["primaryKey"],
    title: ModelAd["title"],
    description: ModelAd["description"],
    urlPhoto: ModelAd["urlPhoto"],
    category: ModelAd["category"],
    price: ModelAd["price"],
    address: ModelAd["address"],
    status: ModelAd["status"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAds) return true;
        else return false;
      });
      if (!!adFound) {
        adFound.title = title;
        adFound.description = description;
        adFound.urlPhoto = urlPhoto;
        adFound.category = category;
        adFound.price = price;
        adFound.address = address;
        adFound.status = status;
      }
    } else console.log("Token not valid");
  }

  deleteAd(referenceKeyAds: ModelAd["primaryKey"], token: ModelAuth["token"]) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey === referenceKeyAds) return true;
        else return false;
      });
      if (!adFound) console.log("Ad not found");
      else {
        this.ads = this.ads.filter(function (ad) {
          if (adFound.primaryKey !== ad.primaryKey) return true;
          else return false;
        });
        console.log("Ad deleted successfully");
      }
    } else console.log("Token not valid");
  }

  createReview(
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"],
    referenceKeyAd: ModelReview["referenceKeyAd"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const newReview = new ModelReview(
        title,
        description,
        referenceKeyAd,
        authFound.referenceKeyUser,
        rating
      );
      this.reviews = [...this.reviews, newReview];
      console.log("Review successfully created!");
    } else console.log("Token not valid");
  }

  updateReview(
    referenceKeyReview: ModelReview["primaryKey"],
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const reviewFound = this.reviews.find(function (review) {
        if (review.primaryKey === referenceKeyReview) return true;
        else return false;
      });
      if (!!reviewFound) {
        reviewFound.title = title;
        reviewFound.description = description;
        reviewFound.rating = rating;
      }
    }
  }

  deleteReview(
    referenceKeyReview: ModelReview["primaryKey"],
    referenceKeyUser: ModelUser["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const reviewFound = this.reviews.find(function (review) {
        if (review.primaryKey === referenceKeyReview) return true;
        else return false;
      });

      if (auth.referenceKeyUser !== referenceKeyUser) console.log("Is not you");
      else {
        if (!reviewFound) console.log("Review not found");
        else {
          this.reviews = this.reviews.filter(function (review) {
            if (reviewFound.primaryKey !== review.primaryKey) return true;
            else return false;
          });
          console.log("Review deleted successfully");
        }
      }
    } else console.log("Token not valid");
  }

  deleteUser(
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const userFound = this.users.find(function (user) {
        if (user.primaryKey === referenceKeyUser) return true;
        else return false;
      });
      if (!userFound) console.log("Account not found");
      else {
        this.users = this.users.filter(function (user) {
          if (userFound.primaryKey !== user.primaryKey) return true;
          else return false;
        });
        console.log("Account deleted successfully :(");
      }
    } else console.log("Token not valid");
  }

  updateUsername(
    newUsername: ModelUser["username"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
    }
  }

  updateAdAsSold(
    referenceKeyAds: ModelAd["primaryKey"],
    referenceKeyUserPurchased: ModelUser["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const adFound = this.ads.find(function (ad) {
        if (ad.primaryKey == referenceKeyAds) return true;
        else return false;
      });

      if (!adFound) console.log("Ad not found");
      else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Author unkown");
        }
        if (adFound.referenceKeyUserPurchased !== 0)
          console.log("Ad already sold");
        else {
          this.ads = this.ads.map(function (ad) {
            if (adFound.primaryKey === ad.primaryKey) {
              return {
                ...ad,
                referenceKeyUserPurchased: referenceKeyUserPurchased,
              };
            } else {
              return { ...ad };
            }
          });
        }
      }
    } else console.log("Token not valid");
  }

  filterAd(token: number, referenceKeyAd: any) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
    }
  }

  addFavoriteList(
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyAd: ModelAd["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const newFavourite = new ModelFavorite(referenceKeyUser, referenceKeyAd);
      this.favorites = [...this.favorites, newFavourite];
    } else console.log("Token not valid");
  }

  deleteFavoriteList(
    token: ModelAuth["token"],
    referenceKeyFavorite: ModelFavorite["primaryKey"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const favFound = this.favourites.find(function (favorite: number) {
        if (favorite === referenceKeyFavorite) return true;
        else return false;
      });
      if (!favFound) console.log("Ad not found");
      else {
        this.favorites = this.favorites.filter(function (favorites: {
          primaryKey: any;
        }) {
          if (favFound.primaryKey === favorites.primaryKey) return true;
          else return false;
        });
      }
    } else console.log("Token not valid");
  }

  deleteDevice(token: ModelAuth["token"], idDevice: ModelDevice["idDevice"]) {
    const auth = this.getAuthByToken(token);
    if (!!auth) {
      this.devices = this.devices.filter(function (device) {
        if (
          device.referenceKeyUser === auth.referenceKeyUser &&
          device.idDevice === idDevice
        )
          return false;
        else return true;
      });
    } else console.log("Token not valid");
  }

  changeDeviceName(token: number, deviceName: string, idDevice: number) {
    const auth = this.getAuthByToken(token);
    const device: any = this.devices.find(function (device) {
      if (
        device.referenceKeyUser === auth.referenceKeyUser &&
        device.idDevice === idDevice
      )
        return true;
      else return false;
    });
    if (!!auth) {
      if (
        device.referenceKeyUser === auth.referenceKeyUser &&
        device.idDevice === idDevice
      ) {
        this.devices = this.devices.map(function (device) {
          if (
            device.referenceKeyUser === auth.referenceKeyUser &&
            device.idDevice === idDevice
          ) {
            return { ...device, deviceName: deviceName };
          } else return device;
        });
      } else console.log("Device con not be updated ");
    } else console.log("Token not valid");
  }

  registerDevice(token: number, idDevice: number) {
    const auth: any = this.getAuthByToken(token);
    const userDevices = this.devices.filter(function (device) {
      if (device.referenceKeyUser === auth.referenceKeyUser) return true;
      else return false;
    });
    if (!!auth) {
      if (userDevices.length < 2) {
        const newDevice = new ModelDevice(auth.referenceKeyUser, idDevice);
        this.devices = [...this.devices, newDevice];
      } else console.log("Max devices reached");
    } else console.log("Token not valid");
  }
  createReport(
    referenceKeyAd: number,
    token: number,
    title: string,
    description: string,
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getAuthByToken(token);
    const adFound = this.ads.find(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });

    if (!!auth) {
      if (!!adFound) {
        const newReport = new ModelReport(
          referenceKeyAd,
          auth.referenceKeyUser,
          state,
          primaryKey,
          title,
          description
        );
        this.reports = [...this.reports, newReport];
      } else console.log("Ad not found");
    } else console.log("Token not valid");
  }

  closeReport(referenceKeyReport: number, token: number) {
    // Cerca nell'array reports l'id, se lo trova modifica la voce closed, altrimenti mostra un messaggio di errore
    const auth: any = this.getAuthByToken(token);
    let reportFound: any = null;
    if (!!auth) {
      reportFound = this.reports.find(function (report) {
        if (report.primaryKey === referenceKeyReport) return true;
        else return false;
      });
    } else console.log("Token not valid");

    if (!!reportFound) {
      this.reports = this.reports.map(function (report) {
        if (reportFound.primaryKey === report.primaryKey)
          return {
            ...auth,
            closed: true,
          };
        else return auth;
      });
    } else console.log("Report not found");
  }

  listByCategory(category: string) {
    // Cerca nell'array ads la category, se la trova restituisce l'array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (ad.category === category) return true;
      else return false;
    });
  }

  listUserFavorites(referenceKeyUser: number) {
    // Cerca nell'array favorites l'id, se lo trova restituisce l'array filtrato, altrimenti restituisce un array vuoto
    return this.favorites.filter(function (favorite) {
      if (favorite.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    });
  }
  showAdDetails(referenceKeyAd: number, token: number) {
    // Cerca nell'array ads l'id, se lo trova mostra i dettagli dell'annuncio, altrimenti mostra un messaggio di errore
    const auth = this.getAuthByToken(token);
    return this.ads.filter(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
  }

  listUserAds(referenceKeyUser: number) {
    // Cerca nell'array ads gli id dell'user, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (ad.idOwner === referenceKeyUser) return true;
      else return false;
    });
  }

  listUserReviews(referenceKeyUser: number) {
    // Cerca nell'array reviews gli id dell'user, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.reviews.filter(function (review) {
      if (review.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    });
  }

  listUserSoldAds(referenceKeyUser: number) {
    // Cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (
        ad.referenceKeyUser === referenceKeyUser &&
        ad.referenceKeyUserPurchased !== 0
      )
        return true;
      else return false;
    });
  }

  listUserBuyedAds(referenceKeyUser: number) {
    // Cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (ad.referenceKeyUserPurchased === referenceKeyUser) return true;
      else return false;
    });
  }
}

const apis = {
  getUserBytoken: new DocAPI("/API/auth", "GET", true),
  login: new DocAPI("/API/auth/login", "POST", true),
  logout: new DocAPI("/API/auth/logout", "POST", true),
  register: new DocAPI("/API/user/signup", "POST", true),
  deleteUser: new DocAPI("API/user/delete", "DELETE", true),
  updateUsername: new DocAPI("API/user/update", "PUT", true),
  createAd: new DocAPI("/API/ads/create", "PUT", true),
  updateAd: new DocAPI("/API/ads/update", "PUT", true),
  deleteAd: new DocAPI("/API/ads/delete", "DELETE", true),
  listByCategory: new DocAPI("/API/ads/category", "GET", true),
  listUserFavorites: new DocAPI("/API/favorites", "GET", true),
  listUserAds: new DocAPI("/API/user/ads", "GET", true),
  listUserReviews: new DocAPI("/API/user/reviews", "GET", true),
  createReview: new DocAPI("/API/reviews/create", "PUT", true),
  updateReview: new DocAPI("/API/reviews/update", "PUT", true),
  deleteReview: new DocAPI("/API/reviews/delete", "DELETE", true),
  updateAdAsSold: new DocAPI("/API/ads/sold", "PUT", true),
  filterAd: new DocAPI("/API/ads/filter", "POST", true),
  addFavoriteList: new DocAPI("/API/favorites/add", "PUT", true),
  deleteFavoriteList: new DocAPI("/API/favorites/delete", "PUT", true),
  registerDevice: new DocAPI("/API/device/register", "POST", true),
  changeDeviceName: new DocAPI("/API/device/update", "PUT", true),
  deleteDevice: new DocAPI("/API/device/delete", "DELETE", true),
  createReport: new DocAPI("/API/reports/create", "PUT", true),
  closeReport: new DocAPI("/API/reports/delete", "DELETE", true),
  listBycategory: new DocAPI("/API/ads/category", "GET", true),
  showDetails: new DocAPI("/API/ads/details", "GET", true),
  listUserSoldAds: new DocAPI("/API/user/soldads", "GET", true),
  listUserBuyedAds: new DocAPI("/API/user/buyedads", "GET", true),
};
