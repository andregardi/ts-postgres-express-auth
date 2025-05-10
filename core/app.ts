import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { authRouter } from './routes';
import { applyMiddlewares } from './middlewares';

export const coreApp = express();
const PORT = process.env.PORT || 3000;

// Apply middlewares
applyMiddlewares(coreApp);

// Basic route
coreApp.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Node.js TypeScript server!' });
});

// Mount centralized routes
coreApp.use('/auth', authRouter);

// Start server
coreApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
