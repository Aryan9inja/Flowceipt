import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    console.log(`${process.env.DB_URI}`)
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDb connected successfully with host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};
