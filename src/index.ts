import express, { Request, Response } from "express";
import { Marketplace } from "./app";

const app = express();
const server = express.json();
const myApp = new Marketplace();
const routerApi = express.Router();
app.use("/api", routerApi);
app.use(server);
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
// Registration
app.post("/api/auth/register", function (req: Request, res: Response) {
  console.log(req);
  const userRegister = myApp.register({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  if (userRegister) return res.status(200).json({ message: "User created" });
  else return res.status(400).json({ message: "User already exists" });
});
// Login
app.post("/api/auth/login", function (req: Request, res: Response) {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  const success = myApp.login(email, password);
  if (success) return res.status(200).json({ token: success });
  else return res.status(401).json({ message: "User not found" });
});

// Logout
app.post("/api/auth/logout", function (req: Request, res: Response) {
  const referenceKeyUser = req.body.referenceKeyUser;
  const token = req.body.token;
  const userLogin = myApp.logout(referenceKeyUser, token);
  if (userLogin) return res.status(200).json({ message: "User logged out" });
  else return res.status(400).json({ message: "User not found" });
});

// Users List
app.get("/api/users", function (req: Request, res: Response) {
  res.send(myApp.userList());
});

//Update Username
app.put("/api/user/update", function (req: Request, res: Response) {
  const token = req.body.auth;
  const username = req.body.username;
  const userUpdated = myApp.updateUser(username, token);
  if (userUpdated) return res.status(200).json({ message: "User updated" });
  else return res.status(400).json({ message: "User not found" });
});

// User Delete
app.delete("/api/user/:id", function (req: Request, res: Response) {
  const token = req.body.auth;
  const id = req.params.id;
  const userDeleted = myApp.deleteUser(id, token);
  if (userDeleted) return res.status(200).json({ message: "User deleted" });
  else res.status(400).json({ message: "User not found" });
});

//User Details
app.get("/api/user/:id", function (req: Request, res: Response) {
  const token = req.body.auth;
  const id = req.params.id;
  const userFound = myApp.userDetails(id, token);
  if (userFound) return res.status(200).json(userFound);
  else return res.status(400).json({ message: "User not found" });
});

//Create Ad
app.post("/api/ads/create", function (req: Request, res: Response) {
  const token = req.body.auth;
  const title = req.body.title;
  const status = req.body.status;
  const photo = req.body.photo;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const address = req.body.address;
  const phone = req.body.phone;
  const referenceKeyUser = req.body.referenceKeyUser;
  const referenceKeyUserPurchased = req.body.referenceKeyUserPurchased;
  const hasAdCreated = myApp.createAd(
    title,
    status,
    photo,
    description,
    category,
    price,
    address,
    phone,
    token,
    referenceKeyUser,
    referenceKeyUserPurchased
  );
  if (hasAdCreated) return res.status(200).json({ message: "Ad created" });
  else return res.status(400).json({ message: "Comlipe all params" });
});

//Update Ad
app.post("/api/ads/update", function (req: Request, res: Response) {
  const token = req.body.auth;
  const title = req.body.title;
  const status = req.body.status;
  const photo = req.body.photo;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const address = req.body.address;
  const phone = req.body.phone;
  const referenceKeyUser = req.body.referenceKeyUser;
  const referenceKeyUserPurchased = req.body.referenceKeyUserPurchased;
  const hasAdUpdated = myApp.updateAd(
    title,
    status,
    photo,
    description,
    category,
    price,
    address,
    phone,
    referenceKeyUser,
    referenceKeyUserPurchased,
    token
  );
  if (hasAdUpdated) return res.status(200).json({ message: "A updated" });
  else return res.status(400).json({ message: "Comlipe all params" });
});

//Delete Ad
app.delete("/api/ads/delete", function (req: Request, res: Response) {
  const token = req.body.auth;
  const referenceKeyAds = req.body.referenceKeyAds;
  const hasAdDeleted = myApp.deleteAd(referenceKeyAds, token);
  if (hasAdDeleted) return res.status(200).json({ message: "Ad deleted" });
  else return res.status(400).json({ message: "Ad not found" });
});

//Ad List
app.get("/api/ads", function (req: Request, res: Response) {
  res.send(myApp.adList());
});

//Update Ad Status
app.put("/api/ads/status", function (req: Request, res: Response) {
  const token = req.body.auth;
  const referenceKeyAds = req.body.referenceKeyAds;
  const status = req.body.status;
  const hasAdUpdated = myApp.updateAdAsSold(referenceKeyAds, status, token);
  if (hasAdUpdated) return res.status(200).json({ message: "Ad updated" });
  else return res.status(400).json({ message: "Ad not found" });
});

// Creatre Review
app.post("/api/reviews/create", function (req: Request, res: Response) {
  const token = req.body.auth;
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  const hasReviewCreated = myApp.createReview(
    title,
    description,
    rating,
    referenceKeyAd,
    referenceKeyUser
  );

  if (hasReviewCreated)
    return res.status(200).json({ message: "Review created" });
  else return res.status(400).json({ message: "Comlipe all params" });
});

// Update Review
app.post("/api/reviews/update", function (req: Request, res: Response) {
  const token = req.body.auth;
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  const hasReviewUpdated = myApp.updateReview(
    title,
    description,
    rating,
    referenceKeyAd,
    referenceKeyUser,
    token
  );
  if (hasReviewUpdated)
    return res.status(200).json({ message: "Review updated" });
});

// Delete Review
app.delete("/api/reviews/delete", function (req: Request, res: Response) {
  const token = req.body.auth;
  const referenceKeyReview = req.body.referenceKeyReview;
  const referenceKeyUser = req.body.referenceKeyUser;
  const hasReviewDeleted = myApp.deleteReview(
    referenceKeyReview,
    referenceKeyUser,
    token
  );
  if (hasReviewDeleted)
    return res.status(200).json({ message: "Review deleted" });
  else return res.status(400).json({ message: "Review not found" });
});

// Review List
app.get("/api/reviews", function (req: Request, res: Response) {
  res.send(myApp.reviewList());
});

//Add Favorite
app.post("/api/favorites/create", function (req: Request, res: Response) {
  const token = req.body.auth;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  const hasFavoriteCreated = myApp.createFavorite(
    referenceKeyAd,
    referenceKeyUser
  );
  if (hasFavoriteCreated)
    return res.status(200).json({ message: "Favorite created" });
});

//Favorite List
app.get("/api/favorites", function (req: Request, res: Response) {
  const referenceKeyUser = req.body.referenceKeyUser;
  res.send(myApp.listUserFavorites(referenceKeyUser));
});

//Delete Favorite
app.delete("/api/favorites/delete", function (req: Request, res: Response) {
  const token = req.body.auth;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  const hasFavoriteDeleted = myApp.deleteFavorite(
    referenceKeyAd,
    referenceKeyUser
  );
  if (hasFavoriteDeleted)
    return res.status(200).json({ message: "Favorite deleted" });
  else return res.status(400).json({ message: "Favorite not found" });
});
