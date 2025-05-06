import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// CORS Configuration
export const corsOptions = {
  origin: '*', // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// Rate Limiting
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Middleware export function
export const applyMiddlewares = (app: any) => {
  app.use(cors(corsOptions));
  app.use(helmet()); // Adds various HTTP headers for security
  app.use(limiter); // Apply rate limiting
};
