import express, { Request, Response } from 'express';
import { applyMiddlewares } from './middlewares';

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middlewares
applyMiddlewares(app);


// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Node.js TypeScript server!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
