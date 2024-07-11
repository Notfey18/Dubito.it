import express, { Request, Response } from "express";
const routerUsers = express.Router();
routerUsers.get("/", function (req: Request, res: Response) {
  return res.send("Hello World!");
});
