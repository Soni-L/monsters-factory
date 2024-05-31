import { Router, Express, Request, Response } from "express";
import Monster from "../models/monster";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Get page and limit from query parameters, set defaults if not provided
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const monsters = await Monster.find({}).skip(skip).limit(limit);
    const total = await Monster.countDocuments({});

    res.json({
      total,
      page,
      limit,
      monsters,
    });
  } catch (err) {
    res.status(500).json({ error: "could not retreive monsters" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  //   const { name, email, password } = req.body;
  //   const user = new User({ name, email, password });
  //   await user.save();
  //res.status(201).json(user);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Monster.findByIdAndDelete(id);
    if (result) {
      res.status(200).send({ message: "Monster deleted successfully" });
    } else {
      res.status(404).send({ message: "Monster not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

export default router;
