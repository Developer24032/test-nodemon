import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect';
import Product from './models/product';
const jsonProducts = require('./products.json');

const start = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in process.env');
    }
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

start();
