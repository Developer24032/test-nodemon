declare namespace NodeJS {
    interface ProcessEnv {
      // Application
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      
      // Database
      MONGO_URI: string;
      MONGO_DB_NAME: string;
      MONGO_USER?: string;
      MONGO_PASSWORD?: string;
      
      // Security
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      COOKIE_EXPIRE: string;
      
      // Rate Limiting
      RATE_LIMIT_WINDOW_MS: string;
      RATE_LIMIT_MAX: string;
      
      // CORS
      CORS_ORIGIN: string;
    }
  }