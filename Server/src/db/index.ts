import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI;

    if (!dbUri) {
      throw new Error("❌ DB_URI is not defined in environment variables");
    }

    const fullUri = `${dbUri}/${DB_NAME}`;

    const connectionInstance = await mongoose.connect(fullUri);

    console.log(
      `✅ MongoDB connected successfully with host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
