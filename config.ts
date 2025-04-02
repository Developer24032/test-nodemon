import dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/store-api',
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;