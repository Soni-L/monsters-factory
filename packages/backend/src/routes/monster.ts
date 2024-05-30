import { Router, Express, Request, Response } from "express";
import Monster from "../models/monster";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  //   const users = await User.find();
  //  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  //   const { name, email, password } = req.body;
  //   const user = new User({ name, email, password });
  //   await user.save();
  //res.status(201).json(user);
});

export default router;
