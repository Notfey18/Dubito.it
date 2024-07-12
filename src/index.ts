import express, { Request, Response } from "express";
import { Marketplace } from "./app";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { log } from "console";

const app = express();
const port = process.env.PORT || 3000;

// Configurazione di Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/app.ts"], // Path ai file con le annotazioni Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/v1/example:
 *   get:
 *     summary: Example endpoint
 *     responses:
 *       200:
 *         description: Returns a greeting message.
 */
const server = express.json();
const myApp = new Marketplace();
app.use(server);
const baseUrl = process.env.BASE_URL;
app.listen(port, function () {
  console.log(`Server running on ${baseUrl}:${port} `);
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
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  const token = myApp.login({ password, email });
  if (token) return res.status(200).json({ token });
  else return res.status(400).json({ message: "User not found" });
});

// Logout
app.delete("/api/auth/logout", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: "Missing token" });
  const success = myApp.logout(token);
  if (success) return res.status(200).json({ message: "logout success" });
  else return res.status(400).json({ message: "Error logout" });
});

// Users List
app.get("/api/users", function (req: Request, res: Response) {
  res.send(myApp.userList());
});

//Auth list
app.get("/api/auths", function (req: Request, res: Response) {
  res.send(myApp.authList());
});

//Update Username
app.put("/api/user/update", function (req: Request, res: Response) {
  console.log(req);
  const token = req.headers.authorization;
  const newUsername = req.body.username;
  console.log(token);
  if (!newUsername)
    return res.status(400).json({ message: "Username is required" });
  if (!token) return res.status(400).json({ message: "Token is required" });
  const userUpdated = myApp.updateUsername(newUsername, token);
  if (userUpdated) return res.status(200).json({ message: "User updated" });
  else return res.status(400).json({ message: "User not found" });
});

// User Delete
app.delete("/api/user/:id", function (req: Request, res: Response) {
  console.log(req);
  const token = req.headers.authorization;
  const primaryKey = req.params.primaryKey;
  if (!token) return res.status(400).json({ message: "Token is required" });
  const userDeleted = myApp.deleteUser(primaryKey, token);
  if (userDeleted) return res.status(200).json({ message: "User deleted" });
  else res.status(400).json({ message: "User not found" });
});

//User Details
app.get("/api/user/delete", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const id = req.params.id;
  if (!token) return res.status(400).json({ message: "Token is required" });
  const userFound = myApp.userDetails(id, token);
  if (userFound) return res.status(200).json(userFound);
  else return res.status(400).json({ message: "User not found" });
});

//Create Ad
app.post("/api/ads/create", function (req: Request, res: Response) {
  const ad = req.body;
  console.log(ad);
  const token = req.headers.authorization;
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
  if (!token) return res.status(400).json({ message: "Token is required" });
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
  if (hasAdCreated)
    return res
      .status(200)
      .json({ message: "Ad created", primaryKey: ad.primaryKey });
  else return res.status(400).json({ message: "Comlipe all params" });
});

//Update Ad
app.post("/api/ads/update", function (req: Request, res: Response) {
  const token = req.headers.authorization;
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
  if (!token) return res.status(400).json({ message: "Token is required" });
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
  const token = req.headers.authorization;
  const referenceKeyAds = req.body.referenceKeyAds;
  if (!token) return res.status(400).json({ message: "Token is required" });
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
  const token = req.headers.authorization;
  const referenceKeyAds = req.body.referenceKeyAds;
  const status = req.body.status;
  if (!token) return res.status(400).json({ message: "Token not valid" });
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
  if (!token) return res.status(400).json({ message: "Token not valid" });
  const hasReviewCreated = myApp.createReview(
    title,
    description,
    rating,
    referenceKeyAd,
    referenceKeyUser,
    token
  );

  if (hasReviewCreated)
    return res.status(200).json({ message: "Review created" });
  else return res.status(400).json({ message: "Comlipe all params" });
});

// Update Review
app.post("/api/reviews/update", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  if (!token) return res.status(400).json({ message: "Token not valid" });
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
  const token = req.headers.authorization;
  const referenceKeyReview = req.body.referenceKeyReview;
  const referenceKeyUser = req.body.referenceKeyUser;
  if (!token) return res.status(400).json({ message: "Token not valid" });
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
  const token = req.headers.authorization;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  if (!token) return res.status(400).json({ message: "Token not valid" });
  const hasFavoriteCreated = myApp.createFavorite(
    referenceKeyAd,
    referenceKeyUser,
    token
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
  const token = req.headers.authorization;
  const referenceKeyAd = req.body.referenceKeyAd;
  const referenceKeyUser = req.body.referenceKeyUser;
  if (!token) return res.status(400).json({ message: "Token not valid" });
  const hasFavoriteDeleted = myApp.deleteFavorite(
    referenceKeyAd,
    referenceKeyUser,
    token
  );
  if (hasFavoriteDeleted)
    return res.status(200).json({ message: "Favorite deleted" });
  else return res.status(400).json({ message: "Favorite not found" });
});
