import { Router } from 'express';
import authRouter from './auth';
import productivityRouter from './productivity';
import profileRouter from './profile';
import departmentRouter from './department';

const router = Router();

router.use('/auth', authRouter);
router.use('/productivity', productivityRouter);
router.use('/profile', profileRouter);
router.use('/departments', departmentRouter);

export default router;
