import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import { API_STRING } from './constants.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware.js';
import userRouter from './routes/user.routes.js';
import receiptRouter from './routes/receipt.routes.js';

const app: Application = express();

app.use(
  cors({
    origin: process.env.CORS || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(`${API_STRING}/ping`, (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Pong! Server is running',
  });
});

app.use(`${API_STRING}/users`, userRouter);
app.use(`${API_STRING}/receipts`, receiptRouter);

app.use(errorHandler);

export { app };
