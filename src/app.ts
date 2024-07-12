import { ParamsLogin, ParamsRegister } from "./declaration";
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

  authList() {
    return this.auths;
  }

  login({ password, email }: ParamsLogin) {
    const userFound = this.users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      const auth = new ModelAuth(userFound.primaryKey);
      this.auths = [...this.auths, auth];
      console.log("Welcome");
      return auth.token;
    }

    // Se l'utente non è trovato
    console.log("User not found");
    return null; // Restituire null se l'utente non è trovato
  }
  logout(token: ModelAuth["token"]) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const userFound = this.auths.find(function (auth) {
        if (auth.token === token) return true;
        else return false;
      });
      if (!userFound) console.log("User not found");
      else {
        this.auth = this.auths.filter(function (user) {
          if (userFound.referenceKeyUser !== user.primaryKey) return true;
          else return false;
        });
        return true;
      }
    } else {
      console.log("Token not valid");
    }
  }

  register({ email, username, password }: ParamsRegister) {
    const findUser = this.users.find(function (user) {
      if (email === user.email) return true;
      else return false;
    });
    if (!!findUser) return false;
    else {
      const newUser = new ModelUser({
        username,
        email,
        password,
      });
      this.users = [...this.users, newUser];
      return true;
    }
  }
  userDetails(
    referenceKeyUser: ModelUser["primaryKey"],
    token: ModelAuth["token"]
  ) {
    const auth = this.getUserByToken(token);
    if (!!auth) {
      const userFound = this.users.find(function (user) {
        if (user.primaryKey === referenceKeyUser) return true;
        else return false;
      });
      if (!!userFound) return userFound;
      else console.log("User not found");
    } else console.log("Token not valid");
  }

  userList() {
    return this.users;
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
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyUserPurchased: ModelAd["referenceKeyUserPurchased"]
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
        phone,
        referenceKeyUser,
        referenceKeyUserPurchased
      );
      this.ads = [...this.ads, newAd];
      console.log("Ad successfully created!");
      return true;
    } else {
      console.log("Token not valid");
      return false;
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
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyUserPurchased: ModelAd["referenceKeyUserPurchased"],
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
        adFound.referenceKeyUser = referenceKeyUser;
        adFound.referenceKeyUserPurchased = referenceKeyUserPurchased;
      }
      return true;
    } else return false;
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
        return true;
      }
    } else console.log("Token not valid");
  }
  adList() {
    return this.ads;
  }

  createReview(
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"],
    referenceKeyAd: ModelReview["referenceKeyAd"],
    referenceKeyUser: ModelReview["referenceKeyUser"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const newReview = new ModelReview(
        title,
        description,
        referenceKeyAd,
        authFound.referenceKeyUser,
        rating,
        new Date(),
        token
      );
      this.reviews = [...this.reviews, newReview];
      console.log("Review successfully created!");
      return true;
    } else console.log("Token not valid");
  }

  updateReview(
    title: ModelReview["title"],
    description: ModelReview["description"],
    rating: ModelReview["rating"],
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
      if (!!reviewFound) {
        reviewFound.title = title;
        reviewFound.description = description;
        reviewFound.rating = rating;
      }
      return true;
    } else {
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
          return true;
        }
      }
    } else return false;
  }

  deleteUser(
    token: ModelAuth["token"],
    referenceKeyUser: ModelUser["primaryKey"]
  ) {
    const auth = this.getUserByToken(token);
    console.log(auth);

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
        return true;
      }
    } else console.log("Token not valid");
  }

  updateUsername(
    newUsername: ModelUser["username"],
    token: ModelAuth["token"]
  ) {
    const authFound = this.getUserByToken(token);
    if (!!authFound) {
      const userFound = this.users.find(function (user) {
        if (user.primaryKey === authFound.referenceKeyUser) return true;
        else return false;
      });
      if (!userFound) console.log("User not found");
      else {
        userFound.username = newUsername;
        this.user = [...this.user, newUsername];
      }
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
        if (adFound.referenceKeyUserPurchased !== "")
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
      return true;
    } else console.log("Token not valid");
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
      const favFound = this.favourites.find(function (favorite: string) {
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

  changeDeviceName(
    token: ModelAuth["token"],
    deviceName: ModelDevice["deviceName"],
    idDevice: ModelDevice["idDevice"]
  ) {
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

  registerDevice(
    token: ModelAuth["token"],
    idDevice: ModelDevice["idDevice"],
    deviceName: ModelDevice["deviceName"]
  ) {
    const auth: any = this.getAuthByToken(token);
    const userDevices = this.devices.filter(function (device) {
      if (device.referenceKeyUser === auth.referenceKeyUser) return true;
      else return false;
    });
    if (!!auth) {
      if (userDevices.length < 2) {
        const newDevice = new ModelDevice(
          auth.referenceKeyUser,
          idDevice,
          deviceName
        );
        this.devices = [...this.devices, newDevice];
      } else console.log("Max devices reached");
    } else console.log("Token not valid");
  }
  createReport(
    referenceKeyAd: ModelAd["primaryKey"],
    token: ModelAuth["token"],
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
          title,
          description
        );
        this.reports = [...this.reports, newReport];
      } else console.log("Ad not found");
    } else console.log("Token not valid");
  }

  closeReport(
    referenceKeyReport: ModelReport["primaryKey"],
    token: ModelAuth["token"]
  ) {
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

  listUserFavorites(referenceKeyUser: ModelUser["primaryKey"]) {
    // Cerca nell'array favorites l'id, se lo trova restituisce l'array filtrato, altrimenti restituisce un array vuoto
    return this.favorites.filter(function (favorite) {
      if (favorite.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    });
  }
  showAdDetails(
    referenceKeyAd: ModelAd["primaryKey"],
    token: ModelAuth["token"]
  ) {
    // Cerca nell'array ads l'id, se lo trova mostra i dettagli dell'annuncio, altrimenti mostra un messaggio di errore
    const auth = this.getAuthByToken(token);
    return this.ads.filter(function (ad) {
      if (ad.primaryKey === referenceKeyAd) return true;
      else return false;
    });
  }

  listUserAds(referenceKeyUser: ModelUser["primaryKey"]) {
    // Cerca nell'array ads gli id dell'user, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (ad.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    });
  }

  listUserReviews(referenceKeyUser: ModelUser["primaryKey"]) {
    // Cerca nell'array reviews gli id dell'user, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.reviews.filter(function (review) {
      if (review.referenceKeyUser === referenceKeyUser) return true;
      else return false;
    });
  }

  listUserSoldAds(referenceKeyUser: ModelUser["primaryKey"]) {
    // Cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (
        ad.referenceKeyUser === referenceKeyUser &&
        ad.referenceKeyUserPurchased !== ""
      )
        return true;
      else return false;
    });
  }

  listUserBuyedAds(referenceKeyUser: ModelUser["primaryKey"]) {
    // Cerca nell'array ads gli id dell'user con lo status sold, se lo trova mostra un array filtrato, altrimenti restituisce un array vuoto
    return this.ads.filter(function (ad) {
      if (ad.referenceKeyUserPurchased === referenceKeyUser) return true;
      else return false;
    });
  }
}
