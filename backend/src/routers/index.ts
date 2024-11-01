import { Router } from 'express';
// import contactsRouter from './contacts';
import authRouter from './auth';

const router = Router();

// router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
