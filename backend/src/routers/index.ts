import { Router } from 'express';
// import contactsRouter from './contacts';
import authRouter from './auth';
import productivityRouter from './productivity';

const router = Router();

// router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/productivity', productivityRouter);

export default router;
