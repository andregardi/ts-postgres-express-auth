import { Router } from 'express';
import { googleRouter } from './google';
import { localRouter } from './local';

const router = Router();

router.use(localRouter);
router.use('/google', googleRouter);

export default router;
