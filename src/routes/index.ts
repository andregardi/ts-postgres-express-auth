import { Router } from 'express';
import { itemsRouter } from './items/router';
import authRoutes from './auth/router';

const router = Router();

// Centralize route mounting
router.use('/items', itemsRouter);
router.use('/auth', authRoutes);

export { router as appRoutes };
