require('dotenv').config();

const express = require('express');
const app = express();
import {Request, Response} from 'express';

const connectDB = require('./db/connect');
import productsRouter from './routes/products';

import notFoundMiddleware from './middleware/not-found';
import errorMiddleware from './middleware/error-handler';

// middleware
app.use(express.json());

// routes

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();