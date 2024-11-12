import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";

dotenv.config();

async function connectDb(){
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("Database connected!");
  } catch (error) {
    console.error(error);
  }
}

connectDb();
