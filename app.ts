import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
const app = express();

import connectDB from './db/connect';
import productsRouter from './routes/products';

import notFoundMiddleware from './middleware/not-found';
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    // connectDB
    await connectDB((process.env.MONGO_URI as string));
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();