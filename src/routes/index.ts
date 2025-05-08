import { Router } from 'express';
import { itemsRouter } from './items/router';

const router = Router();

// Centralize route mounting
router.use('/items', itemsRouter);

export { router as appRoutes };
