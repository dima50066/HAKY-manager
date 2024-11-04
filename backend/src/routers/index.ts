import { Router } from 'express';
import authRouter from './auth';
import productivityRouter from './productivity';
import profileRouter from './profile';

const router = Router();

router.use('/auth', authRouter);
router.use('/productivity', productivityRouter);
router.use('/profile', profileRouter);

export default router;
