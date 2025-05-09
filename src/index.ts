import './load-env'
import './app';

interface User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
}

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
}