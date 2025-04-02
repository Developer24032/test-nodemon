import 'express-async-errors';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './db/connect';
import productsRouter from './routes/products';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import logger from './utils/logger';
import { StatusCodes } from 'http-status-codes';
import config from './config';

const app: Application = express();

// Security middleware
app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res
    .status(StatusCodes.OK)
    .send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(config.mongoURI);
    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}...`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();
export default app;