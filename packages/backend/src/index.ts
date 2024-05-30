import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import monsterRouter from './routes/monster'
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://acdsoni:TWPuQcc1SJPqDoDz@cluster0.a6eqwgt.mongodb.net/";

app.use(express.json());

app.use("/", monsterRouter);

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
