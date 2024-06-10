import { configDotenv } from "dotenv";
import mongoose from "mongoose";
// configDotenv;

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
