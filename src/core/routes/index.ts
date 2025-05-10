import { Router } from 'express';
import { googleRouter } from './google';
import { localRouter } from './local';

export const authRouter = Router();

authRouter.use(localRouter);
authRouter.use('/google', googleRouter);
