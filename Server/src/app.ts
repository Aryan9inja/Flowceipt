import express from "express";
import type { Application } from "express";
import cors from "cors";
import { API_STRING } from "./constants.js";

const app: Application = express();

app.use(
  cors({
    origin: process.env.CORS,
  })
);

app.use(express.json());

app.get(`${API_STRING}/ping`, (_, res) => {
  res.status(200).json({
    success: true,
    message: "Pong! Server is running",
  });
});

export { app };
